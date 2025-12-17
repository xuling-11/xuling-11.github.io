const container = document.getElementById("blog-container");
const langFilter = document.getElementById("lang-filter");
const catFilter = document.getElementById("cat-filter");

const data = [
  {
    title: "读书笔记: 简明复分析",
    file: "Blog_file/2505-《简明复分析》读书笔记.pdf",
    pages: 18,
    date: "2025-05-28",
    language: "中文",
    category: "Mathematics"
  },
  {
    title: "实分析与复分析笔记",
    file: "Blog_file/2506-实复分析笔记.pdf",
    pages: 12,
    date: "2025-06-16",
    language: "中文",
    category: "Mathematics"
  },
  {
    title: "Notes on Fornaess's Lecture Notes",
    file: "assets/blog_file/2503-Fornaess讲义笔记.pdf",
    pages: 13,
    date: "2025-03-18",
    language: "English",
    category: "Mathematics"
  },
  {
    title: "Summer School of Dynamical Systems",
    file: "assets/blog_file/2507-Summer School of Dynamical Systems.pdf",
    pages: 31,
    date: "2025-07-13",
    language: "English",
    category: "Mathematics"
  },
  {
    title: "Case Competition",
    file: "assets/blog_file/2303-Nexus Case Comp Deck.pdf",
    pages: 11,
    date: "2023-03-18",
    language: "English",
    category: "Finance"
  },
  {
    title: "Coursework: Stochastic Progress",
    file: "assets/blog_file/2206-Stochastic Process Final Project.pdf",
    pages: 11,
    date: "2022-06-21",
    language: "English",
    category: "Finance"
  },    
  {
    title: "课程论文: 对冲基金投资策略",
    file: "assets/blog_file/2212-对冲基金投资策略及风险模型.pdf",
    pages: 8,
    date: "2022-12-29",
    language: "中文",
    category: "Finance"
  },    
  {
    title: "课程论文: 公共物品实验",
    file: "assets/blog_file/2212-公共物品实验中的合作行为与促进机制.pdf",
    pages: 6,
    date: "2022-12-25",
    language: "中文",
    category: "Finance"
  },    
  {
    title: "课程论文: Ising模型",
    file: "assets/blog_file/2212-伊辛模型及其在物理与经济学中的应用.pdf",
    pages: 9,
    date: "2022-12-19",
    language: "中文",
    category: "Mathematics"
  },  
  {
    title: "数模国赛论文: 无人机定位",
    file: "assets/blog_file/2209-基于模糊匹配的无人机纯方位无源定位模型.pdf",
    pages: 17,
    date: "2022-09-18",
    language: "中文",
    category: "Modeling"
  },  
  {
    title: "天池学习赛: 贷款违规预测",
    file: "assets/blog_file/2208-天池学习赛贷款违约预测.pdf",
    pages: 1,
    date: "2022-08-24",
    language: "中文",
    category: "Coding"
  },  
  {
    title: "读书笔记: 资本市场的混沌与秩序",
    file: "assets/blog_file/2207-《资本市场的混沌与秩序》读书笔记.pdf",
    pages: 1,
    date: "2022-07-27",
    language: "中文",
    category: "Finance"
  },
  {
    title: "读书笔记: 数学模型",
    file: "assets/blog_file/2206-《数学模型》读书笔记.pdf",
    pages: 26,
    date: "2022-06-17",
    language: "中文",
    category: "Modeling"
  },
  {
    title: "数模校赛论文: 污染物模型",
    file: "assets/blog_file/2204-基于微分方程模型的不同城市室内污染物解决方案.pdf",
    pages: 13,
    date: "2022-04-15",
    language: "中文",
    category: "Modeling"
  },
  {
    title: "数模国赛论文: 反射面形状调节",
    file: "assets/blog_file/2109-FAST 主动反射面形状调节的机理建模与拟合设计.pdf",
    pages: 24,
    date: "2021-09-12",
    language: "中文",
    category: "Modeling"
  }
];

// 收集语言和分类
const langs = [...new Set(data.map(d => d.language))];
const cats = [...new Set(data.map(d => d.category))];

// 生成筛选按钮
langFilter.innerHTML =
  `<div class="filter-group">
    <span class="filter-label">Language:</span>` +
    langs.map(l => `<button class="lang-btn">${l}</button>`).join(" ") +
    `<\div>`;
catFilter.innerHTML =
  `<div class="filter-group">
    <span class="filter-label">Topic:</span>` +
    cats.map(c => `<button class="cat-btn">${c}</button>`).join(" ") +
    `<\div>`;

// 当前筛选状态
let selectedLang = null;
let selectedCat = null;

// 日期格式重整
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}`;
}

// 渲染函数
function renderList() {
  container.innerHTML = "";

  // 按筛选条件和时间排序
  const filtered = data
    .filter(item => !selectedLang || item.language === selectedLang)
    .filter(item => !selectedCat || item.category === selectedCat)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  let currentYear = null;

  filtered.forEach(item => {
    const year = new Date(item.date).getFullYear();

    // 若年份改变，插入一个分隔块
    if (year !== currentYear) {
      currentYear = year;
      const divider = document.createElement("div");
      divider.classList.add("year-divider");
      divider.textContent = year;
      container.appendChild(divider);
    }

    const el = document.createElement("div");
    el.classList.add("blog-entry");
    el.innerHTML = `
      <a href="${item.file}" target="_blank" class="blog-title">${item.title}</a>
      <span class="meta">${item.pages} pp. ${formatDate(item.date)}</span>
      <span class="tags">#${item.language} #${item.category}</span>
    `;
    container.appendChild(el);
  });

  // 若无结果
  if (filtered.length === 0) {
    container.innerHTML = "<p>No matching posts found.</p>";
  }
}

renderList();

// 筛选按钮事件绑定
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    // 清除所有按钮的选中状态
    document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));

    // 判断是否取消选择或选中新的按钮
    if (selectedLang === btn.textContent) {
      selectedLang = null; // 再次点击取消选中
    } else {
      selectedLang = btn.textContent;
      btn.classList.add("active");
    }

    renderList();
  });
});

document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));

    if (selectedCat === btn.textContent) {
      selectedCat = null;
    } else {
      selectedCat = btn.textContent;
      btn.classList.add("active");
    }

    renderList();
  });
});

