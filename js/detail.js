(() => {
  const { Common, WordRoots, StorageManager } = window.AIAgentLab;
  const rawId = new URLSearchParams(window.location.search).get("id");
  const concept = WordRoots.find((item) => item.id === Number(rawId)) || WordRoots[0];

  const shuffledQuizOptions = () => {
    const options = concept.quiz.options.map((label, index) => ({
      label,
      isCorrect: index === concept.quiz.correctAnswer
    }));
    for (let index = options.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [options[index], options[target]] = [options[target], options[index]];
    }
    return options;
  };

  const renderMasterButton = () => {
    const mastered = StorageManager.getState().masteredConcepts.map(Number).includes(concept.id);
    const button = document.getElementById("detailMaster");
    button.textContent = mastered ? "✓ 已掌握（点击取消）" : "标记已掌握";
    button.classList.toggle("btn-primary", !mastered);
    button.classList.toggle("btn-secondary", mastered);
  };

  const render = () => {
    document.title = `${concept.root}｜AI Agent 学习实验室`;
    document.getElementById("detailOrigin").textContent = concept.origin;
    document.getElementById("detailName").textContent = concept.root;
    document.getElementById("detailMeaning").textContent = concept.meaning;
    document.getElementById("detailDescription").textContent = concept.description;
    const examples = document.getElementById("detailExamples");
    examples.replaceChildren();
    concept.examples.forEach((example) => {
      const item = Common.el("li", "example-item");
      Common.append(item, Common.el("strong", "", `${example.word} · ${example.meaning}`), Common.el("span", "", example.explanation));
      examples.appendChild(item);
    });
    document.getElementById("quizQuestion").textContent = concept.quiz.question;
    const options = document.getElementById("quizOptions");
    options.replaceChildren();
    const quizOptions = shuffledQuizOptions();
    quizOptions.forEach((option, optionIndex) => {
      const button = Common.el("button", "quiz-option", option.label);
      button.type = "button";
      button.addEventListener("click", () => {
        const correct = option.isCorrect;
        options.querySelectorAll("button").forEach((item) => {
          const renderedOption = quizOptions[Number(item.dataset.optionIndex)];
          item.disabled = true;
          item.classList.toggle("correct", renderedOption.isCorrect);
          item.classList.toggle("wrong", item === button && !correct);
          if (renderedOption.isCorrect) item.setAttribute("aria-label", `${item.textContent}（正确答案）`);
          else if (item === button) item.setAttribute("aria-label", `${item.textContent}（你的答案，错误）`);
        });
        const correctOption = quizOptions.find((item) => item.isCorrect);
        document.getElementById("quizFeedback").textContent = correct ? "回答正确。" : `回答不正确。正确答案：${correctOption.label}。已加入错题复习。`;
        const saved = StorageManager.setQuizResult(concept.id, correct);
        if (!saved) {
          Common.showFeedback("答案已显示，但测验记录保存失败", false);
          return;
        }
        Common.showFeedback(correct ? "回答正确" : "已加入错题复习", correct);
      });
      button.dataset.optionIndex = String(optionIndex);
      options.appendChild(button);
    });
    renderMasterButton();
  };

  document.getElementById("detailMaster").addEventListener("click", () => {
    const mastered = StorageManager.getState().masteredConcepts.map(Number).includes(concept.id);
    const saved = StorageManager.setConceptMastered(concept.id, !mastered);
    if (saved) renderMasterButton();
    Common.showFeedback(saved ? (mastered ? "已取消掌握标记" : "概念已标记为掌握") : "保存失败", saved);
  });
  Common.createNav("library");
  Common.createFooter();
  render();
  Common.registerServiceWorker();
})();
