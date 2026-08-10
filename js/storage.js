window.AIAgentLab = window.AIAgentLab || {};

window.AIAgentLab.StorageManager = (() => {
  const KEY = "aiAgentLearningLab.v1";

  const defaultStartDate = () => {
    const date = new Date();
    while (date.getDay() === 0 || date.getDay() === 6) date.setDate(date.getDate() + 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const defaultState = () => ({
    version: 1,
    startDate: defaultStartDate(),
    checks: {},
    masteredConcepts: [],
    quizResults: {},
    notes: {},
    updatedAt: null
  });

  const isObject = (value) => Boolean(value && typeof value === "object" && !Array.isArray(value));

  const isValidDate = (value) => {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value));
    if (!match) return false;
    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12);
    return date.getFullYear() === Number(match[1]) && date.getMonth() === Number(match[2]) - 1 && date.getDate() === Number(match[3]);
  };

  const allowedIds = () => {
    const taskIds = new Set();
    const dayIds = new Set();
    (window.AIAgentLab.weeks || []).forEach((week) => week.days.forEach((day, dayIndex) => {
      const dayId = `w${week.number}d${dayIndex + 1}`;
      dayIds.add(dayId);
      day.tasks.forEach((_task, taskIndex) => taskIds.add(`${dayId}t${taskIndex + 1}`));
    }));
    const conceptIds = new Set((window.AIAgentLab.WordRoots || []).map((concept) => String(concept.id)));
    return { taskIds, dayIds, conceptIds };
  };

  const validate = (value) => Boolean(
    value &&
    typeof value === "object" &&
    value.version === 1 &&
    isValidDate(value.startDate) &&
    isObject(value.checks) &&
    Array.isArray(value.masteredConcepts) &&
    isObject(value.quizResults) &&
    isObject(value.notes)
  );

  const sanitize = (value) => {
    const next = defaultState();
    const { taskIds, dayIds, conceptIds } = allowedIds();
    if (isValidDate(value.startDate)) next.startDate = value.startDate;
    taskIds.forEach((id) => { if (value.checks[id] === true) next.checks[id] = true; });
    next.masteredConcepts = [...new Set(value.masteredConcepts.filter(Number.isInteger).filter((id) => conceptIds.has(String(id))))].sort((a, b) => a - b);
    conceptIds.forEach((id) => { if (typeof value.quizResults[id] === "boolean") next.quizResults[id] = value.quizResults[id]; });
    dayIds.forEach((id) => {
      if (typeof value.notes[id] === "string" && value.notes[id].trim()) next.notes[id] = value.notes[id].slice(0, 2000);
    });
    next.updatedAt = typeof value.updatedAt === "string" ? value.updatedAt : null;
    return next;
  };

  const read = () => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return validate(parsed) ? sanitize(parsed) : defaultState();
    } catch (error) {
      console.error("无法读取学习进度：", error);
      return defaultState();
    }
  };

  const write = (state) => {
    try {
      if (!validate(state)) return false;
      const next = { ...sanitize(state), updatedAt: new Date().toISOString() };
      localStorage.setItem(KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("ai-agent-progress", { detail: next }));
      return true;
    } catch (error) {
      console.error("无法保存学习进度：", error);
      return false;
    }
  };

  return Object.freeze({
    getState: read,
    setStartDate(startDate) {
      const state = read();
      state.startDate = startDate;
      return write(state);
    },
    setCheck(id, checked) {
      const state = read();
      if (checked) state.checks[id] = true;
      else delete state.checks[id];
      return write(state);
    },
    setNote(id, note) {
      const state = read();
      const clean = String(note || "").slice(0, 2000);
      if (clean.trim()) state.notes[id] = clean;
      else delete state.notes[id];
      return write(state);
    },
    setConceptMastered(id, mastered) {
      const state = read();
      const conceptId = Number(id);
      const ids = new Set(state.masteredConcepts.map(Number));
      if (mastered) ids.add(conceptId);
      else ids.delete(conceptId);
      state.masteredConcepts = [...ids].sort((a, b) => a - b);
      return write(state);
    },
    setQuizResult(id, isCorrect) {
      const state = read();
      state.quizResults[String(id)] = Boolean(isCorrect);
      return write(state);
    },
    importState(candidate) {
      if (!validate(candidate)) return false;
      return write(sanitize(candidate));
    },
    reset() {
      try {
        localStorage.removeItem(KEY);
        window.dispatchEvent(new CustomEvent("ai-agent-progress", { detail: defaultState() }));
        return true;
      } catch (error) {
        console.error("无法重置学习进度：", error);
        return false;
      }
    }
  });
})();
