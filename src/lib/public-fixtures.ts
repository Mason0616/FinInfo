import type { PublicReport } from '@/lib/domain';

export const publicReports: PublicReport[] = [
  { slug: 'copper-inventory', title: '铜价与库存：价格重估背后的供给约束', topic: '大宗商品', updatedAt: '2026-08-18T08:30:00+08:00', readingMinutes: 6, conclusion: '库存去化与流动性预期共同推高铜价，但短期交易拥挤度上升，需要持续核验现货与库存数据。', tags: ['铜', '库存', '宏观'], sourceCount: 4, whatHappened: '铜价突破 11,000 美元附近，市场同时关注 LME 可用库存收缩和降息预期升温。', whyItMatters: '铜既受实体供需影响，也受宏观流动性影响。两个因素同向变化时，价格波动可能被放大。', evidence: [{ label: 'LME', url: 'https://www.lme.com/', note: '核验可用库存、现货升水与期货结构。' }, { label: '国际铜业研究组织 ICSG', url: 'https://icsg.org/', note: '核验全球供需平衡和产量统计。' }, { label: '中国海关总署', url: 'http://www.customs.gov.cn/', note: '核验进口与贸易流向数据。' }, { label: '美联储', url: 'https://www.federalreserve.gov/', note: '核验货币政策与市场流动性背景。' }], uncertainty: ['库存下降可能包含地区间转移，不能单独等同于全球供给短缺。', '降息预期变化快，金融资金流入不必然代表实体需求同步改善。'], watchQuestions: ['LME 可用库存是否继续下降？', '中国现货升水是否保持强势？', '铜精矿加工费是否继续走低？'], fullAnalysis: [{ heading: '价格走势', body: '期现同步走强，但期限结构尚未进入全面紧张状态；短线波动率已经抬升。' }, { heading: '供需格局', body: '矿端扰动压缩供应弹性，精炼铜短期平衡趋紧；中国需求仍在温和修复区间。' }, { heading: '周期复盘', body: '当前库存与价格组合接近 2021 年上行初期，但宏观流动性尚弱于彼时。' }] },
  { slug: 'gpu-inference', title: '国产 GPU 推理需求：融资热度之外的验证框架', topic: '科技与 AI', updatedAt: '2026-08-18T07:50:00+08:00', readingMinutes: 5, conclusion: '推理需求正在从大厂向行业客户扩散，但采购节奏、软件生态与单位算力成本仍决定真实落地速度。', tags: ['AI', 'GPU', '推理'], sourceCount: 3, whatHappened: '国产 GPU 厂商完成新一轮融资，市场将注意力转向推理算力需求与云厂商采购。', whyItMatters: '推理环节决定模型能力如何进入实际产品，也会影响计算成本和产业链竞争门槛。', evidence: [{ label: '中国信通院', url: 'https://www.caict.ac.cn/', note: '核验算力、人工智能与产业发展公开研究。' }, { label: '国家互联网信息办公室', url: 'https://www.cac.gov.cn/', note: '核验生成式人工智能相关政策与治理要求。' }, { label: '工信部', url: 'https://www.miit.gov.cn/', note: '核验半导体与数字产业公开信息。' }], uncertainty: ['融资金额不等于订单或商业化收入。', '不同推理任务对芯片、软件栈和能耗的要求差异很大。'], watchQuestions: ['云厂商采购是否持续扩大？', '单位推理成本是否下降？', '行业客户的部署案例能否复用？'], fullAnalysis: [{ heading: '需求驱动', body: '推理需求从互联网大厂向行业客户扩散，成本、时延和数据合规成为共同约束。' }, { heading: '竞争门槛', body: '硬件性能只是起点，编译器、框架适配和开发者工具决定迁移成本。' }, { heading: '验证路径', body: '应同时观察客户验证、实际调用量和持续性收入，而非只看融资新闻。' }] },
  { slug: 'solid-state-battery-demo', title: '固态电池量产：从中试线到车型搭载的验证清单（演示样例）', topic: '新能源', updatedAt: '2026-08-18T07:10:00+08:00', readingMinutes: 4, conclusion: '这是用于展示报告网格的静态演示样例。量产判断应回到良率、成本和主机厂验证进度。', tags: ['演示样例', '电池', '量产'], sourceCount: 2, whatHappened: '行业讨论集中在固态电池中试线进度与潜在装车时间表。', whyItMatters: '实验室性能不能直接代表可规模化制造，材料体系、工艺良率与供应链成熟度缺一不可。', evidence: [{ label: '工信部', url: 'https://www.miit.gov.cn/', note: '核验产业政策与公开技术信息。' }, { label: '中国汽车动力电池产业创新联盟', url: 'https://www.cabia.org.cn/', note: '核验动力电池产业公开统计。' }], uncertainty: ['本报告为静态演示样例，不对应真实跟踪结论。', '具体量产节点需以企业公告和车型交付验证。'], watchQuestions: ['中试线良率是否持续提升？', '单位成本能否进入可接受区间？', '是否出现量产车型交付？'], fullAnalysis: [{ heading: '制造验证', body: '量产可行性取决于连续制造中的一致性，而不是单次实验性能。' }, { heading: '需求验证', body: '主机厂是否在可交付车型中采用，是比发布会更强的验证。' }] },
  { slug: 'cross-border-commerce-demo', title: '跨境电商履约成本：平台规则变化下的经营弹性（演示样例）', topic: '消费与出海', updatedAt: '2026-08-18T06:40:00+08:00', readingMinutes: 4, conclusion: '这是用于展示报告网格的静态演示样例。应分别核验平台费率、履约时效与区域订单结构。', tags: ['演示样例', '出海', '电商'], sourceCount: 2, whatHappened: '市场关注主要跨境平台的规则调整及卖家履约成本变化。', whyItMatters: '规则变化会先影响单位经济模型，再传导至商品结构、价格策略与投放效率。', evidence: [{ label: '商务部', url: 'http://www.mofcom.gov.cn/', note: '核验跨境电商公开政策与统计。' }, { label: '海关总署', url: 'http://www.customs.gov.cn/', note: '核验跨境贸易公开数据。' }], uncertainty: ['本报告为静态演示样例，不对应真实平台政策。', '不同市场的税务、物流和退货结构差异很大。'], watchQuestions: ['平台费率是否变化？', '履约时效是否稳定？', '高毛利品类能否覆盖获客成本？'], fullAnalysis: [{ heading: '单位经济模型', body: '应把平台费用、物流、退货和投放成本放进同一笔订单核算。' }, { heading: '区域差异', body: '不同国家的物流和合规成本差异，会改变商品选择和价格带。' }] },
];

