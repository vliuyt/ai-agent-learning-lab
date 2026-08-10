import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootDir = path.resolve(".");
const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"], [".html", "text/html; charset=utf-8"], [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"], [".md", "text/markdown; charset=utf-8"], [".png", "image/png"],
  [".txt", "text/plain; charset=utf-8"], [".xml", "application/xml; charset=utf-8"], [".jsonl", "application/x-ndjson; charset=utf-8"]
]);

const startLocalServer = async () => {
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
      const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
      const filePath = path.resolve(rootDir, relativePath);
      if (!filePath.startsWith(`${rootDir}${path.sep}`)) {
        response.writeHead(403).end("Forbidden");
        return;
      }
      const content = await readFile(filePath);
      response.writeHead(200, {
        "Content-Type": mimeTypes.get(path.extname(filePath)) || "application/octet-stream",
        "Cache-Control": path.basename(filePath) === "sw.js" ? "no-cache" : "no-store"
      });
      response.end(content);
    } catch (_error) {
      response.writeHead(404).end("Not found");
    }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  return server;
};

const configuredBaseURL = process.env.BASE_URL?.replace(/\/$/, "");
const localServer = configuredBaseURL ? null : await startLocalServer();
const address = localServer?.address();
const baseURL = configuredBaseURL || `http://127.0.0.1:${address.port}`;
const outputDir = path.resolve("qa");
await mkdir(outputDir, { recursive: true });

let browser;
try {
browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ acceptDownloads: true, viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const problems = [];

page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));
page.on("console", (message) => {
  if (message.type() === "error") problems.push(`console: ${message.text()}`);
});
page.on("response", (response) => {
  if (response.url().startsWith(baseURL) && response.status() >= 400) problems.push(`http ${response.status()}: ${response.url()}`);
});

await page.goto(`${baseURL}/index.html`, { waitUntil: "networkidle" });
assert.match(await page.title(), /AI Agent 学习实验室/);
assert.equal(await page.locator(".stat-card").count(), 3);
assert.equal(await page.locator(".stat-value").nth(2).textContent(), "8 个");
assert.equal(await page.locator(".method-card").count(), 6);
assert.equal(await page.locator(".roadmap-item").count(), 8);
assert.equal(await page.locator(".agent-console").getAttribute("aria-live"), "off");
assert.deepEqual(await page.evaluate(() => window.AIAgentLab.WordRoots.reduce((counts, concept) => {
  counts[concept.quiz.correctAnswer] += 1;
  return counts;
}, [0, 0, 0, 0])), [5, 5, 5, 5]);
assert.deepEqual(await page.evaluate(() => {
  const used = new Set(window.AIAgentLab.weeks.flatMap((week) => week.days.flatMap((day) => day.tasks.map((task) => task.resourceId).filter(Boolean))));
  return window.AIAgentLab.resources.filter((resource) => !used.has(resource.id)).map((resource) => resource.id);
}), []);
await page.screenshot({ path: path.join(outputDir, "home-desktop.png"), fullPage: true });

await page.goto(`${baseURL}/learn.html`, { waitUntil: "networkidle" });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: "networkidle" });
assert.equal(await page.locator(".week-block").count(), 8);
assert.equal(await page.locator(".day-card").count(), 40);
assert.equal(await page.locator(".task-check").count(), 160);
assert.equal(await page.locator("#scheduleProgressText").textContent(), "0 / 160");
assert.equal(await page.locator("#startDate").inputValue(), await page.evaluate(() => {
  const date = new Date();
  while (date.getDay() === 0 || date.getDay() === 6) date.setDate(date.getDate() + 1);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}));

await page.locator(".day-summary").first().click();
const firstDay = page.locator(".day-card").first();
const firstChecks = firstDay.locator(".task-check");
for (let index = 0; index < 4; index += 1) await firstChecks.nth(index).check();
assert.equal(await page.locator("#scheduleProgressText").textContent(), "4 / 160");
assert.ok(await firstDay.evaluate((node) => node.classList.contains("done")));
await firstDay.locator(".notes-input").fill("第一个浏览器验证笔记");
await page.waitForTimeout(800);
await page.reload({ waitUntil: "networkidle" });
assert.equal(await page.locator("#scheduleProgressText").textContent(), "4 / 160");
await page.locator(".day-summary").first().click();
assert.equal(await page.locator(".notes-input").first().inputValue(), "第一个浏览器验证笔记");

