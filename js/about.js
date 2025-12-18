const imageData = {
  travel: {
    base: "assets/about_file/travel/",
    files: [
      "2404 (1).jpg", "2404 (2).jpg", "2404 (3).jpg", "2404 (4).jpg", "2404 (5).jpg", "2404 (6).jpg", "2404 (7).jpg", // 上海F1
      "2405 (1).jpg", "2405 (2).jpg", "2405 (3).jpg", "2405 (4).jpg", "2405 (5).jpg", "2405 (6).jpg", // 哈尔滨
      "2406 (1).jpg", "2406 (2).jpg", "2406 (3).jpg", "2406 (4).jpg", // 京都
      "2407 (1).jpg", "2407 (2).jpg", "2407 (3).jpg", "2407 (4).jpg", "2407 (5).jpg", "2407 (6).jpg", "2407 (7).jpg", "2407 (8).jpg", "2407 (9).jpg", "2407 (10).jpg", // 川西
      "2510 (1).jpg", "2510 (2).jpg", "2510 (3).jpg", "2510 (4).jpg", "2510 (5).jpg", "2510 (6).jpg", "2510 (7).jpg" // 东北
    ]
  },
  printing: {
    base: "assets/about_file/printing/",
    files: [
      "24 (1).jpg", "24 (2).jpg", "24 (3).jpg", "24 (4).jpg", "24 (5).jpg", "24 (6).jpg", "24 (7).jpg", "24 (8).jpg", "24 (9).jpg", "24 (10).jpg", "24 (11).jpg", "24 (12).jpg", "24 (13).jpg", "24 (14).jpg", "24 (15).jpg", "24 (16).jpg", "24 (17).jpg", "24 (18).jpg", "24 (19).jpg", "24 (20).jpg", 
      "25 (1).jpg", "25 (2).jpg", "25 (3).jpg", "25 (4).jpg", "25 (5).jpg"
    ]
  }
};


const travelPaths = imageData.travel.files.map(
  f => imageData.travel.base + f
);
const printingPaths = imageData.printing.files.map(
  f => imageData.printing.base + f
);


function sortByDateDesc(paths) {
  return [...paths].sort((a, b) => {
    const nameA = a.split("/").pop();
    const nameB = b.split("/").pop();
    return nameB.localeCompare(nameA); // 字符串降序
  });
}


function renderGallery(containerId, imagePaths, limit = null, moreLink = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const sorted = sortByDateDesc(imagePaths);
  const images = limit ? sorted.slice(0, limit) : sorted;

  container.innerHTML = "";

  images.forEach(path => {
    const img = document.createElement("img");
    img.src = path;
    img.loading = "lazy";
    img.addEventListener("click", () => openLightbox(path));
    container.appendChild(img);
  });

  if (moreLink) {
    const more = document.createElement("a");
    more.className = "gallery-more";
    more.href = moreLink;
    more.textContent = "More →";
    container.appendChild(more);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const page = main?.dataset.page;

  if (page === "about") {
    renderGallery("travel-gallery", travelPaths, 4, "about_travel.html");
    renderGallery("printing-gallery", printingPaths, 4, "about_printing.html");
  }

  if (page === "about-travel") {
    renderGallery("travel-gallery", travelPaths);
  }

  if (page === "about-printing") {
    renderGallery("printing-gallery", printingPaths);
  }
});



// 图片预览
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add("active");
}

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxImg.src = "";
}

lightbox.addEventListener("click", closeLightbox);

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

