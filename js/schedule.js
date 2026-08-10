(() => {
  const { Common, weeks, StorageManager } = window.AIAgentLab;
  const root = document.getElementById("scheduleRoot");
  const startInput = document.getElementById("startDate");
  let activeFilter = "all";
  let expandedAll = false;

  const flatDays = () => weeks.flatMap((week) => week.days.map((day, dayIndex) => ({ week, day, dayIndex })));
  const taskId = (weekNumber, dayIndex, taskIndex) => `w${weekNumber}d${dayIndex + 1}t${taskIndex + 1}`;
  const dayId = (weekNumber, dayIndex) => `w${weekNumber}d${dayIndex + 1}`;

  const dayStatus = (week, day, dayIndex, state) => {
    const complete = day.tasks.reduce((sum, _task, taskIndex) => sum + Number(Boolean(state.checks[taskId(week.number, dayIndex, taskIndex)])), 0);
    return { complete, total: day.tasks.length, done: complete === day.tasks.length };
  };

  const updateProgress = () => {
    const progress = Common.getProgress();
    document.getElementById("scheduleProgressText").textContent = `${progress.complete} / ${progress.total}`;
    document.getElementById("scheduleProgressFill").style.width = `${progress.percentage}%`;
  };

  const makeTaskText = (item) => {
    const span = Common.el("span", "task-text", item.text);
    const link = item.resourceId ? Common.resourceLink(item.resourceId, " 打开资料 ↗") : null;
    if (link) span.appendChild(link);
    if (item.link) {
      const local = Common.el("a", "", " 打开模板 ↗");
      local.href = item.link;
      local.target = "_blank";
      local.rel = "noopener noreferrer";
      span.appendChild(local);
    }
    return span;
  };

  const renderTask = (week, day, dayIndex, item, taskIndex, state) => {
    const id = taskId(week.number, dayIndex, taskIndex);
    const row = Common.el("li", `task-row${state.checks[id] ? " checked" : ""}`);
    const checkbox = Common.el("input", "task-check");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(state.checks[id]);
    checkbox.id = id;
    checkbox.setAttribute("aria-label", item.text);
    checkbox.addEventListener("change", () => {
      const requested = checkbox.checked;
      const saved = StorageManager.setCheck(id, requested);
      if (!saved) {
        checkbox.checked = !requested;
        Common.showFeedback("进度保存失败，请检查浏览器存储权限", false);
        return;
      }
      row.classList.toggle("checked", checkbox.checked);
      refreshCard(week.number, dayIndex);
      updateProgress();
      applyFilter();
    });
    Common.append(row, checkbox, Common.el("span", "task-kind", item.kind), makeTaskText(item));
    return row;
  };

  const renderDay = (week, day, dayIndex, date, state) => {
    const id = dayId(week.number, dayIndex);
    const status = dayStatus(week, day, dayIndex, state);
    const dateString = Common.toDateString(date);
    const todayString = Common.toDateString(new Date());
    const today = dateString === todayString;
    const overdue = !status.done && dateString < todayString;
    const card = Common.el("article", `day-card${status.done ? " done" : ""}${today ? " today" : ""}${overdue ? " overdue" : ""}`);
    card.dataset.dayId = id;
    card.dataset.done = String(status.done);
    card.dataset.date = dateString;

    const summary = Common.el("button", "day-summary");
    summary.type = "button";
    summary.setAttribute("aria-expanded", "false");
    summary.setAttribute("aria-controls", `${id}-details`);
    const dateBox = Common.el("div", "day-date");
    Common.append(dateBox, Common.el("strong", "", Common.formatDate(date)), document.createTextNode(`${day.minutes} 分钟`));
    if (overdue) dateBox.appendChild(Common.el("span", "overdue-badge", "待补"));
    const copy = Common.el("div");
    Common.append(copy, Common.el("h3", "day-title", day.title), Common.el("p", "day-goal", day.goal));
    const statusBox = Common.el("div", "day-status");
    Common.append(statusBox, Common.el("span", "day-count", `${status.complete}/${status.total}`), Common.el("span", "chevron", "⌄"));
    Common.append(summary, dateBox, copy, statusBox);

    const details = Common.el("div", "day-details");
    details.id = `${id}-details`;
    const list = Common.el("ul", "task-list");
    day.tasks.forEach((item, taskIndex) => list.appendChild(renderTask(week, day, dayIndex, item, taskIndex, state)));
    const bottom = Common.el("div", "day-bottom");
    Common.append(bottom,
      Common.el("div", "deliverable-box", `今日产出：${day.deliverable}`),
      Common.el("div", "fun-box", `趣味玩法：${day.fun}`)
    );
    const notesWrap = Common.el("div", "notes-wrap");
    const notesLabel = Common.el("label", "notes-label", "学习笔记（自动保存，最多 2000 字）");
    notesLabel.htmlFor = `${id}-notes`;
    const notes = Common.el("textarea", "notes-input");
    notes.id = `${id}-notes`;
    notes.maxLength = 2000;
    notes.placeholder = "今天最重要的发现、失败或下一步…";
    notes.value = state.notes[id] || "";
    let lastSaveSucceeded = true;
    notes.addEventListener("input", () => {
      lastSaveSucceeded = StorageManager.setNote(id, notes.value);
      notes.setAttribute("aria-invalid", String(!lastSaveSucceeded));
      if (!lastSaveSucceeded) Common.showFeedback("笔记保存失败，请检查浏览器存储权限", false);
    });
    notes.addEventListener("blur", () => Common.showFeedback(lastSaveSucceeded ? "笔记已保存" : "笔记尚未保存，请检查浏览器存储权限", lastSaveSucceeded));
    Common.append(notesWrap, notesLabel, notes);
    Common.append(bottom, notesWrap);
    Common.append(details, list, bottom);
    summary.addEventListener("click", () => {
      const open = card.classList.toggle("open");
      summary.setAttribute("aria-expanded", String(open));
    });
    Common.append(card, summary, details);
    return card;
  };

  const render = () => {
    const state = StorageManager.getState();
    startInput.value = state.startDate;
    const dates = Common.scheduleDates(state.startDate, 40);
    let dateIndex = 0;
    root.replaceChildren();
    weeks.forEach((week) => {
      const section = Common.el("section", "week-block");
      section.id = `week-${week.number}`;
      const heading = Common.el("div", "week-heading");
      const headingCopy = Common.el("div");
      Common.append(headingCopy, Common.el("h2", "", week.title), Common.el("p", "", `${week.subtitle} · 里程碑：${week.milestone}`));
      const weekScore = Common.el("span", "week-score");
      weekScore.dataset.weekScore = String(week.number);
      Common.append(heading, Common.el("div", "week-number", String(week.number)), headingCopy, weekScore);
      const list = Common.el("div", "day-list");
      week.days.forEach((day, dayIndex) => {
        list.appendChild(renderDay(week, day, dayIndex, dates[dateIndex], state));
        dateIndex += 1;
      });
      Common.append(section, heading, list);
      root.appendChild(section);
      refreshWeek(week.number);
    });
    updateProgress();
    applyFilter();
    focusHashTarget();
  };

  const refreshCard = (weekNumber, dayIndex) => {
    const week = weeks.find((item) => item.number === weekNumber);
    const day = week.days[dayIndex];
    const state = StorageManager.getState();
    const status = dayStatus(week, day, dayIndex, state);
    const card = document.querySelector(`[data-day-id="${dayId(weekNumber, dayIndex)}"]`);
    if (card) {
      card.dataset.done = String(status.done);
      card.classList.toggle("done", status.done);
      const overdue = !status.done && card.dataset.date < Common.toDateString(new Date());
      card.classList.toggle("overdue", overdue);
      const overdueBadge = card.querySelector(".overdue-badge");
      if (status.done && overdueBadge) overdueBadge.remove();
      if (overdue && !overdueBadge) card.querySelector(".day-date")?.appendChild(Common.el("span", "overdue-badge", "待补"));
      card.querySelector(".day-count").textContent = `${status.complete}/${status.total}`;
    }
    refreshWeek(weekNumber);
  };

  const refreshWeek = (weekNumber) => {
    const week = weeks.find((item) => item.number === weekNumber);
    const state = StorageManager.getState();
    let complete = 0;
    let total = 0;
    week.days.forEach((day, dayIndex) => {
      const status = dayStatus(week, day, dayIndex, state);
      complete += status.complete;
      total += status.total;
    });
    const node = document.querySelector(`[data-week-score="${weekNumber}"]`);
    if (node) node.textContent = `${complete}/${total} 项`;
  };

  const applyFilter = () => {
    const today = Common.toDateString(new Date());
    const cards = [...document.querySelectorAll(".day-card")];
    const todayCard = cards.find((card) => card.dataset.date === today);
    const focusCard = todayCard || cards.find((card) => card.dataset.done === "false");
    let visible = 0;
    cards.forEach((card) => {
      const show = activeFilter === "all" ||
        (activeFilter === "done" && card.dataset.done === "true") ||
        (activeFilter === "pending" && card.dataset.done === "false") ||
        (activeFilter === "overdue" && card.dataset.done === "false" && card.dataset.date < today) ||
        (activeFilter === "focus" && card === focusCard);
      card.hidden = !show;
      if (show) visible += 1;
    });
    document.querySelectorAll(".week-block").forEach((week) => {
      week.hidden = !week.querySelector(".day-card:not([hidden])");
    });
    let notice = document.getElementById("scheduleNotice");
    if (activeFilter === "focus" && focusCard && !todayCard) {
      if (!notice) {
        notice = Common.el("div", "schedule-notice", "今天没有安排课程，已显示下一项未完成内容。");
        notice.id = "scheduleNotice";
        root.prepend(notice);
      }
    } else if (notice) notice.remove();
    let empty = document.getElementById("scheduleEmpty");
    if (!visible) {
      if (!empty) {
        const message = activeFilter === "overdue" ? "没有待补内容。" : activeFilter === "focus" ? "全部任务都已完成。" : "这个筛选条件下暂时没有任务。";
        empty = Common.el("div", "grid-empty", message);
        empty.id = "scheduleEmpty";
        root.appendChild(empty);
      }
    } else if (empty) empty.remove();
  };

  const focusHashTarget = () => {
    const targetId = decodeURIComponent(window.location.hash.slice(1));
    if (!/^w\d+d\d+(t\d+)?$/.test(targetId)) return;
    window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId);
      const card = target?.closest(".day-card") || document.querySelector(`[data-day-id="${targetId}"]`);
      if (!card) return;
      card.classList.add("open");
      card.querySelector(".day-summary")?.setAttribute("aria-expanded", "true");
      card.scrollIntoView({ block: "center" });
      if (target instanceof HTMLElement) target.focus({ preventScroll: true });
    });
  };

  const exportCalendar = () => {
    const state = StorageManager.getState();
    const dates = Common.scheduleDates(state.startDate, 40);
    const escapeIcs = (value) => String(value).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
    const encoder = new TextEncoder();
    const foldIcsLine = (line) => {
      const chunks = [];
      let chunk = "";
      let byteLength = 0;
      let limit = 75;
      for (const character of line) {
        const characterBytes = encoder.encode(character).length;
        if (byteLength + characterBytes > limit && chunk) {
          chunks.push(chunk);
          chunk = character;
          byteLength = characterBytes;
          limit = 74;
        } else {
          chunk += character;
          byteLength += characterBytes;
        }
      }
      chunks.push(chunk);
      return chunks.join("\r\n ");
    };
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//AI Agent Learning Lab//ZH-CN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH"];
    flatDays().forEach(({ week, day, dayIndex }, index) => {
      const date = Common.toDateString(dates[index]).replace(/-/g, "");
      const description = day.tasks.map((item) => `□ ${item.text}`).join("\n");
      lines.push("BEGIN:VEVENT", `UID:w${week.number}d${dayIndex + 1}@ai-agent-learning-lab`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${date}`, `SUMMARY:${escapeIcs(`AI Agent 第${week.number}周：${day.title}`)}`, `DESCRIPTION:${escapeIcs(`${day.goal}\n${description}\n今日产出：${day.deliverable}`)}`, "END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    Common.downloadText("AI-Agent-8周学习日历.ics", `${lines.map(foldIcsLine).join("\r\n")}\r\n`, "text/calendar;charset=utf-8");
    Common.showFeedback("日历已导出");
  };

  const exportProgress = () => {
    Common.downloadText("AI-Agent-学习进度.json", JSON.stringify(StorageManager.getState(), null, 2), "application/json");
    Common.showFeedback("进度备份已导出");
  };

  startInput.addEventListener("change", () => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startInput.value)) return;
    const saved = StorageManager.setStartDate(startInput.value);
    if (!saved) {
      startInput.value = StorageManager.getState().startDate;
      Common.showFeedback("开始日期保存失败", false);
      return;
    }
    render();
    Common.showFeedback("日程日期已更新");
  });
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === activeFilter));
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((item) => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      applyFilter();
    });
  });
  document.getElementById("expandAll").addEventListener("click", (event) => {
    expandedAll = !expandedAll;
    document.querySelectorAll(".day-card:not([hidden])").forEach((card) => {
      card.classList.toggle("open", expandedAll);
      card.querySelector(".day-summary").setAttribute("aria-expanded", String(expandedAll));
    });
    event.currentTarget.textContent = expandedAll ? "收起全部" : "展开全部";
  });
  document.getElementById("downloadCalendar").addEventListener("click", exportCalendar);
  document.getElementById("exportProgress").addEventListener("click", exportProgress);
  window.addEventListener("hashchange", focusHashTarget);

  Common.createNav("schedule");
  Common.createFooter();
  render();
  Common.registerServiceWorker();
})();