await page.locator('[data-filter="done"]').click();
assert.equal(await page.locator('[data-filter="done"]').getAttribute("aria-pressed"), "true");
assert.equal(await page.locator(".day-card:visible").count(), 1);
await page.locator('[data-filter="all"]').click();
await page.locator("#startDate").fill("2020-01-06");
await page.locator("#startDate").dispatchEvent("change");
await page.locator('[data-filter="overdue"]').click();
assert.equal(await page.locator(".day-card:visible").count(), 39);
await page.locator('[data-filter="focus"]').click();
assert.equal(await page.locator(".day-card:visible").count(), 1);
assert.equal(await page.locator(".day-card:visible").getAttribute("data-day-id"), "w1d2");
assert.match(await page.locator("#scheduleNotice").textContent(), /下一项/);
await page.locator('[data-filter="all"]').click();
const [calendarDownload] = await Promise.all([
  page.waitForEvent("download"),
  page.locator("#downloadCalendar").click()
]);
assert.match(calendarDownload.suggestedFilename(), /\.ics$/);
const calendarPath = await calendarDownload.path();
assert.ok(calendarPath);
const calendarText = await readFile(calendarPath, "utf8");
assert.ok(calendarText.split("\r\n").every((line) => Buffer.byteLength(line, "utf8") <= 75));
const unfoldedCalendar = calendarText.replace(/\r\n[ \t]/g, "");
assert.match(unfoldedCalendar, /DESCRIPTION:[^\r]+\\n□/);
const [progressDownload] = await Promise.all([
  page.waitForEvent("download"),
  page.locator("#exportProgress").click()
]);
assert.match(progressDownload.suggestedFilename(), /\.json$/);
await page.goto(`${baseURL}/learn.html#w1d2t1`, { waitUntil: "networkidle" });
await page.waitForFunction(() => document.querySelector('[data-day-id="w1d2"]')?.classList.contains("open"));
assert.ok(await page.locator('[data-day-id="w1d2"]').evaluate((node) => node.classList.contains("open")));

await page.goto(`${baseURL}/flashcard.html`, { waitUntil: "networkidle" });
assert.equal(await page.locator("#cardCounter").textContent(), "1 / 20");
await page.locator("#flashcard").focus();
await page.keyboard.press("Space");
assert.ok(await page.locator("#flashcard").evaluate((node) => node.classList.contains("flipped")));
assert.equal(await page.locator("#flashcard").getAttribute("aria-pressed"), "true");
assert.equal(await page.locator("#flashcardFront").getAttribute("aria-hidden"), "true");
assert.equal(await page.locator("#flashcardBack").getAttribute("aria-hidden"), "false");
await page.keyboard.press("ArrowRight");
assert.equal(await page.locator("#cardCounter").textContent(), "2 / 20");
await page.locator("#masterCard").click();
assert.match(await page.locator("#masterCard").textContent(), /已掌握/);

await page.goto(`${baseURL}/root-detail.html?id=16`, { waitUntil: "networkidle" });
assert.equal(await page.locator("#detailName").textContent(), "MCP");
assert.equal(await page.locator(".example-item").count(), 3);
assert.equal(await page.locator(".quiz-option").count(), 4);
const correctQuizText = await page.evaluate(() => {
  const concept = window.AIAgentLab.WordRoots.find((item) => item.id === 16);
  return concept.quiz.options[concept.quiz.correctAnswer];
});
const renderedQuizOptions = await page.locator(".quiz-option").allTextContents();
await page.locator(".quiz-option").nth(renderedQuizOptions.findIndex((text) => text !== correctQuizText)).click();
assert.equal(await page.locator(".quiz-option.correct").count(), 1);
assert.match(await page.locator("#quizFeedback").textContent(), /正确答案/);
assert.equal(await page.evaluate(() => window.AIAgentLab.StorageManager.getState().quizResults["16"]), false);
await page.goto(`${baseURL}/flashcard.html?mode=wrong`, { waitUntil: "networkidle" });
assert.equal(await page.locator("#cardCounter").textContent(), "1 / 1");
assert.equal(await page.locator("#frontName").textContent(), "MCP");
assert.equal(await page.locator('[data-card-mode="wrong"]').getAttribute("aria-pressed"), "true");
await page.goto(`${baseURL}/root-detail.html?id=16`, { waitUntil: "networkidle" });
await page.evaluate(() => navigator.serviceWorker?.ready);
await page.reload({ waitUntil: "networkidle" });
await context.setOffline(true);
await page.goto(`${baseURL}/root-detail.html?id=2`, { waitUntil: "domcontentloaded" });
assert.equal(await page.locator("#detailName").textContent(), "Agent Loop");
await context.setOffline(false);

await page.goto(`${baseURL}/roots.html`, { waitUntil: "networkidle" });
assert.equal(await page.locator(".concept-card").count(), 20);
assert.equal(await page.locator(".resource-card").count(), 21);
await page.locator('[data-type="podcast"]').click();
assert.equal(await page.locator('[data-type="podcast"]').getAttribute("aria-pressed"), "true");
assert.equal(await page.locator(".resource-card").count(), 4);
await page.locator('[data-type="all"]').click();
await page.locator("#librarySearch").fill("MCP");
assert.ok((await page.locator(".concept-card").count()) >= 1);
assert.ok((await page.locator(".resource-card").count()) >= 2);

