const container = document.getElementById("blog-container");
const langFilter = document.getElementById("lang-filter");
const catFilter = document.getElementById("cat-filter");

const data = [
  {
    title: "Branden-Krasikov-Shapiro Type Theorem for Linear Difference Operator",
    file: "Blog_file/2412-Branden-Krasikov-Shapiro.pdf",
    pages: 14,
    date: "2024-12-05",
    language: "English",
    category: "analysis"
  },
  {
    title: "复动力系统讲义笔记",
    file: "Blog_file/2501-Complex-Dynamics-Notes.pdf",
    pages: 32,
    date: "2025-01-10",
    language: "中文",
    category: "complex dynamics"
  },
  {
    title: "复动力系统讲义笔记",
    file: "Blog_file/2501-Complex-Dynamics-Notes.pdf",
    pages: 32,
    date: "2025-01-10",
    language: "中文",
    category: "complex dynamics"
  },
  {
    title: "复动力系统讲义笔记",
    file: "Blog_file/2501-Complex-Dynamics-Notes.pdf",
    pages: 32,
    date: "2025-01-10",
    language: "中文",
    category: "complex dynamics"
  },
  {
    title: "对冲基金投资策略及风险模型",
    file: "assets/blog_file/2212-对冲基金投资策略及风险模型.pdf",
    pages: 21,
    date: "2022-12-10",
    language: "中文",
    category: "Finance"
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
      <span class="meta">${item.pages} pages, ${formatDate(item.date)}</span>
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

