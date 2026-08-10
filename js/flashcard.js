(() => {
  const { Common, WordRoots, StorageManager } = window.AIAgentLab;
  const card = document.getElementById("flashcard");
  const front = document.getElementById("flashcardFront");
  const back = document.getElementById("flashcardBack");
  const modeButtons = [...document.querySelectorAll("[data-card-mode]")];
  let mode = new URLSearchParams(window.location.search).get("mode") === "wrong" ? "wrong" : "all";
  let deck = WordRoots;
  let index = 0;

  const wrongConcepts = (state) => WordRoots.filter((concept) => state.quizResults[String(concept.id)] === false);

  const rebuildDeck = (showEmptyFeedback = false) => {
    const wrong = wrongConcepts(StorageManager.getState());
    document.getElementById("wrongCardCount").textContent = String(wrong.length);
    if (mode === "wrong" && !wrong.length) {
      mode = "all";
      if (showEmptyFeedback) Common.showFeedback("目前没有错题，已显示全部闪卡");
    }
    deck = mode === "wrong" ? wrong : WordRoots;
    index = Math.min(index, deck.length - 1);
    modeButtons.forEach((button) => {
      const selected = button.dataset.cardMode === mode;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    const url = new URL(window.location.href);
    if (mode === "wrong") url.searchParams.set("mode", "wrong");
    else url.searchParams.delete("mode");
    window.history.replaceState(null, "", url);
  };

  const setFlipped = (flipped) => {
    card.classList.toggle("flipped", flipped);
    card.setAttribute("aria-pressed", String(flipped));
    front.setAttribute("aria-hidden", String(flipped));
    back.setAttribute("aria-hidden", String(!flipped));
    front.inert = flipped;
    back.inert = !flipped;
  };

  const render = () => {
    const concept = deck[index];
    const state = StorageManager.getState();
    const mastered = state.masteredConcepts.map(Number).includes(concept.id);
    document.getElementById("frontOrigin").textContent = concept.origin;
    document.getElementById("backOrigin").textContent = concept.origin;
    document.getElementById("frontName").textContent = concept.root;
    document.getElementById("backName").textContent = concept.root;
    document.getElementById("frontMeaning").textContent = concept.meaning;
    document.getElementById("backDescription").textContent = concept.description;
    const examples = document.getElementById("backExamples");
    examples.replaceChildren();
    concept.examples.forEach((example) => {
      const item = Common.el("div", "flashcard-example");
      Common.append(item, Common.el("strong", "", example.word), document.createTextNode(example.explanation));
      examples.appendChild(item);
    });
    document.getElementById("cardCounter").textContent = `${index + 1} / ${deck.length}`;
    const button = document.getElementById("masterCard");
    button.textContent = mastered ? "✓ 已掌握" : "标记已掌握";
    button.classList.toggle("btn-primary", !mastered);
    button.classList.toggle("btn-secondary", mastered);
    setFlipped(false);
    card.setAttribute("aria-label", `${concept.root}。点击翻转闪卡`);
  };

  const move = (step) => {
    index = (index + step + deck.length) % deck.length;
    render();
  };

  const flip = () => setFlipped(!card.classList.contains("flipped"));
  card.addEventListener("click", flip);
  card.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Enter") { event.preventDefault(); flip(); }
    if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
  });
  document.getElementById("prevCard").addEventListener("click", () => move(-1));
  document.getElementById("nextCard").addEventListener("click", () => move(1));
  document.getElementById("masterCard").addEventListener("click", () => {
    const concept = deck[index];
    const mastered = StorageManager.getState().masteredConcepts.map(Number).includes(concept.id);
    const saved = StorageManager.setConceptMastered(concept.id, !mastered);
    if (saved) render();
    Common.showFeedback(saved ? (mastered ? "已取消掌握标记" : "概念已标记为掌握") : "保存失败", saved);
  });
  modeButtons.forEach((button) => button.addEventListener("click", () => {
    mode = button.dataset.cardMode;
    index = 0;
    rebuildDeck(true);
    render();
  }));

  Common.createNav("flashcards");
  Common.createFooter();
  rebuildDeck(true);
  render();
  Common.registerServiceWorker();
})();
