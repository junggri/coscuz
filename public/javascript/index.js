// window.onload = function() {
// $("html,body").animate({ scrollTop: 0 }, 300);
// };
$(".nav-bar_login").on("click", function() {
  location.href = "/auth/login";
});
$(".nav-bar_register").on("click", function() {
  location.href = "/auth/register";
});
$(".icon-torso").on("click", function() {
  location.href = "/auth/logout_process";
});
$(".nav-bar_name").on("click", () => {
  location.href = "/";
});

const slideList = document.querySelector(".slide_list"); // Slide parent dom
const slideContents = document.querySelectorAll(".slide_content"); // each slide dom
const slideBtnNext = document.querySelector(".slide_btn_next"); // next button
const slideBtnPrev = document.querySelector(".slide_btn_prev"); // prev button
const pagination = document.querySelector(".slide_pagination");
const slideLen = slideContents.length; // slide length
const slideWidth = screen.width;
const slideSpeed = 300; // slide speed
const startNum = 0;
const listWidth = document.querySelector(".slide_wrap");
const slideBox = document.querySelector(".slide_box");

slideBox.style.width = screen.width + "px";
listWidth.style.width = screen.width + "px";
slideContents.forEach(function(e) {
  e.style.width = screen.width + "px";
});

$(window).resize(function() {
  let chageWidth = screen.width;
  slideBox.style.width = chageWidth + "px";
  listWidth.style.width = chageWidth + "px";
  slideContents.forEach(function(e) {
    e.style.width = chageWidth + "px";
  });
});
slideList.style.width = screen.width * (slideLen + 2) + "px";

let firstChild = slideList.firstElementChild;
let lastChild = slideList.lastElementChild;
let clonedFirst = firstChild.cloneNode(true);
let clonedLast = lastChild.cloneNode(true);

slideList.appendChild(clonedFirst);
slideList.insertBefore(clonedLast, slideList.firstElementChild);

slideList.style.transform =
  "translate3d(-" + slideWidth * (startNum + 1) + "px, 0px, 0px)";

let curIndex = startNum;
let curSlide = slideContents[curIndex];
curSlide.classList.add("slide_active");

let slideMove = function() {
  if (curIndex <= slideLen - 1) {
    slideList.style.transition = slideSpeed + "ms";
    slideList.style.transform =
      "translate3d(-" + slideWidth * (curIndex + 2) + "px, 0px, 0px)";
  }
  if (curIndex === slideLen - 1) {
    setTimeout(function() {
      slideList.style.transition = "0ms";
      slideList.style.transform =
        "translate3d(-" + slideWidth + "px, 0px, 0px)";
    }, slideSpeed);
    curIndex = -1;
  }
  curSlide.classList.remove("slide_active");
  pageDots[curIndex === -1 ? slideLen - 1 : curIndex].classList.remove(
    "dot_active"
  );
  curSlide = slideContents[++curIndex];
  curSlide.classList.add("slide_active");
  pageDots[curIndex].classList.add("dot_active");
};

slideBtnNext.addEventListener("click", function() {
  slideMove();
});
setInterval(() => {
  slideMove();
}, 3500);
/** Prev Button Event */
slideBtnPrev.addEventListener("click", function() {
  if (curIndex >= 0) {
    slideList.style.transition = slideSpeed + "ms";
    slideList.style.transform =
      "translate3d(-" + slideWidth * curIndex + "px, 0px, 0px)";
  }
  if (curIndex === 0) {
    setTimeout(function() {
      slideList.style.transition = "0ms";
      slideList.style.transform =
        "translate3d(-" + slideWidth * slideLen + "px, 0px, 0px)";
    }, slideSpeed);
    curIndex = slideLen;
  }
  curSlide.classList.remove("slide_active");
  pageDots[curIndex === slideLen ? 0 : curIndex].classList.remove("dot_active");
  curSlide = slideContents[--curIndex];
  curSlide.classList.add("slide_active");
  pageDots[curIndex].classList.add("dot_active");
});
//
let pageChild = "";
for (var i = 0; i < slideLen; i++) {
  pageChild += '<li class="dot';
  pageChild += i === startNum ? " dot_active" : "";
  pageChild += '" data-index="' + i + '"><a href="#"></a></li>';
}
pagination.innerHTML = pageChild;
const pageDots = document.querySelectorAll(".dot"); // each dot from pagination
/** Pagination Button Event */
let curDot;
Array.prototype.forEach.call(pageDots, function(dot, i) {
  dot.addEventListener("click", function(e) {
    e.preventDefault();
    curDot = document.querySelector(".dot_active");
    curDot.classList.remove("dot_active");
    curDot = this;
    this.classList.add("dot_active");
    curSlide.classList.remove("slide_active");
    curIndex = Number(this.getAttribute("data-index"));
    curSlide = slideContents[curIndex];
    curSlide.classList.add("slide_active");
    slideList.style.transition = slideSpeed + "ms";
    slideList.style.transform =
      "translate3d(-" + slideWidth * (curIndex + 1) + "px, 0px, 0px)";
  });
});
