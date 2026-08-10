(() => {
  const { Common, siteConfig, WordRoots, weeks, learningMethod, StorageManager } = window.AIAgentLab;

  const findNextTask = () => {
    const state = StorageManager.getState();
    for (const week of weeks) {
      for (let dayIndex = 0; dayIndex < week.days.length; dayIndex += 1) {
        const day = week.days[dayIndex];
        for (let taskIndex = 0; taskIndex < day.tasks.length; taskIndex += 1) {
          const id = `w${week.number}d${dayIndex + 1}t${taskIndex + 1}`;
          if (!state.checks[id]) return { id, text: `第 ${week.number} 周 · 第 ${dayIndex + 1} 天：${day.title} — ${day.tasks[taskIndex].text}` };
        }
      }
    }
    return null;
  };

  const renderHero = () => {
    const title = document.getElementById("heroTitle");
    siteConfig.hero.title.forEach((line, index) => {
      const span = Common.el("span", index === 1 ? "accent-line" : "", line);
      title.appendChild(span);
    });
    document.getElementById("heroSubtitle").textContent = siteConfig.hero.subtitle;
    document.getElementById("primaryCta").textContent = siteConfig.cta.primary;
    document.getElementById("secondaryCta").textContent = siteConfig.cta.secondary;
    const stats = document.getElementById("statGrid");
    siteConfig.stats.forEach((item) => {
      const card = Common.el("div", "stat-card");
      Common.append(card, Common.el("p", "stat-value", item.value), Common.el("div", "stat-label", item.label));
      stats.appendChild(card);
    });
  };

  const renderMethods = () => {
    const root = document.getElementById("methodGrid");
    learningMethod.forEach((method, index) => {
      const card = Common.el("article", "method-card");
      Common.append(card,
        Common.el("div", "method-number", String(index + 1).padStart(2, "0")),
        Common.el("h3", "", method.title),
        Common.el("p", "", method.text)
      );
      root.appendChild(card);
    });
  };

  const renderRoadmap = () => {
    const root = document.getElementById("roadmap");
    weeks.forEach((week) => {
      const item = Common.el("article", "roadmap-item");
      const copy = Common.el("div");
      Common.append(copy, Common.el("h3", "", week.title), Common.el("p", "", week.subtitle));
      Common.append(item,
        Common.el("div", "roadmap-week", String(week.number)),
        copy,
        Common.el("span", "milestone", week.milestone)
      );
      root.appendChild(item);
    });
  };

  const startConceptRotation = () => {
    if (!siteConfig.hero.animation.enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const concepts = WordRoots.slice(0, siteConfig.hero.animation.demoCount);
    let index = 0;
    window.setInterval(() => {
      index = (index + 1) % concepts.length;
      document.getElementById("demoConcept").textContent = concepts[index].root;
      document.getElementById("demoMeaning").textContent = concepts[index].meaning;
      document.querySelectorAll(".loop-step").forEach((step, stepIndex) => step.classList.toggle("active", stepIndex === index % 4));
    }, 2800);
  };

  Common.createNav("home");
  Common.createFooter();
  renderHero();
  renderMethods();
  renderRoadmap();
  const nextTask = findNextTask();
  document.getElementById("homeNextText").textContent = nextTask ? nextTask.text : "40 天任务已全部完成。去进度页导出你的学习记录。";
  const nextLink = document.getElementById("homeNextLink");
  nextLink.href = nextTask ? `learn.html#${nextTask.id}` : "progress.html";
  nextLink.textContent = nextTask ? "继续学习" : "查看毕业记录";
  startConceptRotation();
  Common.registerServiceWorker();
})();
