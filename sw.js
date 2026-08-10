const CACHE_PREFIX = "ai-agent-learning-lab-";
const CACHE_NAME = `${CACHE_PREFIX}v3`;
const LOCAL_ASSETS = [
  "./", "./index.html", "./learn.html", "./flashcard.html", "./roots.html", "./root-detail.html", "./progress.html",
  "./css/minimal.css", "./js/siteConfig.js", "./js/wordData.js", "./js/courseData.js", "./js/storage.js", "./js/common.js",
  "./js/home.js", "./js/schedule.js", "./js/flashcard.js", "./js/library.js", "./js/detail.js", "./js/progress.js",
  "./manifest.json", "./icon-192.png", "./icon-512.png",
  "./templates/agent-canvas.md", "./templates/eval-scorecard.md", "./templates/eval-set.jsonl", "./templates/threat-model.md", "./templates/skill-starter/SKILL.md"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(LOCAL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then(async (response) => {
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(event.request, response.clone());
    }
    return response;
  }).catch(async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(event.request, { ignoreSearch: event.request.mode === "navigate" });
    return cached || (event.request.mode === "navigate" ? cache.match("./index.html") : Response.error());
  }));
});
