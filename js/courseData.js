window.AIAgentLab = window.AIAgentLab || {};

window.AIAgentLab.resources = Object.freeze([
  {
    id: "v-openai-academy",
    type: "video",
    title: "Agents and Workflows",
    source: "OpenAI Academy",
    duration: "75–90 分钟",
    level: "入门",
    access: "免费；登录后可保存进度",
    url: "https://academy.openai.com/public/courses/agents-and-workflows-bieml",
    why: "从真实工作出发理解上下文、边界、审核与复用，适合作为第一课。",
    verified: "2026-08-10"
  },
  {
    id: "v-anthropic-effective",
    type: "video",
    title: "Building more effective AI agents",
    source: "Anthropic",
    duration: "约 18 分钟",
    level: "进阶",
    access: "YouTube 免费",
    url: "https://www.youtube.com/watch?v=uhJJgc-0iTQ",
    why: "直接讲简单架构、多 Agent、Skills、MCP、工具与常见失败。",
    verified: "2026-08-08"
  },
  {
    id: "v-andrew-agentic",
    type: "video",
    title: "Agentic AI",
    source: "DeepLearning.AI · Andrew Ng",
    duration: "7 小时 45 分钟（课程）",
    level: "中级",
    access: "可免费旁听视频；测验与证书以页面说明为准",
    url: "https://www.deeplearning.ai/courses/agentic-ai",
    why: "从第一性原理学习 Reflection、Tool Use、Planning、Multi-Agent 和 Evals。",
    verified: "2026-08-08"
  },
  {
    id: "v-langchain-deep",
    type: "video",
    title: "Introduction to Deep Agents",
    source: "LangChain Academy",
    duration: "43 课；约 30 分钟视频 + 实践",
    level: "中级",
    access: "免费",
    url: "https://academy.langchain.com/courses/foundation-introduction-to-deepagents",
    why: "覆盖 Tools、MCP、HITL、Memory、Skills、Delegation 与完整 Sales Assistant 项目。",
    verified: "2026-08-08"
  },
  {
    id: "v-hf-agents",
    type: "course",
    title: "AI Agents 课程（中文）",
    source: "Hugging Face",
    duration: "建议每单元 3–4 小时",
    level: "有基础 Python 的入门者",
    access: "免费；可参加挑战与认证",
    url: "https://huggingface.co/learn/agents-course/zh-CN/unit0/introduction",
    why: "从 Tools/Actions/Observations 到框架、Agentic RAG、Evals 与最终排行榜挑战。",
    verified: "2026-08-08"
  },
  {
    id: "p-openai-tools",
    type: "podcast",
    title: "OpenAI’s New Agent Development Tools",
    source: "Unsupervised Learning · Nikunj Handa & Steve Coffey",
    duration: "45 分钟",
    level: "中级",
    access: "Apple Podcasts 免费",
    url: "https://podcasts.apple.com/us/podcast/ep-59-openai-product-eng-leads-nikunj-handa-and-steve/id1672188924?i=1000700762639",
    why: "OpenAI 产品与工程负责人讨论 Responses API、MCP、Computer Use 和工具生态。",
    verified: "2026-08-08"
  },
  {
    id: "p-mcp-origin",
    type: "podcast",
    title: "MCP Co-Creator on the Next Wave of LLM Innovation",
    source: "AI + a16z · David Soria Parra",
    duration: "约 42 分钟",
    level: "中级",
    access: "网页、Apple、Spotify 免费",
    url: "https://a16z.com/podcast/mcp-co-creator-on-the-next-wave-of-llm-innovation/",
    why: "从 MCP 共同创建者口中理解协议为何出现、解决什么问题以及如何演进。",
    verified: "2026-08-08"
  },
  {
    id: "p-agent-fog",
    type: "podcast",
    title: "AI Agents Are Here: What They Can Already Do—and What’s Next",
    source: "The Generalist · Stanislas Polu & Harrison Chase",
    duration: "约 50 分钟",
    level: "入门到中级",
    access: "网页含音频、视频和 transcript",
    url: "https://www.generalist.com/p/the-evolution-of-ai-agents",
    why: "从产品与基础设施视角辨认 Agents、Workflows、可靠性限制和高价值场景。",
    verified: "2026-08-08"
  },
  {
    id: "p-mcp-year",
    type: "podcast",
    title: "One Year of MCP",
    source: "Latent Space · Anthropic/OpenAI/Block/Linux Foundation",
    duration: "1 小时 39 分钟（建议选听）",
    level: "进阶",
    access: "网页音频、视频与 transcript 免费",
    url: "https://www.latent.space/p/one-year-of-mcp-with-david-soria",
    why: "理解 MCP 的企业采用、认证、Tasks、MCP Apps、Skills 与开放治理。",
    verified: "2026-08-08"
  },
  {
    id: "r-openai-workspace",
    type: "reading",
    title: "Workspace agents",
    source: "OpenAI Academy",
    duration: "15 分钟",
    level: "入门",
    access: "免费",
    url: "https://openai.com/academy/workspace-agents/",
    why: "用 Trigger、Process/Skills、Tools、Governance 拆解 Agent，并强调真实测试与迭代。",
    verified: "2026-08-08"
  },
  {
    id: "r-openai-guide",
    type: "reading",
    title: "A practical guide to building agents",
    source: "OpenAI",
    duration: "35–50 分钟",
    level: "入门到中级",
    access: "免费；网页与 PDF",
    url: "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/",
    why: "系统覆盖何时使用 Agent、Model/Tools/Instructions、单/多 Agent 编排与 Guardrails。",
    verified: "2026-08-08"
  },
  {
    id: "r-anthropic-patterns",
    type: "reading",
    title: "Building effective agents",
    source: "Anthropic Engineering",
    duration: "30–40 分钟",
    level: "中级",
    access: "免费",
    url: "https://www.anthropic.com/engineering/building-effective-agents",
    why: "从 Augmented LLM 逐步增加 Prompt Chaining、Routing、Parallelization、Orchestrator–Workers 和 Agents。",
    verified: "2026-08-08"
  },
  {
    id: "r-sdk-quickstart",
    type: "reading",
    title: "OpenAI Agents SDK Quickstart",
    source: "OpenAI",
    duration: "30–60 分钟含实践",
    level: "基础 Python",
    access: "文档免费；运行 API 可能产生费用",
    url: "https://openai.github.io/openai-agents-python/quickstart/",
    why: "用最少概念跑通 Agent、Function Tool、Handoff 与 Trace。",
    verified: "2026-08-08"
  },
  {
    id: "r-mcp-architecture",
    type: "reading",
    title: "MCP Architecture overview",
    source: "Model Context Protocol",
    duration: "25–35 分钟",
    level: "中级",
    access: "免费",
    url: "https://modelcontextprotocol.io/docs/learn/architecture",
    why: "官方解释 Host、Client、Server、Data Layer、Transport 与 Discovery。",
    verified: "2026-08-08"
  },
  {
    id: "r-hf-context",
    type: "course",
    title: "The Context Course",
    source: "Hugging Face",
    duration: "6 个核心单元",
    level: "基础命令行/Python",
    access: "免费",
    url: "https://huggingface.co/learn/context-course/unit0/introduction",
    why: "完整覆盖 Agent Skills、MCP、Plugins、Sub-agents、Hooks 和最小 Agent Loop。",
    verified: "2026-08-08"
  },
  {
    id: "r-skills-spec",
    type: "reading",
    title: "Agent Skills Specification",
    source: "Agent Skills open standard",
    duration: "15–25 分钟",
    level: "中级",
    access: "免费",
    url: "https://github.com/agentskills/agentskills/blob/main/docs/specification.mdx",
    why: "核对 SKILL.md 的目录结构、必填元数据、脚本与参考资料规则。",
    verified: "2026-08-08"
  },
  {
    id: "r-hf-skills",
    type: "course",
    title: "Unit 1: Agent Skills",
    source: "Hugging Face Context Course",
    duration: "约 2–3 小时含练习",
    level: "中级",
    access: "免费",
    url: "https://huggingface.co/learn/context-course/unit1/introduction",
    why: "从上下文问题走到 Skill 格式、使用、创建、调试和测验。",
    verified: "2026-08-08"
  },
  {
    id: "r-agent-evals",
    type: "reading",
    title: "Evaluate agent workflows",
    source: "OpenAI API Docs",
    duration: "25–40 分钟",
    level: "中级",
    access: "文档免费",
    url: "https://developers.openai.com/api/docs/guides/agent-evals",
    why: "用 Traces、Graders、Datasets 和 Eval Runs 建立可重复质量循环。",
    verified: "2026-08-08"
  },
  {
    id: "r-nist-hijacking",
    type: "reading",
    title: "Strengthening AI Agent Hijacking Evaluations",
    source: "NIST CAISI",
    duration: "25–35 分钟",
    level: "进阶",
    access: "免费",
    url: "https://www.nist.gov/news-events/news/2025/01/technical-blog-strengthening-ai-agent-hijacking-evaluations",
    why: "通过真实评测理解间接提示注入、重复攻击、风险分级与对抗测试。",
    verified: "2026-08-08"
  },
  {
    id: "r-owasp-agentic",
    type: "reading",
    title: "Agentic AI – Threats and Mitigations",
    source: "OWASP GenAI Security Project",
    duration: "30–45 分钟",
    level: "进阶",
    access: "免费",
    url: "https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/",
    why: "为 Capstone 建立威胁模型、权限边界和分层缓解措施。",
    verified: "2026-08-08"
  },
  {
    id: "r-autonomy",
    type: "reading",
    title: "Measuring AI agent autonomy in practice",
    source: "Anthropic Research",
    duration: "20–30 分钟",
    level: "进阶",
    access: "免费",
    url: "https://www.anthropic.com/research/measuring-agent-autonomy",
    why: "把抽象的“自主性”转成可观察、可治理的行为与监督问题。",
    verified: "2026-08-08"
  }
]);

