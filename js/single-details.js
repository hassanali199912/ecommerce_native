var min_img = document.querySelector(".main-img");
var images = document.querySelectorAll(".small-img img");
var counter = 0;

var decrement = document.querySelector(".fa-minus");
var increment = document.querySelector(".fa-plus");
var span = document.querySelector(".counter span");

images.forEach((image) => {
  image.addEventListener("click", function () {
    min_img.src = image.src;
  });
});

increment.addEventListener("click", function () {
  counter++;
  span.textContent = counter;
});
decrement.addEventListener("click", function () {
  counter--;
  if (counter <1 ) {
    counter = 0
  }
  span.textContent = counter;
});
