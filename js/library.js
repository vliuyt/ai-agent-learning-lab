(() => {
  const { Common, WordRoots, resources, StorageManager } = window.AIAgentLab;
  let activeType = "all";
  let query = "";

  const matches = (text) => !query || text.toLocaleLowerCase("zh-CN").includes(query);

  const renderConcepts = () => {
    const section = document.getElementById("conceptSection");
    const root = document.getElementById("conceptGrid");
    const state = StorageManager.getState();
    const mastered = new Set(state.masteredConcepts.map(Number));
    const visible = (activeType === "all" || activeType === "concept") ? WordRoots.filter((concept) => matches(`${concept.root} ${concept.origin} ${concept.meaning} ${concept.description}`)) : [];
    section.hidden = activeType !== "all" && activeType !== "concept";
    root.replaceChildren();
    visible.forEach((concept) => {
      const card = Common.el("article", "card concept-card");
      const origin = Common.el("div");
      Common.append(origin, Common.el("span", "root-origin", concept.origin));
      if (mastered.has(concept.id)) origin.appendChild(Common.el("span", "mastered-badge", "已掌握"));
      const link = Common.el("a", "concept-link", "查看解释与测验 →");
      link.href = `root-detail.html?id=${concept.id}`;
      Common.append(card, origin, Common.el("h3", "", concept.root), Common.el("p", "concept-meaning", concept.meaning), link);
      root.appendChild(card);
    });
    if (!visible.length && !section.hidden) root.appendChild(Common.el("div", "grid-empty", "没有匹配的概念。"));
  };

  const renderResources = () => {
    const section = document.getElementById("resourceSection");
    const root = document.getElementById("resourceGrid");
    const visible = resources.filter((resource) => (activeType === "all" || resource.type === activeType) && matches(`${resource.title} ${resource.source} ${resource.why} ${resource.level}`));
    section.hidden = activeType === "concept";
    root.replaceChildren();
    const labels = { video: "视频", podcast: "播客", reading: "阅读", course: "课程" };
    visible.forEach((resource) => {
      const card = Common.el("article", "card resource-card");
      const meta = Common.el("div", "resource-meta");
      Common.append(meta, Common.el("span", "meta-chip", resource.duration), Common.el("span", "meta-chip", resource.level), Common.el("span", "meta-chip", resource.access));
      const link = Common.el("a", "resource-link", "打开原始资料 ↗");
      link.href = resource.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      Common.append(card,
        Common.el("span", "resource-type", labels[resource.type] || resource.type),
        Common.el("h3", "", resource.title),
        Common.el("p", "resource-source", resource.source),
        Common.el("p", "resource-why", resource.why),
        meta,
        link
      );
      root.appendChild(card);
    });
    if (!visible.length && !section.hidden) root.appendChild(Common.el("div", "grid-empty", "没有匹配的学习资料。"));
  };

  const render = () => { renderConcepts(); renderResources(); };
  document.getElementById("librarySearch").addEventListener("input", (event) => {
    query = event.target.value.trim().toLocaleLowerCase("zh-CN");
    render();
  });
  document.querySelectorAll("[data-type]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.type === activeType));
    button.addEventListener("click", () => {
      activeType = button.dataset.type;
      document.querySelectorAll("[data-type]").forEach((item) => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      render();
    });
  });

  Common.createNav("library");
  Common.createFooter();
  render();
  Common.registerServiceWorker();
})();
