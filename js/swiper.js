var swiper = document.querySelector(".swiper-wrapper");
var timerSwiper = setInterval(nextSlide, 3000);
var transformSlider = 0;
var couter = 0;

function nextSlide() {
  if (couter == 3) {
    couter = 0;
  } else {
    couter++;
  }
  swiper.style.transform = ` translateY(-${couter * 80}vh)`;
}

function prevSlide() {
  if (couter < 0) {
    couter = 3;
  } else {
    couter--;
  }
  swiper.style.transform = ` translateY(-${couter* 80}vh)`;
}

function getSlider(slideNunmber) {
  clearInterval(timerSwiper);
  couter = slideNunmber;
  swiper.style.transform = ` translateY(-${slideNunmber * 80}vh)`;
  setTimeout(() => {
    timerSwiper = setInterval(nextSlide, 3000);
  }, 3000);
}
