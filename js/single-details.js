document.addEventListener("DOMContentLoaded", function () {
  let productId = window.location.search.split("=")[1];

  if (productId != null) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        console.log(product);

        let productDiv = document.querySelector(".product-details-container");
        productDiv.innerHTML = `<div class="left">
                    <img src="${product.image}" alt="" class="main-img">
                    <div class="small-img">
                        <img src="${
                          product.image
                        }" alt="" class="small-img-item">
                        <img src="../images/swiper/jewelery.jpg" alt="" class="small-img-item">
                        <img src="../images/swiper/men's clothing.jpeg" alt="" class="small-img-item">
                        <img src="../images/swiper/women's clothing.jpg" alt="" class="small-img-item">
                    </div>
                </div>
                <div class="right">
                    <h1>${product.title}</h1>
                    <div class="price">
                        <span>$ ${product.price}</span>
                        <span>$ ${product.price * 2}</span>
                    </div>
                    <ul>
                        <li>Stok Count: <span>${
                          product.rating.count
                        }</span></li>
                        <li>Category: <span>${product.category}</span></li>
                    </ul>
                    <p>
                    ${product.description}</p>
                    <div class="controllers">
                        <div class="counter">
                            <i class="fa-solid fa-minus"></i>
                            <span>1</span>
                            <i class="fa-solid fa-plus"></i>
                        </div>
                        <button class="btn add-cart btn-primary"
                         onclick="addToCart(${productId}, this)">Add To Cart</button>
                        <button class="btn heart"  onclick="addToWishList(${
                          product.id
                        }, this)">
                            <i class="fa-solid fa-heart"></i>
                        </button>
                    </div>
                </div>`;
        activeFunction();
      });

    function activeFunction() {
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
        if (counter < 1) {
          counter = 0;
        }
        span.textContent = counter;
      });
    }
  } else {
    window.location.href = "home.html";
  }
});
