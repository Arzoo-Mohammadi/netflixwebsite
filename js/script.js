// step 1: get DOM
let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");

let carouselDom = document.querySelector("#carousel");
let SliderDom = carouselDom.querySelector("#carousel .list");
let thumbnailBorderDom = document.querySelector("#carousel .thumbnail");
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");
let timeDom = document.querySelector("#carousel .time");

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function () {
  showSlider("next");
};

prevDom.onclick = function () {
  showSlider("prev");
};
let runTimeOut;
let runNextAuto = setTimeout(() => {
  next.click();
}, timeAutoNext);
function showSlider(type) {
  let SliderItemsDom = SliderDom.querySelectorAll("#carousel .list .item");
  let thumbnailItemsDom = document.querySelectorAll(
    "#carousel .thumbnail .item"
  );

  if (type === "next") {
    SliderDom.appendChild(SliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    carouselDom.classList.add("next");
  } else {
    SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
    thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    carouselDom.classList.add("prev");
  }
  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove("next");
    carouselDom.classList.remove("prev");
  }, timeRunning);

  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    next.click();
  }, timeAutoNext);
}
// SHow mage in
var items = document.querySelectorAll(".carousel .carousel-item");
items.forEach((e) => {
  const slide = 6;
  let next = e.nextElementSibling;
  for (var i = 0; i < slide; i++) {
    if (!next) {
      next = items[0];
    }
    let clonechild = next.cloneNode(true);
    e.appendChild(clonechild.children[0]);
    next = next.nextElementSibling;
  }
});
// trending Section
function changeBackground(imageUrl, text) {
  document.getElementById("trending-section").style.backgroundImage = `url('${imageUrl}')`;

  let textOverlay = document.getElementById("text-overlay");
  textOverlay.innerHTML = `${text} <br> <a href="#"><button id="play-button">Play Now</button></a>`;
}

// Pagination images
const images = [
  "img/suggested/11.jpg",
  "img/suggested/22.jpg",
  "img/suggested/77.jpg",
  "img/suggested/44.jpg",
  "img/suggested/55.jpg",
  "img/suggested/66.jpg",
  "img/suggested/33.jpg",
  "img/suggested/88.jpg",
  "img/suggested/99.jpg",
  "img/suggested/10.jpg",
  "img/suggested/111.jpg",
  "img/suggested/12.jpg",
];


const imagesPerPage = 3;
let currentPage = 1;

function displayImages(page) {
  const start = (page - 1) * imagesPerPage;
  const end = start + imagesPerPage;
  const imageGallery = document.getElementById("imageGallery");
  imageGallery.style.opacity = "0";

  setTimeout(() => {
    imageGallery.innerHTML = "";
    images.slice(start, end).forEach((src) => {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-md-4 mb-3";
      col.innerHTML = `<img src="${src}" class="img-fluid rounded">`;
      imageGallery.appendChild(col);
    });
    imageGallery.style.opacity = "1";
  }, 300);

  updateButtons();
}

function setupPagination() {
  const pageCount = Math.ceil(images.length / imagesPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {
    let li = document.createElement("li");
    li.className = "page-item" + (i === currentPage ? " active" : "");
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", function (event) {
      event.preventDefault(); // Prevents the page from reloading
      currentPage = i;
      displayImages(currentPage);
      setupPagination();
    });
    pagination.appendChild(li);
  }
}

function updateButtons() {
  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled =
    currentPage === Math.ceil(images.length / imagesPerPage);
}

document.getElementById("prevBtn").addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    displayImages(currentPage);
    setupPagination();
  }
});

document.getElementById("nextBtn").addEventListener("click", function () {
  if (currentPage < Math.ceil(images.length / imagesPerPage)) {
    currentPage++;
    displayImages(currentPage);
    setupPagination();
  }
});
displayImages(currentPage);
setupPagination();