const task = (kind, text, resourceId = null, link = null) => ({ kind, text, resourceId, link });
const day = (title, minutes, goal, tasks, deliverable, fun) => ({ title, minutes, goal, tasks, deliverable, fun });

window.AIAgentLab.weeks = Object.freeze([
  {
    number: 1,
    title: "看懂 Agent：先建立判断力",
    subtitle: "从你熟悉的工作和 Codex 行为出发，分清 Agent、Workflow 与普通聊天。",
    milestone: "一张 Agent Canvas v1",
    days: [
      day("Agent Safari：捕捉一只活的 Agent", 70, "观察 Agent 如何围绕目标连续行动。", [
        task("看", "学习 OpenAI Academy 的 Agents and Workflows 前半段。", "v-openai-academy"),
        task("做", "回看一次 Codex 或 WorkBuddy 任务，写下它的目标、观察、动作、反馈和停止点。"),
        task("想", "列出 3 个你日常遇到的重复工作，标出哪些需要判断、哪些只需固定流程。"),
        task("测", "不看资料，用 60 秒向自己解释 Agent 与普通聊天的区别。")
      ], "一份“Agent 行为观察记录”", "像自然观察员一样给 Agent 画足迹图。"),
      day("拆开 Agent 的身体", 65, "掌握 Trigger、Process/Skills、Tools、Governance。", [
        task("读", "精读 Workspace agents 的定义、Anatomy 和测试部分。", "r-openai-workspace"),
        task("做", "选择一个“每周业务回顾”场景，填写 Agent Canvas 四大模块。", null, "templates/agent-canvas.md"),
        task("测", "为场景写出 2 个应该由 Agent 暂停并询问人的情况。"),
        task("记", "在今天的笔记中写下最容易被忽略的一项治理规则。")
      ], "Agent Canvas 初稿", "把 Agent 当作新同事做入职设计。"),
      day("通勤播客：穿过 Fog of AI", 60, "从产品视角理解 Agent 的价值与限制。", [
        task("听", "选听 18:42–46:30：Agent 定义、高杠杆场景、可靠性与单/多 Agent。", "p-agent-fog"),
        task("记", "记录 3 个嘉宾观点，并标注“事实、经验或预测”。"),
        task("做", "给昨天的场景加一个明确 KPI 和一个失败指标。"),
        task("测", "回答：为什么开放式脑暴未必需要 Agent？")
      ], "一页播客观点卡", "走路听；回家后只保留 3 句话。"),
      day("什么时候值得造 Agent？", 75, "学会用复杂度与价值筛选场景。", [
        task("读", "阅读 OpenAI Practical Guide 的 What/When/Design foundations。", "r-openai-guide"),
        task("做", "用“判断复杂、规则难维护、非结构化数据”三个维度给 3 个场景打分。"),
        task("做", "淘汰至少 1 个更适合普通自动化的场景，并写明原因。"),
        task("测", "从剩余场景中选出 Capstone 候选题。")
      ], "一张场景优先级表", "进行一次“反 Agent”比赛：找到最该用普通自动化的任务。"),
      day("第一周 Boss Battle", 80, "把概念压缩成一张能交给同事看的设计图。", [
        task("复", "用闪卡复习概念 1–5，并标记掌握。", null, "flashcard.html"),
        task("做", "完成 Agent Canvas v1：目标、触发、输入、步骤、工具、边界、输出、KPI。", null, "templates/agent-canvas.md"),
        task("测", "找 3 个真实例子测试 Canvas：正常、缺信息、越权请求。"),
        task("讲", "录一段 90 秒语音：这个 Agent 为什么值得做，它何时必须停。")
      ], "Agent Canvas v1 + 90 秒讲解", "Boss 不是代码，是模糊需求。")
    ]
  },
  {
    number: 2,
    title: "Agent Loop 与 Tools：让模型真正行动",
    subtitle: "从一个循环和一个小工具开始，不被框架遮住原理。",
    milestone: "单 Agent 研究助手 v0.1",
    days: [
      day("从 Augmented LLM 开始", 75, "理解检索、工具与记忆如何扩展模型。", [
        task("读", "阅读 Anthropic：Augmented LLM、Prompt Chaining 与 Routing。", "r-anthropic-patterns"),
        task("画", "为“公开信息研究”画 Observe → Decide → Act → Observe 循环。"),
        task("做", "为循环定义完成、失败、最大步数三个退出条件。"),
        task("测", "指出固定 Prompt Chaining 与自主 Agent 的差别。")
      ], "Agent Loop 图", "用便利贴模拟每一步，亲手移动状态。"),
      day("跑通第一个 Agent", 90, "看到一次完整 Agent Run。", [
        task("读", "完成 OpenAI Agents SDK Quickstart 的 First agent 与 Run。", "r-sdk-quickstart"),
        task("做", "运行 History Tutor 示例；无 API 环境时，用 Codex 模拟每一步输入输出。"),
        task("改", "把角色改成“公开资料研究助手”，输出结论与缺口。"),
        task("记", "记录一次 Run 中模型输入、模型输出与退出原因。")
      ], "可运行的第一个 Agent 或完整模拟 Trace", "把第一次成功运行截图当作实验室徽章。"),
      day("工具设计卡牌", 80, "写出模型容易正确选择的工具。", [
        task("听", "选听 OpenAI Agent Tools 播客 0:00–17:20。", "p-openai-tools"),
        task("做", "设计 search_public_sources 与 save_research_note 两个工具的名称、描述、参数和返回值。"),
        task("测", "写 5 个请求，预测 Agent 应选哪个工具或不选工具。"),
        task("改", "找出两个描述中的重叠与歧义，做一次最小修改。")
      ], "两张 Tool Card + 5 个选择测试", "像桌游一样：每个请求只能打出一张工具牌。"),
      day("结构化输出与失败注入", 80, "让结果可被下一步稳定消费。", [
        task("看", "学习 Andrew Ng Agentic AI 中 Task decomposition 与 Evals 两节。", "v-andrew-agentic"),
        task("做", "为研究结果定义 title、claim、evidence、source_date、confidence、gap 字段。"),
        task("测", "故意输入空标题、坏日期、缺来源，观察并记录失败。"),
        task("改", "增加默认值、校验和明确错误信息。")
      ], "研究卡片 Schema + 3 个失败样本", "今天的任务是故意把 Agent 弄坏。"),
      day("小项目：研究助手 v0.1", 90, "把 Loop、Tools 和 Structured Output 连起来。", [
        task("做", "让 Agent 针对一个低风险公开主题提出 3 个子问题并搜索资料。"),
        task("做", "要求它输出 3 张结构化研究卡片，并保留无法确认之处。"),
        task("测", "用 3 个标准打分：来源、字段完整、是否知道停止。"),
        task("讲", "用 2 分钟解释一次失败来自模型、工具还是 Instructions。")
      ], "单 Agent 研究助手 v0.1", "为它取一个只有你看得懂的实验代号。")
    ]
  },
  {
    number: 3,
    title: "MCP：让 Agent 接上真实世界",
    subtitle: "从协议的出发点，到 Host–Client–Server，再到一次安全工具连接。",
    milestone: "一张 MCP 架构图 + 一次工具连接实验",
    days: [
      day("通勤播客：MCP 为什么出现", 65, "先理解问题，再看协议。", [
        task("听", "收听 MCP Co-Creator 访谈，关注起源、连接与未来。", "p-mcp-origin"),
        task("记", "写下 MCP 解决的 3 个摩擦点，以及它没有解决的 2 个问题。"),
        task("画", "用餐厅比喻 Host、Client、Server 与 Tool。"),
        task("测", "回答：MCP 是否等同于 Agent？为什么？")
      ], "MCP 问题—方案卡", "Host 是餐厅经理，Client 是专属服务员，Server 是后厨窗口。"),
      day("读懂官方架构", 80, "掌握参与者、数据层、传输层与能力发现。", [
        task("读", "精读 MCP Architecture 的 Scope、Participants、Layers。", "r-mcp-architecture"),
        task("画", "画一个 Codex 连接两个 MCP Server 的架构图。"),
        task("标", "在图上标出权限、认证、数据边界和用户批准点。"),
        task("测", "口头解释 stdio 与 remote HTTP 的差别。")
      ], "MCP 架构图", "把每条连接线都问一遍：谁信任谁？"),
      day("Context Course：MCP 实验", 90, "跟随一个维护中的官方课程完成工具连接。", [
        task("读", "完成 Hugging Face Context Course Unit 2 的 Introduction 与 Architecture。", "r-hf-context"),
        task("做", "选择课程示例或本地只读工具，完成一次 tool discovery。"),
        task("做", "调用一个只读工具并记录请求、返回和 Agent 的后续决定。"),
        task("测", "故意使用错误参数，检查错误是否清楚且不会扩大影响。")
      ], "一次 MCP Tool Trace", "今天只给 Agent 一把“塑料钥匙”：只读权限。"),
      day("工具权限与审批", 75, "按影响和可逆性划分工具风险。", [
        task("读", "阅读 OpenAI Practical Guide 的 Tools 与 Guardrails。", "r-openai-guide"),
        task("做", "把 8 个常见工具分成低/中/高风险，并写出原因。"),
        task("做", "为发送、删除、付款三类动作设计 preview → approve → execute。"),
        task("测", "给 3 个越权请求写出 Agent 应如何暂停并解释。")
      ], "Tool Risk Matrix", "给每个工具贴红黄绿权限贴纸。"),
      day("第三周 Boss Battle", 85, "把一个真实连接设计成可审查的能力。", [
        task("复", "用闪卡复习 Tools、Context、MCP、Guardrails。", null, "flashcard.html"),
        task("做", "为 Capstone 选择一个只读数据源或模拟 API，写工具契约。"),
        task("测", "覆盖正常、无结果、超时、恶意内容四种情况。"),
        task("讲", "用 2 分钟讲清数据从哪来、哪里可能被注入、何时需要人。")
      ], "Capstone Tool Contract v1", "Boss 会伪装成一段网页文字，诱导你忽略规则。")
    ]
  },
  {
    number: 4,
    title: "Agent Skills：把经验变成可复用能力",
    subtitle: "亲手制作一个能被 Codex 发现、加载、执行与验证的 Skill。",
    milestone: "你的第一个 SKILL.md",
    days: [
      day("从 Prompt 到 Skill", 70, "理解 Skills 与普通长提示词的差别。", [
        task("读", "完成 Hugging Face Context Course Unit 1 Introduction 与 What Are Skills。", "r-hf-skills"),
        task("找", "在现有 Codex Skills 中选一个你常用的，观察名称、描述和正文如何分工。"),
        task("写", "列出一个反复解释给 Agent 的专业流程。"),
        task("测", "判断这段知识更适合 Instructions、Skill、MCP 还是 Memory。")
      ], "Skill 候选清单", "把自己当作师傅：哪门手艺最值得写成上岗手册？"),
      day("读规范，设计触发", 75, "写出准确的元数据和最小目录。", [
        task("读", "阅读 Agent Skills Specification 的目录与 SKILL.md 格式。", "r-skills-spec"),
        task("做", "为 Skill 写 name 与 description，描述必须包含“做什么、何时用”。"),
        task("测", "写 5 个应该触发和 5 个不该触发的请求。"),
        task("改", "减少过宽关键词，消除与现有 Skill 的重叠。")
      ], "Skill 触发测试集", "今天玩“触发/不触发”二选一卡牌。"),
      day("写出 SKILL.md v0.1", 90, "把专业流程变成清晰、可执行、可验证的说明。", [
        task("做", "复制 Skill Starter，并填写目标、输入、步骤、边界、验证和失败处理。", null, "templates/skill-starter/SKILL.md"),
        task("做", "把容易过期的事实移到 references，把重复动作考虑为 scripts。"),
        task("测", "确认每一步都有可观察动作或输出。"),
        task("读", "回看 Progressive Disclosure，删掉激活时不必加载的细节。", "r-hf-skills")
      ], "SKILL.md v0.1", "限制正文两页以内，让它像精炼的航海手册。"),
      day("让 Skill 经受真实请求", 85, "测试发现、激活、执行与异常分支。", [
        task("做", "用 3 个正常请求运行 Skill，记录它实际读取了什么。"),
        task("测", "加入 3 个模糊或缺信息请求，观察是否正确提问或暂停。"),
        task("测", "加入 2 个越权请求，确认不会静默扩大范围。"),
        task("改", "只针对观察到的失败做最小修改。")
      ], "8 条 Skill 行为记录", "把测试称为“带教试用期”。"),
      day("Skill Demo Day", 80, "完成一个可复用、可解释的小能力。", [
        task("测", "重新运行 10 条触发测试，记录命中与误触发。"),
        task("测", "检查目录、元数据、引用路径和敏感信息。"),
        task("讲", "录制 2 分钟演示：不用 Skill 与使用 Skill 的差别。"),
        task("复", "把本周最重要的 5 条原则写成自己的 Skill Checklist。")
      ], "第一个可演示 Agent Skill", "给 Skill 发一张“上岗证”。")
    ]
  },
  {
    number: 5,
    title: "Multi-Agent、Memory 与 Human-in-the-loop",
    subtitle: "先证明单 Agent 不够，再增加协调、记忆和人工监督。",
    milestone: "单 Agent vs 多 Agent 对照实验",
    days: [
      day("简单架构优先", 65, "理解复杂度何时值得。", [
        task("看", "观看 Anthropic Building more effective AI agents。", "v-anthropic-effective"),
        task("记", "记录 3 个多 Agent 适用模式和 3 个常见失败。"),
        task("做", "为 Capstone 写一个单 Agent 版本，并列出当前真实瓶颈。"),
        task("测", "若瓶颈可通过更清楚工具描述解决，暂不拆 Agent。")
      ], "复杂度决策记录", "今天的挑战是忍住“多造几个 Agent”的冲动。"),
      day("Deep Agents：Tools、MCP、HITL", 85, "理解长任务中的工具与审批。", [
        task("看", "完成 LangChain Deep Agents Module 1 中 Tools、MCP、Messages、HITL。", "v-langchain-deep"),
        task("做", "为 Capstone 标出至少两个 HITL checkpoint。"),
        task("测", "设计一次暂停—批准—恢复的状态转换。"),
        task("记", "写出谁拥有最终决策权，以及 Agent 需要展示什么证据。")
      ], "HITL 状态图", "把批准设计成“登机口”，材料不齐就不能登机。"),
      day("Memory：记什么，忘什么", 75, "建立最小、有边界的记忆策略。", [
        task("看", "完成 Deep Agents 的 Summarization、Skills、Memory。", "v-langchain-deep"),
        task("做", "把信息分为任务状态、稳定偏好、领域知识、易过期事实。"),
        task("做", "为每类写入、读取、更新和删除规则。"),
        task("测", "检查是否保存了不必要的个人、客户或患者信息。")
      ], "Memory Policy v1", "玩“应该记住/应该忘掉”快速分类。"),
      day("Delegation 与 Sub-agents", 85, "把任务拆成真正独立的专业责任。", [
        task("看", "完成 Deep Agents Module 4：Delegation 与 Subagent Team。", "v-langchain-deep"),
        task("听", "选听 One Year of MCP 23:15–36:16：Skills、内部 MCP、Tasks。", "p-mcp-year"),
        task("做", "设计 Manager + Researcher + Reviewer，明确输入、输出与禁止事项。"),
        task("测", "检查是否有两个 Agent 在做同一件事。")
      ], "Sub-agent Responsibility Map", "组一支“三人盗梦队”，每个人只能有一项独门能力。"),
      day("A/B：单 Agent 对多 Agent", 90, "用证据判断架构，不凭直觉。", [
        task("做", "让单 Agent 与多 Agent 完成同一组 5 个研究任务。"),
        task("测", "比较完成率、引用、耗时、成本、失败恢复和人工介入。", null, "templates/eval-scorecard.md"),
        task("判", "选择胜者；如果多 Agent 没有明显收益，保留单 Agent。"),
        task("讲", "用一张表向未来的自己解释架构决定。")
      ], "架构 A/B 测试报告", "让架构打一场公平擂台赛。")
    ]
  },
  {
    number: 6,
    title: "Evals 与安全：从“能跑”到“可信”",
    subtitle: "追踪真实行为、建立测试集，并用红队攻击找出边界。",
    milestone: "20 条 Eval Set + Threat Model",
    days: [
      day("Trace Detective", 80, "用轨迹定位失败发生在哪一步。", [
        task("读", "阅读 OpenAI Evaluate agent workflows 的 Traces 与 Graders。", "r-agent-evals"),
        task("做", "选 3 次 Agent Run，标注模型调用、工具、Handoff、Guardrail 与结束。"),
        task("找", "为每次失败定位第一处偏离，而不是只看最终答案。"),
        task("改", "针对一个根因做最小修复并重跑。")
      ], "3 份标注 Trace", "像侦探一样找到“第一处犯罪现场”。"),
      day("建立黄金测试集", 85, "把“好”变成可重复测量的标准。", [
        task("做", "复制 Eval Starter，写 10 条正常、5 条边缘、5 条对抗案例。", null, "templates/eval-set.jsonl"),
        task("做", "为完成率、证据、格式、安全与成本定义评分。", null, "templates/eval-scorecard.md"),
        task("测", "给 v0.1 跑一次基线，保留失败样本。"),
        task("记", "写明哪些评分可自动化，哪些需要人判断。")
      ], "20 条 Eval Set + 基线", "把最尴尬的失败永久收藏进测试集。"),
      day("认识 Agent Hijacking", 75, "理解外部数据如何劫持工具使用。", [
        task("读", "精读 NIST Agent Hijacking 的攻击机制与 4 条评测启示。", "r-nist-hijacking"),
        task("画", "标出 Capstone 中可信指令与不可信网页/文件的混合位置。"),
        task("做", "设计 5 条无害模拟注入文本，不触碰真实系统。"),
        task("测", "同一攻击重复运行多次，观察概率性差异。")
      ], "Prompt Injection Attack Map", "今天扮演红队，但只在沙盒和模拟数据里。"),
      day("Threat Model 与 Guardrails", 85, "按权限、数据与影响设计分层防护。", [
        task("读", "阅读 OWASP Agentic AI Threats and Mitigations 概览与下载指南。", "r-owasp-agentic"),
        task("读", "选读 Anthropic Measuring Agent Autonomy 的结论。", "r-autonomy"),
        task("做", "列资产、威胁、攻击路径、影响、预防、检测和恢复。", null, "templates/threat-model.md"),
        task("做", "为所有高风险工具增加最小权限、预览和审批。")
      ], "Threat Model v1", "为 Agent 设计安全气囊，而不是只贴“小心驾驶”。"),
      day("红队 Boss Battle", 90, "验证 Guardrails 是否真的改变结果。", [
        task("测", "运行 20 条 Eval Set + 5 条注入攻击，记录通过率。"),
        task("改", "选择最高风险的两个失败，修复 Instructions、Tools 或权限。"),
        task("复测", "完整重跑，确认修复未伤害正常任务。"),
        task("讲", "写一段诚实的已知限制和人工接管说明。")
      ], "安全回归报告", "只有同时守住正常任务与攻击任务，才算击败 Boss。")
    ]
  },
  {
    number: 7,
    title: "Capstone：公开信息研究 Agent",
    subtitle: "把前六周能力组合成与你工作真正相关、同时保持合规边界的作品。",
    milestone: "Capstone v1.0",
    days: [
      day("选题与边界", 75, "确定一个有价值、低风险、可评测的真实任务。", [
        task("选", "从“公开医学信息研究、会前公开资料准备、行业动态周报”中选择一个。"),
        task("写", "定义用户、触发、输入、输出、KPI、非目标与停止条件。", null, "templates/agent-canvas.md"),
        task("界", "明确只用公开/授权资料，不输入患者信息、客户隐私或公司机密。"),
        task("测", "写出 5 条验收条件，必须可观察。")
      ], "Capstone Brief", "给项目写一句电影海报式简介。"),
      day("工作流与证据链", 85, "设计从问题到可追溯结论的完整路径。", [
        task("看", "选看 Andrew Ng Agentic AI 的 Planning、Tool Use 与 Multi-Agent 模块。", "v-andrew-agentic"),
        task("画", "画 Source discovery → Screening → Extraction → Synthesis → Review。"),
        task("做", "为每个结论规定 source URL、发布日期、摘录位置与置信度。"),
        task("测", "加入来源冲突和找不到证据两个分支。")
      ], "Evidence Workflow", "让每个结论都能沿着面包屑走回原文。"),
      day("Build Day", 100, "完成最小可用 Capstone。", [
        task("做", "建立 Instructions、只读 Tools、结构化输出和退出条件。"),
        task("做", "接入你的 Skill，并验证只在相关任务触发。"),
        task("做", "接入 Trace；若使用多 Agent，确保责任不重叠。"),
        task("测", "先跑 5 条代表性案例，不追求功能数量。")
      ], "Capstone v0.8", "今天只造“能交付价值的最小机器人”。"),
      day("Messy Reality Day", 90, "让 Agent 面对真实世界的脏数据。", [
        task("测", "输入缺日期、失效链接、冲突来源、营销材料和超长文件。"),
        task("测", "输入诱导越权、要求跳过来源和要求编造结论的请求。"),
        task("改", "只修复最高频或最高风险的三个失败。"),
        task("复测", "重跑正常案例，确认没有回归。")
      ], "Failure Log + 修复记录", "把“现实很乱”作为今天唯一的数据集。"),
      day("Capstone Demo v1.0", 90, "交付一个可演示、可解释、有限制说明的版本。", [
        task("测", "运行完整 20 条 Eval Set，并截图或保存结果。"),
        task("做", "整理 Demo 输入、关键 Trace、最终输出和限制。"),
        task("讲", "向一位同事或未来的自己做 5 分钟演示。"),
        task("记", "收集 3 条反馈，区分“必要修改”和“以后再说”。")
      ], "Capstone v1.0 + Demo", "今天是实验室开放日。")
    ]
  },
  {
    number: 8,
    title: "可靠交付与下一步",
    subtitle: "收紧质量、成本和使用说明，把一次项目变成可持续能力。",
    milestone: "作品集 + 30 天进阶计划",
    days: [
      day("质量回归", 80, "用统一测试证明版本变化。", [
        task("测", "对 v0.1 与 v1.0 运行同一 Eval Set。"),
        task("比", "比较完成率、引用、安全、延迟、成本与人工介入。", null, "templates/eval-scorecard.md"),
        task("查", "随机人工复核 5 条高分结果，防止评分器被取巧。"),
        task("记", "把仍未解决的失败保留在 Known limitations。")
      ], "前后版本对照报告", "让旧版本和新版本同场考试。"),
      day("成本、延迟与复杂度瘦身", 75, "删掉没有证据支持的复杂度。", [
        task("查", "统计每次 Run 的模型调用、工具调用、总时长和失败重试。"),
        task("减", "删掉一个无收益的 Agent、工具或重复步骤。"),
        task("换", "只在评测通过时，把简单步骤换成更快或更便宜的模型。"),
        task("测", "完整回归，确认瘦身没有降低验收指标。")
      ], "Cost & Complexity Note", "今天玩 Agent 极简主义：每删一项都要有数据支持。"),
      day("写给使用者的说明", 80, "让别人知道怎样正确、安全地使用作品。", [
        task("写", "完成 Quick Start：适用场景、输入、输出、示例。"),
        task("写", "完成 Safety：数据边界、审批、已知限制和人工接管。"),
        task("写", "完成 Maintenance：更新来源、扩充 Eval、查看 Trace。"),
        task("测", "请一位没参与项目的人照说明完成一次任务。")
      ], "Agent User Guide", "把自己从建造者切换成第一次使用的人。"),
      day("Teach-back：你已经会什么", 70, "通过讲解巩固并发现知识空洞。", [
        task("讲", "不看资料解释 Model、Instructions、Tools、Loop、MCP、Skill、Eval、Guardrail。"),
        task("录", "录制 5 分钟 Capstone 讲解：问题、设计、演示、证据、限制。"),
        task("复", "对照 20 张闪卡，补回讲不清的概念。", null, "flashcard.html"),
        task("写", "写下 3 个你现在能独立做、8 周前做不到的任务。")
      ], "5 分钟作品讲解", "把自己当作课程老师，而不是学生。"),
      day("毕业 Boss 与 30 天续航", 90, "完成复盘并保持可持续学习。", [
        task("测", "完成概念测验与最后一次 20 条 Eval。", null, "roots.html"),
        task("复", "写 Start / Stop / Continue：各 3 条。"),
        task("选", "从 LangChain、Hugging Face Agents、Andrew Ng 三条进阶路线中只选一条。", "v-hf-agents"),
        task("排", "为未来 30 天安排每周一次 Build、一次 Eval、一次 Teach-back。")
      ], "作品集 + 30 天进阶计划", "给自己的 Agent 学习旅程举行一个真正的毕业仪式。")
    ]
  }
]);

window.AIAgentLab.learningMethod = Object.freeze([
  { title: "短输入", text: "一次只看或听一个关键片段，避免把学习变成收藏。" },
  { title: "立即建造", text: "每次输入后 15 分钟内产生图、Tool Card、Skill、测试或可运行版本。" },
  { title: "检索练习", text: "不看资料讲 60–120 秒，再回去找漏掉的概念。" },
  { title: "交错练习", text: "视频、播客、阅读、编码、红队与讲解穿插，不连续刷同一种内容。" },
  { title: "失败收藏", text: "每次真实失败都进入 Eval Set，让作品和能力一起升级。" },
  { title: "真实项目", text: "八周围绕同一个 Capstone 累积，而不是做互不相关的玩具。" }
]);
