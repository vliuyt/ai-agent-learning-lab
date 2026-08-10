window.AIAgentLab = window.AIAgentLab || {};

window.AIAgentLab.WordRoots = Object.freeze([
  {
    id: 1,
    root: "Agent 与 Workflow",
    origin: "基本判断",
    meaning: "Workflow 预先规定路径；Agent 在边界内根据现场信息决定下一步。",
    description: "判断一个问题是否需要 Agent，是整个课程的第一道门。固定、可预测、规则清楚的任务通常适合普通自动化；需要处理模糊信息、选择工具、面对例外并判断何时结束的任务，更适合 Agent。好的设计会把确定性步骤保留为 Workflow，只把真正需要判断的部分交给模型。",
    examples: [
      { word: "会议纪要排版", meaning: "固定模板流程", breakdown: { root: "Workflow" }, explanation: "输入与输出格式稳定，按规则执行更可靠。" },
      { word: "市场情报研究", meaning: "开放式调查", breakdown: { root: "Agent" }, explanation: "需要动态搜索、判断来源质量并决定是否继续追查。" },
      { word: "差旅审批", meaning: "混合流程", breakdown: { root: "Hybrid" }, explanation: "金额校验可固定，异常说明与风险判断可交给 Agent。" }
    ],
    quiz: { question: "以下哪项最适合优先尝试 Agent？", options: ["每月固定格式汇总", "数字按列求和", "复杂投诉分流与处理建议", "文件批量改名"], correctAnswer: 2 }
  },
  {
    id: 2,
    root: "Agent Loop",
    origin: "运行机制",
    meaning: "模型在“观察—思考—行动—再观察”的循环中前进，直到完成或停止。",
    description: "Agent 的核心并不神秘：它接收目标和当前状态，选择一个动作，读取动作结果，再决定下一步。可靠性来自明确的退出条件、最大步数、错误处理和人工接管点。理解这个循环后，任何框架的界面都只是对同一机制的不同包装。",
    examples: [
      { word: "网页研究", meaning: "搜索后再决定", breakdown: { root: "Observe–Act" }, explanation: "搜索结果会改变下一次查询。" },
      { word: "修复代码", meaning: "修改后运行测试", breakdown: { root: "Feedback loop" }, explanation: "测试结果为下一次修改提供观测。" },
      { word: "订票助手", meaning: "满足条件后停止", breakdown: { root: "Exit condition" }, explanation: "找到合规选项或需要付款时应停止并交还用户。" }
    ],
    quiz: { question: "Agent Loop 最需要显式定义的是什么？", options: ["退出与失败条件", "动画颜色", "品牌字体", "回答长度固定为 100 字"], correctAnswer: 0 }
  },
  {
    id: 3,
    root: "Model",
    origin: "三大基础",
    meaning: "负责理解、判断和生成下一步动作的推理引擎。",
    description: "模型选择要从任务难度、准确率、延迟、成本和工具使用能力一起考虑。学习时先用能力较强的模型建立质量基线，再用评测判断哪些步骤可以换成更快、更便宜的模型。不要在没有基线时过早优化，否则很难知道失败来自模型、提示词还是工具。",
    examples: [
      { word: "意图分类", meaning: "轻量判断", breakdown: { root: "Small model" }, explanation: "类别清晰时可用快速模型。" },
      { word: "复杂策略", meaning: "多约束推理", breakdown: { root: "Strong model" }, explanation: "多资料权衡更需要强推理能力。" },
      { word: "模型路由", meaning: "按难度分配", breakdown: { root: "Routing" }, explanation: "简单请求走快模型，疑难请求升级。" }
    ],
    quiz: { question: "建立 Agent 原型时更稳妥的模型策略是？", options: ["先用最便宜模型", "永远只用一个模型", "每一步随机选模型", "先建质量基线，再优化成本"], correctAnswer: 3 }
  },
  {
    id: 4,
    root: "Instructions",
    origin: "三大基础",
    meaning: "定义目标、边界、步骤、输出和异常处理的可执行说明。",
    description: "有效 Instructions 像给新同事的工作指引：说明目标、输入、输出、可用工具、判断标准、边界与升级条件。把模糊要求转成可观察动作，并用真实例子和反例解释质量标准。Instructions 应随着失败案例小步更新，而不是一次写成冗长的万能提示词。",
    examples: [
      { word: "输出契约", meaning: "明确格式", breakdown: { root: "Output" }, explanation: "规定字段、长度、引用和缺失数据写法。" },
      { word: "边界条件", meaning: "何时暂停", breakdown: { root: "Boundary" }, explanation: "遇到隐私、付款或不可逆操作必须请求确认。" },
      { word: "边缘案例", meaning: "处理异常", breakdown: { root: "Edge case" }, explanation: "资料冲突时保留分歧并说明证据。" }
    ],
    quiz: { question: "哪种说明最容易执行？", options: ["尽量做好", "输出一页摘要并为每个数字附来源", "像专家一样", "内容要高级"], correctAnswer: 1 }
  },
  {
    id: 5,
    root: "Tools",
    origin: "三大基础",
    meaning: "让 Agent 获取外部信息或产生真实行动的受控能力。",
    description: "Tools 把模型从只会说话变成能做事的系统。工具定义要有清晰名称、准确描述、严格参数和可解释返回值。读取类工具与写入类工具应分开看待；高风险、不可逆或影响他人的动作需要审批。工具数量不等于能力，重叠、含糊的工具反而会增加误选。",
    examples: [
      { word: "Web Search", meaning: "读取资料", breakdown: { root: "Data tool" }, explanation: "搜索公开信息并返回可引用来源。" },
      { word: "Send Email", meaning: "影响外部", breakdown: { root: "Action tool" }, explanation: "真正发送前通常需要人工确认。" },
      { word: "Calculator", meaning: "确定性计算", breakdown: { root: "Function tool" }, explanation: "把精确运算交给代码而非语言猜测。" }
    ],
    quiz: { question: "设计工具时最重要的优先项是？", options: ["数量越多越好", "所有工具都允许写入", "描述尽量短到一个词", "名称、参数和权限清晰"], correctAnswer: 3 }
  },
  {
    id: 6,
    root: "Context Engineering",
    origin: "上下文",
    meaning: "在正确时机给 Agent 恰好够用、可信且结构清晰的信息。",
    description: "Context Engineering 关注模型在每一步实际看到什么。上下文既不能缺关键事实，也不能被大量无关材料淹没。常见手段包括摘要、检索、分层加载、文件引用、会话压缩和明确标注可信来源。一个能力强的模型，如果拿到错误或混乱的上下文，仍会稳定地做错事。",
    examples: [
      { word: "项目说明", meaning: "稳定背景", breakdown: { root: "Static context" }, explanation: "通过 AGENTS.md 提供长期规则。" },
      { word: "相关文档", meaning: "按需检索", breakdown: { root: "Dynamic context" }, explanation: "只加载当前问题需要的材料。" },
      { word: "任务摘要", meaning: "压缩历史", breakdown: { root: "Compaction" }, explanation: "保留决定和未完成事项，减少无关对话。" }
    ],
    quiz: { question: "Context Engineering 的目标是？", options: ["提供恰当、可信、相关的上下文", "把所有资料一次塞入", "只保留最后一句", "让模型自己猜缺失信息"], correctAnswer: 0 }
  },
  {
    id: 7,
    root: "Structured Output",
    origin: "可靠输出",
    meaning: "用固定字段和类型约束结果，使下游步骤可以稳定读取。",
    description: "自然语言适合交流，结构化输出适合系统协作。通过 JSON Schema、类型模型或明确表格字段，可以减少字段缺失、格式漂移和解析错误。结构化输出仍需业务验证：格式正确不代表事实正确。好的 Agent 会分别验证结构、内容和来源。",
    examples: [
      { word: "客户分流", meaning: "固定类别", breakdown: { root: "Enum" }, explanation: "结果只能是预先定义的类别。" },
      { word: "研究卡片", meaning: "标准字段", breakdown: { root: "Schema" }, explanation: "标题、结论、证据、日期和置信度保持一致。" },
      { word: "工具参数", meaning: "类型校验", breakdown: { root: "Validation" }, explanation: "日期、金额和 ID 在调用前检查。" }
    ],
    quiz: { question: "结构化输出能直接保证什么？", options: ["所有事实真实", "绝无偏见", "格式与字段更稳定", "不需要评测"], correctAnswer: 2 }
  },
  {
    id: 8,
    root: "Planning",
    origin: "设计模式",
    meaning: "把复杂目标拆成可执行步骤，并在新信息出现时调整。",
    description: "Planning 适合步骤无法完全预先写死的复杂任务。计划应足够具体，能指导下一步工具选择，同时允许根据结果更新。更可靠的做法是让计划、执行和检查形成短循环，而不是生成一份很长的计划后盲目执行到底。",
    examples: [
      { word: "竞品研究", meaning: "动态子问题", breakdown: { root: "Adaptive plan" }, explanation: "发现新适应症后追加资料检索。" },
      { word: "代码修改", meaning: "先定位影响", breakdown: { root: "Task plan" }, explanation: "先读调用链，再修改和验证。" },
      { word: "旅行安排", meaning: "约束排序", breakdown: { root: "Constraint plan" }, explanation: "日期、预算和偏好共同决定步骤。" }
    ],
    quiz: { question: "更可靠的 Planning 方式是？", options: ["一次计划到底", "计划—执行—检查的短循环", "不做计划", "只列名词"], correctAnswer: 1 }
  },
  {
    id: 9,
    root: "Reflection",
    origin: "设计模式",
    meaning: "让系统依据标准检查产出、识别缺陷并再尝试一次。",
    description: "Reflection 能提升复杂产出的质量，但需要清晰评价标准，否则只是让模型重复表达。最有效的形式是先生成、再用独立检查表或评审角色指出具体问题，最后针对问题修改。应限制迭代次数，并用评测确认额外成本确实带来收益。",
    examples: [
      { word: "文章审校", meaning: "按标准找缺口", breakdown: { root: "Critique" }, explanation: "检查证据、逻辑、遗漏和表达。" },
      { word: "代码测试", meaning: "外部反馈", breakdown: { root: "Objective signal" }, explanation: "测试失败比自我感觉更可靠。" },
      { word: "销售话术", meaning: "角色复盘", breakdown: { root: "Role review" }, explanation: "分别从客户、医学和合规视角审阅。" }
    ],
    quiz: { question: "Reflection 什么时候最有价值？", options: ["有明确检查标准和修改动作时", "没有评价标准时", "无限循环时", "只要求重写时"], correctAnswer: 0 }
  },
  {
    id: 10,
    root: "Routing",
    origin: "设计模式",
    meaning: "先识别输入类型，再把任务交给最合适的流程、工具或模型。",
    description: "Routing 适合不同输入类别需要明显不同处理方式的场景。路由器要有互斥、可解释的类别，并为不确定情况设计兜底。路由本身也需要评测，因为分类错误会把后续工作全部带偏。",
    examples: [
      { word: "客服入口", meaning: "按问题类型分流", breakdown: { root: "Intent route" }, explanation: "订单、退款和技术问题进入不同流程。" },
      { word: "模型选择", meaning: "按难度分流", breakdown: { root: "Model route" }, explanation: "低风险简单任务使用快模型。" },
      { word: "证据分级", meaning: "按来源分流", breakdown: { root: "Source route" }, explanation: "指南、论文和媒体采用不同核验方法。" }
    ],
    quiz: { question: "Routing 的主要风险是？", options: ["页面不好看", "工具太少", "输出太结构化", "早期误分类放大后续错误"], correctAnswer: 3 }
  },
  {
    id: 11,
    root: "Parallelization",
    origin: "设计模式",
    meaning: "把独立子任务同时执行，或用多次独立判断提高信心。",
    description: "Parallelization 有两种常见方式：把可独立的部分分段并行，或让多个评审对同一问题独立投票。它能降低总耗时或提升覆盖面，但必须有清晰的汇总规则。彼此依赖的步骤强行并行，容易产生冲突和重复工作。",
    examples: [
      { word: "多市场扫描", meaning: "按国家分段", breakdown: { root: "Sectioning" }, explanation: "各市场资料可独立收集后统一汇总。" },
      { word: "安全审查", meaning: "多视角评审", breakdown: { root: "Voting" }, explanation: "不同提示分别检查注入、隐私和权限。" },
      { word: "资料下载", meaning: "并行 I/O", breakdown: { root: "Concurrency" }, explanation: "互不依赖的公开文件可同时获取。" }
    ],
    quiz: { question: "哪项适合并行？", options: ["必须先登录再下载", "先定义指标再计算", "四个独立国家的市场资料收集", "先获批再发送"], correctAnswer: 2 }
  },
  {
    id: 12,
    root: "Orchestrator–Workers",
    origin: "多 Agent",
    meaning: "一个协调者动态拆解任务，调用专业 Worker，并整合结果。",
    description: "当子任务无法提前完全预测，且需要不同专业能力时，Orchestrator–Workers 很有用。协调者负责目标、拆分、分配、检查和汇总，Worker 负责边界清晰的子任务。多 Agent 会增加沟通成本和失败面，因此应先证明单 Agent 已经不够用。",
    examples: [
      { word: "深度研究", meaning: "动态问题树", breakdown: { root: "Orchestrator" }, explanation: "协调者根据新证据追加子问题。" },
      { word: "大型代码修改", meaning: "按模块委派", breakdown: { root: "Worker" }, explanation: "不同 Worker 处理独立文件并统一验证。" },
      { word: "策略报告", meaning: "研究、分析、审校", breakdown: { root: "Synthesis" }, explanation: "协调者解决分歧并形成最终叙事。" }
    ],
    quiz: { question: "引入多 Agent 前应先确认什么？", options: ["名字足够酷", "单 Agent 的能力或工具选择已成为瓶颈", "每个任务都能并行", "可以取消评测"], correctAnswer: 1 }
  },
  {
    id: 13,
    root: "Handoff",
    origin: "多 Agent",
    meaning: "把控制权和必要上下文转交给另一个专业 Agent。",
    description: "Handoff 与“把 Agent 当工具调用”不同：Handoff 后专业 Agent 接管当前任务或对话。设计时要说明何时转交、传哪些上下文、谁负责最终输出以及如何返回。上下文过多会污染专业 Agent，过少又会让它重复询问。",
    examples: [
      { word: "医学问题升级", meaning: "转专业角色", breakdown: { root: "Specialist" }, explanation: "销售助手将医学细节交给医学信息 Agent。" },
      { word: "人工接管", meaning: "转给人", breakdown: { root: "Escalation" }, explanation: "高风险或连续失败时停止自动化。" },
      { word: "语言服务", meaning: "按语言转交", breakdown: { root: "Language handoff" }, explanation: "分流 Agent 把请求交给对应语言专家。" }
    ],
    quiz: { question: "Handoff 最关键的设计问题是？", options: ["Agent 头像", "使用更多颜色", "转交条件、上下文和最终责任", "每次都转交"], correctAnswer: 2 }
  },
  {
    id: 14,
    root: "Memory",
    origin: "上下文",
    meaning: "让 Agent 跨步骤或跨会话保留有用状态，而不重复携带全部历史。",
    description: "Memory 可以是当前任务状态、会话摘要、用户偏好或长期知识。记忆必须有写入规则、读取条件、更新方式和删除机制。未经筛选地保存所有对话会积累错误、过期信息和隐私风险。好的 Memory 记录决定和稳定偏好，并对时效性事实主动重新验证。",
    examples: [
      { word: "任务状态", meaning: "短期记忆", breakdown: { root: "Working memory" }, explanation: "保存已完成步骤和下一步。" },
      { word: "表达偏好", meaning: "长期偏好", breakdown: { root: "Preference" }, explanation: "记录用户偏好中文和简洁表达。" },
      { word: "旧价格", meaning: "易过期事实", breakdown: { root: "Stale memory" }, explanation: "使用前应联网刷新，不能当作当前事实。" }
    ],
    quiz: { question: "哪种内容最适合长期记忆？", options: ["稳定的表达偏好", "一次性的验证码", "未经验证的传闻", "所有原始日志"], correctAnswer: 0 }
  },
  {
    id: 15,
    root: "RAG",
    origin: "上下文",
    meaning: "从外部知识库检索相关内容，再让模型基于证据回答。",
    description: "RAG 解决知识不在模型当前上下文中的问题。可靠 RAG 需要好的切分、检索、重排、引用和缺失证据处理。Agentic RAG 允许模型自己改写查询、追问和多轮检索，但也增加成本与漂移风险。评测应同时检查检索是否找到正确证据，以及回答是否忠实使用证据。",
    examples: [
      { word: "产品资料问答", meaning: "内部知识检索", breakdown: { root: "Retrieval" }, explanation: "从获批资料中检索相关段落并引用。" },
      { word: "论文研究", meaning: "多轮查询", breakdown: { root: "Agentic RAG" }, explanation: "根据首轮发现调整关键词和纳入标准。" },
      { word: "无证据回答", meaning: "明确缺口", breakdown: { root: "Abstention" }, explanation: "找不到支持时应说明资料不足。" }
    ],
    quiz: { question: "评测 RAG 需要同时关注什么？", options: ["字体和颜色", "只看模型名称", "只看回答长度", "检索质量与回答忠实度"], correctAnswer: 3 }
  },
  {
    id: 16,
    root: "MCP",
    origin: "工具连接",
    meaning: "让 AI 应用用统一协议发现并调用工具、资源与提示的连接方式。",
    description: "Model Context Protocol 采用 Host、Client、Server 架构。Host 管理权限和生命周期，Client 与一个 Server 保持连接，Server 提供工具、资源或提示。MCP 解决连接与上下文交换问题，并不替 Agent 决定如何规划。学习时要把协议、传输、授权和业务工具边界分开理解。",
    examples: [
      { word: "本地文件", meaning: "stdio Server", breakdown: { root: "Local MCP" }, explanation: "Host 启动本地进程并通过标准输入输出通信。" },
      { word: "企业服务", meaning: "远程 Server", breakdown: { root: "Remote MCP" }, explanation: "通过 HTTP 与认证连接多人共享服务。" },
      { word: "工具发现", meaning: "能力协商", breakdown: { root: "Discovery" }, explanation: "Client 查询 Server 当前提供哪些能力。" }
    ],
    quiz: { question: "MCP 主要解决什么？", options: ["替模型完成所有规划", "统一连接工具与上下文", "训练基础模型", "替代所有权限控制"], correctAnswer: 1 }
  },
  {
    id: 17,
    root: "Agent Skills",
    origin: "可复用能力",
    meaning: "用 SKILL.md 和配套资源把专业流程打包成可发现、可复用的知识。",
    description: "Agent Skill 像给 Agent 的专业上岗手册。最小结构是一份带元数据的 SKILL.md，也可包含 scripts、references 和 assets。描述决定何时被发现，正文定义如何执行，外部资源按需加载。好 Skill 聚焦一个任务、边界清楚、可验证，并避免把密钥或过期事实写入。",
    examples: [
      { word: "PPT 审核", meaning: "专门流程", breakdown: { root: "Skill" }, explanation: "打包版式检查、修复规则和验证脚本。" },
      { word: "医学文献检索", meaning: "领域知识", breakdown: { root: "References" }, explanation: "包含数据库检索规范与证据分级。" },
      { word: "数据清理", meaning: "可执行帮助", breakdown: { root: "Scripts" }, explanation: "Skill 调用经过验证的脚本执行重复步骤。" }
    ],
    quiz: { question: "Agent Skill 至少需要什么？", options: ["SKILL.md", "数据库", "网页界面", "付费 API"], correctAnswer: 0 }
  },
  {
    id: 18,
    root: "Progressive Disclosure",
    origin: "上下文",
    meaning: "先暴露少量索引信息，只有真正需要时才加载完整说明和资料。",
    description: "Progressive Disclosure 让 Agent 同时拥有很多 Skills，而不会把全部内容塞进上下文。启动时只读取名称和描述；任务匹配后加载完整 SKILL.md；执行中再按需读取 references、scripts 或 assets。设计的关键是让描述可准确触发，并把细节拆到真正需要时才加载的位置。",
    examples: [
      { word: "Skill 列表", meaning: "发现阶段", breakdown: { root: "Discovery" }, explanation: "只读取名称和用途描述。" },
      { word: "完整指引", meaning: "激活阶段", breakdown: { root: "Activation" }, explanation: "任务匹配后读取 SKILL.md 全文。" },
      { word: "参考手册", meaning: "执行阶段", breakdown: { root: "On demand" }, explanation: "只读取当前分支需要的文档。" }
    ],
    quiz: { question: "Progressive Disclosure 的直接好处是？", options: ["让所有文件常驻上下文", "禁止调用脚本", "省略说明", "减少无关上下文并保留可发现性"], correctAnswer: 3 }
  },
  {
    id: 19,
    root: "Evals & Tracing",
    origin: "质量系统",
    meaning: "用运行轨迹、测试集和评分规则持续测量 Agent 的真实行为。",
    description: "Tracing 记录模型调用、工具调用、Handoff、Guardrail 和错误，适合定位单次失败。Evals 把代表性输入、期望结果和评分标准组成可重复测试，用于比较版本并防止回归。先从少量真实失败案例开始，再逐步扩充到正常、边缘和对抗样本。",
    examples: [
      { word: "工具误选", meaning: "查看轨迹", breakdown: { root: "Trace" }, explanation: "确认 Agent 当时看到哪些工具和返回值。" },
      { word: "提示词升级", meaning: "回归测试", breakdown: { root: "Eval set" }, explanation: "同一批案例对比新旧版本。" },
      { word: "质量评分", meaning: "多维标准", breakdown: { root: "Grader" }, explanation: "分别评事实、引用、格式和安全。" }
    ],
    quiz: { question: "调试一次具体失败时应先看什么？", options: ["宣传页", "只换更大模型", "完整 Trace", "删除测试"], correctAnswer: 2 }
  },
  {
    id: 20,
    root: "Guardrails & HITL",
    origin: "安全与治理",
    meaning: "通过权限、校验、审批和人工接管，把 Agent 的自主性限制在可接受范围。",
    description: "Guardrails 是分层防护，不是一句“请安全行事”。它包括输入检查、工具权限、参数验证、输出校验、速率和成本限制、敏感动作审批及审计日志。Human-in-the-loop 应放在高风险、不可逆、信息不足或连续失败的节点。外部网页、邮件和文件都可能包含间接提示注入，应按不可信数据处理。",
    examples: [
      { word: "发送邮件", meaning: "提交前审批", breakdown: { root: "HITL" }, explanation: "Agent 可起草，用户确认后才发送。" },
      { word: "网页指令", meaning: "不可信内容", breakdown: { root: "Prompt injection" }, explanation: "网页中的命令不能覆盖用户目标和系统规则。" },
      { word: "删除文件", meaning: "高风险工具", breakdown: { root: "Permission" }, explanation: "限制范围、预览目标并要求明确批准。" }
    ],
    quiz: { question: "哪种动作最需要 Human-in-the-loop？", options: ["读取公开网页", "向外部联系人发送最终邮件", "计算平均数", "整理本地草稿"], correctAnswer: 1 }
  }
]);