await page.goto(`${baseURL}/progress.html`, { waitUntil: "networkidle" });
assert.equal(await page.locator("#importButton").evaluate((node) => node.tagName), "BUTTON");
assert.equal(await page.locator(".metric-card").count(), 5);
assert.equal(await page.locator(".week-row").count(), 8);
assert.equal(await page.locator(".achievement").count(), 8);
assert.match(await page.locator(".metric-value").first().textContent(), /3%/);
assert.equal(await page.locator(".metric-value").nth(3).textContent(), "0/1");
assert.match(await page.locator("#quizReviewText").textContent(), /1 个概念/);
assert.equal(await page.locator("#quizReviewLinks .review-chip").textContent(), "MCP");
assert.match(await page.locator("#quizReviewLink").getAttribute("href"), /mode=wrong/);
const [backupDownload] = await Promise.all([
  page.waitForEvent("download"),
  page.locator("#exportState").click()
]);
const backupPath = await backupDownload.path();
assert.ok(backupPath);
page.once("dialog", (dialog) => dialog.accept());
await page.locator("#resetState").click();
assert.equal(await page.locator(".metric-value").first().textContent(), "0%");
await page.locator("#importState").setInputFiles(backupPath);
await page.waitForFunction(() => document.querySelector(".metric-value")?.textContent !== "0%");
assert.match(await page.locator(".metric-value").first().textContent(), /3%/);
await page.locator("#importState").setInputFiles({ name: "oversized.json", mimeType: "application/json", buffer: Buffer.alloc(1024 * 1024 + 1, 32) });
assert.match(await page.locator(".feedback-toast").textContent(), /超过 1 MB/);

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
mobile.on("pageerror", (error) => problems.push(`mobile pageerror: ${error.message}`));
await mobile.goto(`${baseURL}/learn.html`, { waitUntil: "networkidle" });
assert.equal(await mobile.locator(".day-card").count(), 40);
assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
await mobile.screenshot({ path: path.join(outputDir, "schedule-mobile.png"), fullPage: false });
await mobile.close();

const auditContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, serviceWorkers: "block" });
const auditPages = ["index.html", "learn.html", "flashcard.html", "roots.html", "root-detail.html?id=16", "progress.html"];
for (const pagePath of auditPages) {
  const auditPage = await auditContext.newPage();
  const externalRequests = [];
  auditPage.on("request", (request) => {
    if (!request.url().startsWith(baseURL)) externalRequests.push(request.url());
  });
  await auditPage.goto(`${baseURL}/${pagePath}`, { waitUntil: "networkidle" });
  const audit = await auditPage.evaluate(() => {
    const controls = [...document.querySelectorAll("button, input, textarea, select, [role=button]")].filter((node) => {
      const rect = node.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((node) => Number(node.tagName.slice(1)));
    const navigation = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource");
    return {
      h1Count: document.querySelectorAll("h1").length,
      headingJumps: headings.slice(1).filter((level, index) => level > headings[index] + 1).length,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      undersizedControls: controls.filter((node) => {
        const rect = node.getBoundingClientRect();
        return rect.width < 24 || rect.height < 24;
      }).length,
      dclMs: Math.round(navigation.domContentLoadedEventEnd),
      transferBytes: Math.round(resources.reduce((sum, entry) => sum + (entry.transferSize || 0), navigation.transferSize || 0))
    };
  });
  assert.equal(audit.h1Count, 1, `${pagePath}: h1 count`);
  assert.equal(audit.headingJumps, 0, `${pagePath}: heading hierarchy`);
  assert.equal(audit.overflow, false, `${pagePath}: horizontal overflow`);
  assert.equal(audit.undersizedControls, 0, `${pagePath}: controls smaller than 24px`);
  assert.ok(audit.dclMs < 3000, `${pagePath}: DOMContentLoaded ${audit.dclMs}ms`);
  assert.ok(audit.transferBytes < 500_000, `${pagePath}: transfer ${audit.transferBytes} bytes`);
  assert.deepEqual(externalRequests, [], `${pagePath}: unexpected external requests`);
  await auditPage.close();
}
await auditContext.close();

assert.deepEqual(problems, []);
console.log("QA_OK pages=6 tasks=160 concepts=20 resources=21 responsive=390px persistence=yes review_queue=yes deep_links=yes accessibility=yes performance=yes errors=0");
} finally {
  if (browser) await browser.close();
  if (localServer) await new Promise((resolve) => localServer.close(resolve));
}
