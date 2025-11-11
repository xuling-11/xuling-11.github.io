const theme_toggleBtn = document.getElementById("theme-toggle");
const theme_icon = theme_toggleBtn.querySelector("img"); // 找到按钮里的图片
const currentTheme = localStorage.getItem("theme");

// 初始加载时根据 localStorage 或系统偏好设置主题
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  theme_icon.src = currentTheme === "dark"
    ? "assets/icon_file/darkmode.png"
    : "assets/icon_file/lightmode.png";
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.documentElement.setAttribute("data-theme", "dark");
  theme_icon.src = "assets/icon_file/darkmode.png";
} else {
  theme_icon.src = "assets/icon_file/lightmode.png";
}

// 点击按钮时切换主题
theme_toggleBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);

  // 切换图标
  theme_icon.src = newTheme === "dark"
    ? "assets/icon_file/darkmode.png"
    : "assets/icon_file/lightmode.png";

  localStorage.setItem("theme", newTheme);
});
