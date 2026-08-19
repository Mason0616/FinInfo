import type { ResearchDimension, Signal } from '@/lib/domain';

export const sources = ['全部', '华尔街见闻', '东方财富', '36氪', '雪球', '财联社', 'OpenCLI', 'AgentKey'];
export const domains = ['全部领域', '有色金属', '新能源', '半导体与 AI', '消费', '出口链'];

export const demoSignals: Signal[] = [
  { id: 'signal-1', source: '华尔街见闻', sourceUrl: 'https://wallstreetcn.com/', publishedAt: '2026-08-18T08:12:00+08:00', priority: 92, title: '铜价突破 11,000 美元：库存新低与降息交易共振', summary: 'LME 可用库存跌至多年低位，现货升水继续走阔。', tags: ['有色金属', '宏观'], topic: '铜', brief: '供给扰动和金融属性正在同一时间放大铜的价格弹性。交易层面，短期挤仓风险上升；研究层面，需要验证库存去化的持续性。' },
  { id: 'signal-2', source: '东方财富', sourceUrl: 'https://quote.eastmoney.com/', publishedAt: '2026-08-18T07:54:00+08:00', priority: 88, title: '多晶硅期货单日大涨，行业协会拟讨论自律减产', summary: '市场重新定价光伏产业链供给出清进程。', tags: ['新能源', '供给'], topic: '光伏', brief: '减产预期为拥挤的光伏链带来估值修复窗口，但真实的产能出清仍需以现金流和库存数据验证。' },
  { id: 'signal-3', source: '36氪', sourceUrl: 'https://36kr.com/', publishedAt: '2026-08-18T07:36:00+08:00', priority: 78, title: '国产 GPU 厂商完成新一轮融资，AI 推理需求加速释放', summary: '云厂商采购扩容，推理算力成本成为新竞争焦点。', tags: ['AI', '半导体'], topic: 'AI算力', brief: '推理需求从互联网大厂向行业客户扩散，国产替代与单位算力成本正在共同重塑竞争门槛。' },
  { id: 'signal-4', source: '雪球', sourceUrl: 'https://xueqiu.com/', publishedAt: '2026-08-18T07:18:00+08:00', priority: 74, title: '白酒龙头渠道调研：中秋前动销出现区域分化', summary: '经销商库存回落缓慢，礼赠场景恢复仍待观察。', tags: ['消费', '渠道'], topic: '白酒', brief: '渠道并未同步改善。旺季的真实动销和价格体系是判断板块能否转向的关键。' },
  { id: 'signal-5', source: '财联社', sourceUrl: 'https://www.cls.cn/', publishedAt: '2026-08-18T06:45:00+08:00', priority: 70, title: '美国大选辩论临近，市场关注关税政策对出口链影响', summary: '外需敏感板块波动率上升，汇率与关税预期交织。', tags: ['宏观', '出口'], topic: '出口链', brief: '政策的不确定性先影响估值，随后才会传导至订单。出口链需要按区域和产品重新拆解风险敞口。' },
  { id: 'signal-6', source: 'OpenCLI', sourceUrl: 'https://opencli.com/', publishedAt: '2026-08-18T06:22:00+08:00', priority: 66, title: '社区热议：固态电池量产时间线是否再度提前？', summary: '投资者聚焦头部电池厂中试线进展与材料验证。', tags: ['社区信号', '电池'], topic: '固态电池', brief: '社区讨论升温反映预期变化，但产业化节点必须回到良率、成本和客户验证三个可核查指标。' },
];

export const researchDimensions: ResearchDimension[] = [
  { number: '01', title: '价格走势', content: '期现同步走强，但期限结构尚未进入全面紧张状态；短线波动率抬升。', citation: 'LME 铜价、SHFE 主力合约' },
  { number: '02', title: '供需格局', content: '矿端扰动压缩供应弹性，精炼铜短期平衡趋紧；中国需求处于温和修复区间。', citation: 'ICSG 月度统计、海关总署' },
  { number: '03', title: '厂商产能', content: '海外铜矿项目投产普遍滞后，头部矿企 2026 年增量有限；冶炼端仍有扩张压力。', citation: 'Freeport 年报、SMM' },
  { number: '04', title: '需求驱动力', content: '电网投资与新能源车仍是结构性增量，房地产相关需求保持低位。', citation: '国家能源局、乘联会' },
  { number: '05', title: '周期复盘', content: '当前库存与价格组合接近 2021 年上行初期，但宏观流动性尚弱于彼时。', citation: 'LME 历史库存、FedWatch' },
  { number: '06', title: '全球格局', content: '智利、秘鲁供给扰动提高资源端溢价；中国冶炼产能决定短期现货流向。', citation: 'USGS、CRU' },
  { number: '07', title: '关键判断', content: '基准情形下铜价中枢上移；若库存继续去化，关注资源品与高弹性加工股的分化机会。', citation: 'NEON 研究判断 · 待跟踪库存' },
];

export const channelCopy = {
  xiaohongshu: '铜又涨了，发生了什么？\n\n别急着只看价格。简单说，这次是“仓库里的铜变少了”加上“市场预期利率会降”同时发生。\n\n对新手来说，可以先盯两件事：① LME 库存有没有继续降；② 国内现货升水有没有扩大。两者都强，才说明不只是情绪。\n\n我的判断：铜的中期逻辑还在，但短期涨得急，别追高。#有色金属 #投资笔记',
  douyin: '铜价破 11000 美元，不是单纯炒作。\n\n核心就三条：库存创新低、矿端供给持续扰动、降息预期抬升金融属性。\n\n接下来别盯标题，盯 LME 库存和中国现货升水。库存继续降，资源股有弹性；库存拐头，先看兑现。',
  wechat: '# 铜价突破 11,000 美元：库存约束下的价格重估\n\n## 结论先行\n铜价本轮上行由库存去化与宏观流动性预期共同驱动。供给端的低弹性为价格提供底部支撑，但短期交易已较拥挤。\n\n## 三个验证指标\n1. LME 可用库存是否延续下降；\n2. 中国进口窗口与现货升水是否保持强势；\n3. 铜精矿 TC 是否继续下行。\n\n## 投资判断\n基准情景下，铜价中枢上移趋势不变。配置上优先关注资源禀赋强、成本曲线靠前的标的；对高估值加工环节维持审慎。',
} as const;
