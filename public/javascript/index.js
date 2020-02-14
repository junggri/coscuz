window.onload = function() {
  // $("html,body").animate({ scrollTop: 0 }, 300);
};
let brandArray = document.querySelectorAll(".brand-image");

function makeBrandList(brandArray) {
  let brandId = brandArray[1].id;
  for (let i = 0; i < brandArray.length; i++) {
    brandArray[i].style.backgroundImage = `url(../image/brand/${brandId}.jpg)`;
  }
}
makeBrandList(brandArray);
