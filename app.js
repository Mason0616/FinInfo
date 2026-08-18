const sources = ['全部','华尔街见闻','东方财富','36氪','雪球','财联社','OpenCLI','AgentKey'];
const news = [
  { id:1, source:'华尔街见闻', time:'08:12', score:'92', title:'铜价突破 11,000 美元：库存新低与降息交易共振', summary:'LME 可用库存跌至多年低位，现货升水继续走阔。', tags:['有色金属','宏观'], topic:'铜', detail:'供给扰动和金融属性正在同一时间放大铜的价格弹性。交易层面，短期挤仓风险上升；研究层面，需要验证库存去化的持续性。' },
  { id:2, source:'东方财富', time:'07:54', score:'88', title:'多晶硅期货单日大涨，行业协会拟讨论自律减产', summary:'市场重新定价光伏产业链供给出清进程。', tags:['新能源','供给'], topic:'光伏', detail:'减产预期为拥挤的光伏链带来估值修复窗口，但真实的产能出清仍需以现金流和库存数据验证。' },
  { id:3, source:'36氪', time:'07:36', score:'78', title:'国产 GPU 厂商完成新一轮融资，AI 推理需求加速释放', summary:'云厂商采购扩容，推理算力成本成为新竞争焦点。', tags:['AI','半导体'], topic:'AI算力', detail:'推理需求从互联网大厂向行业客户扩散，国产替代与单位算力成本正在共同重塑竞争门槛。' },
  { id:4, source:'雪球', time:'07:18', score:'74', title:'白酒龙头渠道调研：中秋前动销出现区域分化', summary:'经销商库存回落缓慢，礼赠场景恢复仍待观察。', tags:['消费','渠道'], topic:'白酒', detail:'渠道并未同步改善。旺季的真实动销和价格体系是判断板块能否转向的关键。' },
  { id:5, source:'财联社', time:'06:45', score:'70', title:'美国大选辩论临近，市场关注关税政策对出口链影响', summary:'外需敏感板块波动率上升，汇率与关税预期交织。', tags:['宏观','出口'], topic:'出口链', detail:'政策的不确定性先影响估值，随后才会传导至订单。出口链需要按区域和产品重新拆解风险敞口。' },
  { id:6, source:'OpenCLI', time:'06:22', score:'66', title:'社区热议：固态电池量产时间线是否再度提前？', summary:'投资者聚焦头部电池厂中试线进展与材料验证。', tags:['社区信号','电池'], topic:'固态电池', detail:'社区讨论升温反映预期变化，但产业化节点必须回到良率、成本和客户验证三个可核查指标。' }
];
const research = [
 ['01','价格走势','期现同步走强，但期限结构尚未进入全面紧张状态；短线波动率抬升。','LME 铜价、SHFE 主力合约'],
 ['02','供需格局','矿端扰动压缩供应弹性，精炼铜短期平衡趋紧；中国需求处于温和修复区间。','ICSG 月度统计、海关总署'],
 ['03','厂商产能','海外铜矿项目投产普遍滞后，头部矿企 2026 年增量有限；冶炼端仍有扩张压力。','Freeport 年报、SMM'],
 ['04','需求驱动力','电网投资与新能源车仍是结构性增量，房地产相关需求保持低位。','国家能源局、乘联会'],
 ['05','周期复盘','当前库存与价格组合接近 2021 年上行初期，但宏观流动性尚弱于彼时。','LME 历史库存、FedWatch'],
 ['06','全球格局','智利、秘鲁供给扰动提高资源端溢价；中国冶炼产能决定短期现货流向。','USGS、CRU'],
 ['07','关键判断','基准情形下铜价中枢上移；若库存继续去化，关注资源品与高弹性加工股的分化机会。','NEON 研究判断 · 待跟踪库存'],
];
const copy = {
  xiaohongshu:'铜又涨了，发生了什么？\n\n别急着只看价格。简单说，这次是“仓库里的铜变少了”加上“市场预期利率会降”同时发生。\n\n对新手来说，可以先盯两件事：① LME 库存有没有继续降；② 国内现货升水有没有扩大。两者都强，才说明不只是情绪。\n\n我的判断：铜的中期逻辑还在，但短期涨得急，别追高。#有色金属 #投资笔记',
  douyin:'铜价破 11000 美元，不是单纯炒作。\n\n核心就三条：库存创新低、矿端供给持续扰动、降息预期抬升金融属性。\n\n接下来别盯标题，盯 LME 库存和中国现货升水。库存继续降，资源股有弹性；库存拐头，先看兑现。',
  wechat:'# 铜价突破 11,000 美元：库存约束下的价格重估\n\n## 结论先行\n铜价本轮上行由库存去化与宏观流动性预期共同驱动。供给端的低弹性为价格提供底部支撑，但短期交易已较拥挤。\n\n## 三个验证指标\n1. LME 可用库存是否延续下降；\n2. 中国进口窗口与现货升水是否保持强势；\n3. 铜精矿 TC 是否继续下行。\n\n## 投资判断\n基准情景下，铜价中枢上移趋势不变。配置上优先关注资源禀赋强、成本曲线靠前的标的；对高估值加工环节维持审慎。'
};
const outputTypes = [{icon:'⌘',name:'短视频脚本',note:'结构已就绪'},{icon:'<>',name:'公众号 HTML',note:'排版已就绪'},{icon:'↓',name:'PDF 研究报告',note:'12 页 · 待导出'},{icon:'◒',name:'封面图',note:'1080 × 1440'}];
let selectedId = 1, activeSource = '全部', activeStyle = 'xiaohongshu', descending = true;
const $ = (selector) => document.querySelector(selector);
function toast(message) { const element = $('#toast'); element.textContent = message; element.classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer = setTimeout(()=>element.classList.remove('show'),2200); }
function renderSources() { $('#sourceFilters').innerHTML = sources.map(s=>`<button class="source-chip ${s===activeSource?'active':''}" data-source="${s}">${s}</button>`).join(''); }
function filteredNews() { const term = $('#searchInput').value.trim().toLowerCase(); return news.filter(n => (activeSource==='全部'||n.source===activeSource) && (!term || `${n.title}${n.summary}${n.tags.join('')}`.toLowerCase().includes(term))).sort((a,b)=>descending?b.score-a.score:a.score-b.score); }
function renderNews() { const list = filteredNews(); $('#resultCount').textContent=`${String(list.length).padStart(2,'0')} 条信号`; $('#newsList').innerHTML=list.map(n=>`<button class="news-card ${n.id===selectedId?'active':''}" data-id="${n.id}"><div class="news-top"><span class="signal-source">${n.source}</span><span class="time">${n.time}</span><span class="score ${n.score<80?'mid':''}">优先 ${n.score}</span></div><h3>${n.title}</h3><p>${n.summary}</p><div class="news-tags">${n.tags.map((t,i)=>`<span class="tag ${i===0&&n.score>85?'hot':''}">${t}</span>`).join('')}</div></button>`).join('') || '<p style="padding:24px;color:#72776f">未找到匹配的情报。</p>'; }
function renderDetail() { const item=news.find(n=>n.id===selectedId); $('#detailContent').innerHTML=`<h2 class="detail-title">${item.title}</h2><p class="detail-summary">${item.detail}</p><div class="origin"><span class="importance">重要度 ${item.score}</span><span>原始来源 <b>${item.source}</b></span><span>·</span><span>${item.time}</span></div><div class="research-title"><h2>七维研究框架</h2><span>演示研究</span></div><div class="dimensions">${research.map((r,i)=>`<details class="dimension" ${i===0?'open':''}><summary><span class="dim-number">${r[0]}</span>${r[1]}<span class="dim-arrow">›</span></summary><p>${r[2]}</p><span class="citation">${r[3]}</span></details>`).join('')}</div>`; }
function renderOutputs() { $('#outputGrid').innerHTML=outputTypes.map(o=>`<button class="output-card" data-output="${o.name}" aria-label="预览${o.name}"><span class="output-icon">${o.icon}</span><span class="ready-dot"></span><b>${o.name}</b><small>${o.note}</small></button>`).join(''); }
function updateCopy() { $('#copyText').value=copy[activeStyle]; $('#copyCount').textContent=`${copy[activeStyle].replace(/\s/g,'').length} 字`; document.querySelectorAll('.style-tab').forEach(t=>t.classList.toggle('active',t.dataset.style===activeStyle)); }
function setupEvents() {
 $('#sourceFilters').addEventListener('click',e=>{const b=e.target.closest('[data-source]');if(!b)return;activeSource=b.dataset.source;renderSources();renderNews();});
 $('#searchInput').addEventListener('input',renderNews);
 $('#newsList').addEventListener('click',e=>{const c=e.target.closest('[data-id]');if(!c)return;selectedId=Number(c.dataset.id);renderNews();renderDetail();updateCopy();});
 $('#sortButton').addEventListener('click',()=>{descending=!descending;$('#sortButton').innerHTML=`优先级排序 <span>${descending?'↓':'↑'}</span>`;renderNews();});
 document.querySelector('.nav').addEventListener('click',e=>{const b=e.target.closest('.nav-item');if(!b)return;document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));b.classList.add('active');const names={intelligence:'晨间情报台',research:'研究工坊',content:'内容转译',archive:'报告档案'};$('#viewTitle').textContent=names[b.dataset.view];toast(`已切换至${names[b.dataset.view]}（MVP 演示）`);});
 $('#styleTabs').addEventListener('click',e=>{const b=e.target.closest('[data-style]');if(!b)return;activeStyle=b.dataset.style;updateCopy();});
 $('#copyText').addEventListener('input',e=>$('#copyCount').textContent=`${e.target.value.replace(/\s/g,'').length} 字`);
 $('#copyButton').addEventListener('click',async()=>{const text=$('#copyText').value;try { await navigator.clipboard.writeText(text);toast('文案已复制到剪贴板'); } catch { $('#copyText').select();document.execCommand('copy');toast('文案已复制到剪贴板'); }});
 $('#outputGrid').addEventListener('click',e=>{const b=e.target.closest('[data-output]');if(b)toast(`${b.dataset.output} 预览已准备（演示模式）`);});
 $('#generateButton').addEventListener('click',()=>toast('4 个输出已进入生成队列（演示模式）'));
 $('#refreshButton').addEventListener('click',()=>{const now=new Date();$('#syncTime').textContent=now.toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit',hour12:false});toast('晨间情报已刷新：8 个源连接正常');});
}
renderSources();renderNews();renderDetail();renderOutputs();updateCopy();setupEvents();
