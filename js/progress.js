(() => {
  const { Common, weeks, WordRoots, StorageManager } = window.AIAgentLab;

  const taskId = (weekNumber, dayIndex, taskIndex) => `w${weekNumber}d${dayIndex + 1}t${taskIndex + 1}`;

  const findNext = (state) => {
    for (const week of weeks) {
      for (let dayIndex = 0; dayIndex < week.days.length; dayIndex += 1) {
        const day = week.days[dayIndex];
        for (let taskIndex = 0; taskIndex < day.tasks.length; taskIndex += 1) {
          if (!state.checks[taskId(week.number, dayIndex, taskIndex)]) {
            return { week: week.number, day: dayIndex + 1, taskIndex: taskIndex + 1, title: day.title, task: day.tasks[taskIndex].text };
          }
        }
      }
    }
    return null;
  };

  const completedDays = (state) => weeks.reduce((sum, week) => sum + week.days.filter((day, dayIndex) => day.tasks.every((_task, taskIndex) => state.checks[taskId(week.number, dayIndex, taskIndex)])).length, 0);

  const render = () => {
    const state = StorageManager.getState();
    const progress = Common.getProgress(state);
    const mastered = state.masteredConcepts.length;
    const quizEntries = Object.entries(state.quizResults);
    const quizzes = quizEntries.length;
    const correctQuizzes = quizEntries.filter(([, isCorrect]) => isCorrect).length;
    const wrongConcepts = WordRoots.filter((concept) => state.quizResults[String(concept.id)] === false);
    const accuracy = quizzes ? Math.round((correctQuizzes / quizzes) * 100) : 0;
    const metrics = [
      { label: "任务完成", value: `${progress.percentage}%`, note: `${progress.complete} / ${progress.total} 项` },
      { label: "完整学习日", value: `${completedDays(state)}/40`, note: "当天 4 项全部勾选" },
      { label: "概念掌握", value: `${mastered}/${WordRoots.length}`, note: "可在闪卡中更新" },
      { label: "概念测验", value: `${correctQuizzes}/${quizzes}`, note: quizzes ? `正确率 ${accuracy}% · ${wrongConcepts.length} 道待复习` : "完成测验后显示正确率" }
    ];
    const metricGrid = document.getElementById("metricGrid");
    metricGrid.replaceChildren();
    metrics.forEach((metric) => {
      const card = Common.el("article", "card metric-card");
      Common.append(card, Common.el("div", "metric-label", metric.label), Common.el("p", "metric-value", metric.value), Common.el("p", "metric-note", metric.note));
      metricGrid.appendChild(card);
    });

    const weekly = document.getElementById("weeklyProgress");
    weekly.replaceChildren();
    weeks.forEach((week) => {
      let complete = 0;
      let total = 0;
      week.days.forEach((day, dayIndex) => day.tasks.forEach((_task, taskIndex) => {
        total += 1;
        if (state.checks[taskId(week.number, dayIndex, taskIndex)]) complete += 1;
      }));
      const percentage = Math.round((complete / total) * 100);
      const row = Common.el("div", "week-row");
      const track = Common.el("div", "week-row-track");
      const fill = Common.el("div", "week-row-fill");
      fill.style.width = `${percentage}%`;
      track.appendChild(fill);
      Common.append(row, Common.el("div", "week-row-label", `第 ${week.number} 周 · ${week.title}`), track, Common.el("div", "week-row-value", `${complete}/${total}`));
      weekly.appendChild(row);
    });

    const next = findNext(state);
    document.getElementById("nextText").textContent = next ? `第 ${next.week} 周第 ${next.day} 天 · ${next.title}：${next.task}` : "全部完成。导出备份，保存你的毕业记录。";
    const nextLink = document.getElementById("nextLink");
    nextLink.href = next ? `learn.html#w${next.week}d${next.day}t${next.taskIndex}` : "roots.html";
    nextLink.textContent = next ? "继续学习" : "复习概念";

    const reviewText = document.getElementById("quizReviewText");
    const reviewLinks = document.getElementById("quizReviewLinks");
    const reviewLink = document.getElementById("quizReviewLink");
    reviewLinks.replaceChildren();
    if (wrongConcepts.length) {
      reviewText.textContent = `${wrongConcepts.length} 个概念需要再看一次。先凭记忆解释，再回到测验修正记录。`;
      wrongConcepts.slice(0, 6).forEach((concept) => {
        const link = Common.el("a", "review-chip", concept.root);
        link.href = `root-detail.html?id=${concept.id}`;
        reviewLinks.appendChild(link);
      });
      reviewLink.href = "flashcard.html?mode=wrong";
      reviewLink.textContent = "错题优先复习";
    } else {
      reviewText.textContent = quizzes ? "目前没有错题。可以继续完成尚未作答的概念测验。" : "还没有测验记录。先从任意概念详情开始。";
      reviewLink.href = "roots.html";
      reviewLink.textContent = "继续概念测验";
    }

    const achievements = [
      { icon: "◉", title: "启动实验", text: "完成第一个任务", unlocked: progress.complete >= 1 },
      { icon: "⌁", title: "Agent Builder", text: "完成前 2 周", unlocked: progress.complete >= 40 },
      { icon: "◇", title: "Skill Maker", text: "完成前 4 周", unlocked: progress.complete >= 80 },
      { icon: "⬡", title: "Red Teamer", text: "完成前 6 周", unlocked: progress.complete >= 120 },
      { icon: "★", title: "Capstone", text: "完成前 7 周", unlocked: progress.complete >= 140 },
      { icon: "✓", title: "实验室毕业", text: "完成全部 160 项", unlocked: progress.complete >= 160 },
      { icon: "▣", title: "概念猎手", text: "掌握 10 个概念", unlocked: mastered >= 10 },
      { icon: "∞", title: "全栈理解", text: "掌握 20 个概念", unlocked: mastered >= 20 }
    ];
    const achievementGrid = document.getElementById("achievementGrid");
    achievementGrid.replaceChildren();
    achievements.forEach((achievement) => {
      const card = Common.el("article", `achievement${achievement.unlocked ? " unlocked" : ""}`);
      Common.append(card, Common.el("div", "achievement-icon", achievement.icon), Common.el("h3", "", achievement.title), Common.el("p", "", achievement.text));
      achievementGrid.appendChild(card);
    });
    Common.updateGlobalProgress();
  };

  const exportState = () => {
    Common.downloadText("AI-Agent-学习进度.json", JSON.stringify(StorageManager.getState(), null, 2), "application/json");
    Common.showFeedback("学习记录已导出");
  };

  document.getElementById("exportState").addEventListener("click", exportState);
  document.getElementById("importButton").addEventListener("click", () => document.getElementById("importState").click());
  document.getElementById("importState").addEventListener("change", async (event) => {
    const [file] = event.target.files;
    if (!file) return;
    try {
      if (file.size > 1024 * 1024) throw new Error("备份文件超过 1 MB，请选择由本课程导出的 JSON 文件");
      const candidate = JSON.parse(await file.text());
      const imported = StorageManager.importState(candidate);
      if (!imported) throw new Error("备份格式无效，或浏览器无法保存学习记录");
      render();
      Common.showFeedback("学习记录已恢复");
    } catch (error) {
      Common.showFeedback(`导入失败：${error.message}`, false);
    } finally {
      event.target.value = "";
    }
  });
  document.getElementById("resetState").addEventListener("click", () => {
    if (!window.confirm("确定重置所有勾选、笔记、闪卡和测验记录吗？导出备份后仍可恢复。")) return;
    const reset = StorageManager.reset();
    if (reset) render();
    Common.showFeedback(reset ? "学习记录已重置" : "重置失败", reset);
  });

  Common.createNav("progress");
  Common.createFooter();
  render();
  Common.registerServiceWorker();
})();