export function getPublicReport(slug: string): PublicReport | undefined {
  return publicReports.find((report) => report.slug === slug);
}

export type TranslationChannel = 'short-post' | 'video-script' | 'article';
export type TranslationDrafts = Record<string, Record<TranslationChannel, string>>;

export const translationDrafts: TranslationDrafts = {
  'copper-inventory': {
    'short-post': '铜价上涨，不只是一句“需求变好了”。\n\n这轮行情同时受到库存去化和流动性预期影响。想继续跟踪，可以看 LME 可用库存、中国现货升水和铜精矿加工费。\n\n资料基于公开报告整理，不是投资建议。',
    'video-script': '铜价为什么又被讨论？\n\n先别急着看价格。关键有三件事：第一，库存是否继续下降；第二，现货升水是否变强；第三，宏观流动性预期有没有变化。\n\n这三项一起走强，价格弹性才可能被放大。完整证据和不确定性，请回到来源报告核验。',
    article: '# 铜价与库存：价格重估背后的供给约束\n\n## 结论\n库存去化与流动性预期共同推高价格，但短期交易拥挤度上升。\n\n## 核验重点\n1. LME 可用库存；\n2. 中国现货升水；\n3. 铜精矿加工费。\n\n本文为基于公开研究的传播草稿，请回到来源报告查看证据与不确定性。',
  },
  'gpu-inference': {
    'short-post': '国产 GPU 融资热度上升，不等于商业化已经兑现。\n\n更值得关注的是：真实采购是否扩大、单位推理成本是否下降、行业客户是否愿意持续部署。\n\n资料基于公开报告整理，请自行核验。',
    'video-script': '国产 GPU 推理需求，到底看什么？\n\n融资只是一个信号。真正需要验证的是云厂商采购、单位推理成本，以及行业客户的复用案例。\n\n性能之外，软件生态和迁移成本同样决定落地速度。完整来源见公开报告。',
    article: '# 国产 GPU 推理需求：融资热度之外的验证框架\n\n## 结论\n推理需求在扩散，但采购节奏、软件生态与单位算力成本仍决定真实落地速度。\n\n## 三个跟踪问题\n1. 云厂商采购是否持续扩大？\n2. 单位推理成本是否下降？\n3. 部署案例能否复用？\n\n本文为基于公开研究的传播草稿，请自行核验。',
  },
};
