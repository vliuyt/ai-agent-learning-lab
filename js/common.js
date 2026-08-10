window.AIAgentLab = window.AIAgentLab || {};

window.AIAgentLab.Common = (() => {
  const pages = [
    { id: "home", label: "总览", href: "index.html" },
    { id: "schedule", label: "8 周日程", href: "learn.html" },
    { id: "flashcards", label: "闪卡", href: "flashcard.html" },
    { id: "library", label: "概念与资料", href: "roots.html" },
    { id: "progress", label: "进度", href: "progress.html" }
  ];

  const el = (tag, className = "", text = null) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== null) node.textContent = String(text);
    return node;
  };

  const append = (parent, ...children) => {
    children.filter(Boolean).forEach((child) => parent.appendChild(child));
    return parent;
  };

  const getResource = (id) => (window.AIAgentLab.resources || []).find((item) => item.id === id);

  const resourceLink = (resourceId, label = null) => {
    const resource = getResource(resourceId);
    if (!resource) return null;
    const link = el("a", "inline-resource", label || resource.title);
    link.href = resource.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.title = `${resource.source} · ${resource.duration}`;
    return link;
  };

  const totalTasks = () => (window.AIAgentLab.weeks || []).reduce(
    (sum, week) => sum + week.days.reduce((daySum, item) => daySum + item.tasks.length, 0), 0
  );

  const completedTasks = (state = window.AIAgentLab.StorageManager.getState()) => (window.AIAgentLab.weeks || []).reduce(
    (sum, week) => sum + week.days.reduce(
      (daySum, day, dayIndex) => daySum + day.tasks.reduce(
        (taskSum, _task, taskIndex) => taskSum + Number(Boolean(state.checks[`w${week.number}d${dayIndex + 1}t${taskIndex + 1}`])),
        0
      ),
      0
    ),
    0
  );

  const getProgress = (state = window.AIAgentLab.StorageManager.getState()) => {
    const total = totalTasks();
    const complete = completedTasks(state);
    return { total, complete, percentage: total ? Math.round((complete / total) * 100) : 0 };
  };

  const createNav = (activeId) => {
    const mount = document.getElementById("siteNav");
    if (!mount) return;
    const nav = el("nav", "nav");
    nav.setAttribute("aria-label", "主导航");
    const container = el("div", "nav-container");
    const brand = el("a", "nav-brand");
    brand.href = "index.html";
    append(brand, el("span", "brand-mark", "◎"), el("span", "", "AI Agent Lab"));
    const links = el("div", "nav-links");
    pages.forEach((page) => {
      const link = el("a", `nav-link${page.id === activeId ? " active" : ""}`, page.label);
      link.href = page.href;
      if (page.id === activeId) link.setAttribute("aria-current", "page");
      links.appendChild(link);
    });
    const progress = el("a", "progress-pill", "0%");
    progress.id = "globalProgress";
    progress.href = "progress.html";
    progress.setAttribute("aria-label", "查看学习进度");
    append(container, brand, links, progress);
    nav.appendChild(container);
    mount.replaceChildren(nav);
    updateGlobalProgress();
  };

  const createFooter = () => {
    const mount = document.getElementById("siteFooter");
    if (!mount) return;
    const footer = el("footer", "footer");
    const grid = el("div", "container-wide footer-grid");
    const copy = el("div");
    append(copy,
      el("strong", "", window.AIAgentLab.siteConfig.footer.tagline),
      el("p", "", `${window.AIAgentLab.siteConfig.footer.description} 资料核验：${window.AIAgentLab.siteConfig.verifiedDate}。`)
    );
    const links = el("div", "footer-links");
    const schedule = el("a", "", "打开日程"); schedule.href = "learn.html";
    const library = el("a", "", "资料库"); library.href = "roots.html";
    append(links, schedule, library);
    append(grid, copy, links);
    footer.appendChild(grid);
    mount.replaceChildren(footer);
  };

  const updateGlobalProgress = () => {
    const node = document.getElementById("globalProgress");
    if (!node) return;
    const progress = getProgress();
    node.textContent = `${progress.percentage}%`;
    node.title = `${progress.complete}/${progress.total} 项完成`;
  };

  const showFeedback = (message, isSuccess = true) => {
    const old = document.querySelector(".feedback-toast");
    if (old) old.remove();
    const toast = el("div", `feedback-toast ${isSuccess ? "success" : "error"}`, message);
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
    window.setTimeout(() => toast.remove(), 3200);
  };

  const parseLocalDate = (dateString) => {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateString));
    if (!match) return new Date();
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12, 0, 0);
  };

  const toDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const nextWeekday = (date) => {
    const value = new Date(date);
    while (value.getDay() === 0 || value.getDay() === 6) value.setDate(value.getDate() + 1);
    return value;
  };

  const scheduleDates = (startDate, count = 40) => {
    const dates = [];
    const cursor = nextWeekday(parseLocalDate(startDate));
    while (dates.length < count) {
      if (cursor.getDay() !== 0 && cursor.getDay() !== 6) dates.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    return dates;
  };

  const formatDate = (date) => new Intl.DateTimeFormat("zh-CN", { month: "numeric", day: "numeric", weekday: "short" }).format(date);

  const downloadText = (filename, content, mime = "text/plain;charset=utf-8") => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = el("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const registerServiceWorker = () => {
    if (!("serviceWorker" in navigator) || !/^https?:$/.test(window.location.protocol)) return;
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch((error) => console.warn("Service Worker 未注册：", error));
    });
  };

  window.addEventListener("ai-agent-progress", updateGlobalProgress);

  return Object.freeze({
    el, append, getResource, resourceLink, totalTasks, completedTasks, getProgress,
    createNav, createFooter, updateGlobalProgress, showFeedback, parseLocalDate,
    toDateString, scheduleDates, formatDate, downloadText, registerServiceWorker
  });
})();
