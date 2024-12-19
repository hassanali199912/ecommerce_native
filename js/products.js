var allProductsFromJSON = [];
const loader = document.getElementById("loader");
const productsDev = document.getElementById("productsDev");
var product_display_title_p = document.getElementById(
  "product_display-title-p"
);
loader.style.display = "flex";
fetchData();
async function fetchData() {
  await fetch("https://fakestoreapi.com/products")
    .then((response) => {
      loader.style.display = "none";
      return response.json();
    })
    .then((data) => {
      allProductsFromJSON = data;
      displayProducts(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // loader.style.display = "none"; // Hide the loader in case of error
    });
}

function displayProducts(data) {
  loader.style.display = "none"; // Show the loader
  productsDev.innerHTML = "";
  data.forEach((product) => {
    const maxLength = 16;
    const productName = product.title.substring(0, maxLength) + "...";

    var Rate = product.rating.rate;

    var stars = "";
    for (let i = 0; i < 5; i++) {
      if (i < Rate) {
        stars += `<i class="fa-solid fa-star"></i>`;
      } else {
        stars += `<i class="fa-solid fa-star opac"></i>`;
      }
    }

    productsDev.innerHTML += `
      <div class="product ${product.category}">
        <div class="icons">
          <span><i onclick="addToCart(${product.id}, this)" class="fa-solid fa-cart-plus"></i></span>
          <span><i class="fa-solid fa-heart" onclick="addToWishList(${product.id}, this)"></i></span>
          <span><i class="fa-solid fa-share-nodes"></i></span>
        </div>
        <div class="imgProduct" onclick="productDetails(${product.id})">
          <img src="${product.image}" alt="">
          <img class="imgHover" src="${product.image}" alt="">
        </div>
        <h3 class="productName" onclick="productDetails(${product.id})">${productName}</h3>
        <div class="stars">
          ${stars}
        </div>
        <div class="price">
          <p><span>$${product.price}</span></p>
        </div>
        <div class="buttons">
          <button class="moreBtn" onclick="productDetails(${product.id})">Details</button>
          <button class="addToCartBtn" onclick="addToCart(${product.id}, this)">Add To Cart</button>
        </div>
      </div>
    `;
  });
}

function FilterProducts(category, event) {
  const products = document.querySelectorAll(".product");
  products.forEach((product) => {
    if (category == "men") {
      category = "men's";
    } else if (category == "women") {
      category = "women's";
    }

    if (product.classList.contains(category) || category === "all") {
      product.style.display = "block";
      let active = document.querySelector(".filterItem.active");
      if (active) {
        active.classList.remove("active");
      }
      event.target.classList.add("active");
    } else {
      product.style.display = "none";
    }
  });
}

function productDetails(id) {
  window.location.href = `productDetails.html?id=${id}`;
}

function cloapseFuncction(e) {
  console.log(e.nextElementSibling);
  e.nextElementSibling.classList.toggle("active_ul");
}

function filterclick(e, x) {

  var filter_product = allProductsFromJSON.filter((product) => {
    return product.category == x;
  });

  var span_div_flter = document.getElementById("filter-badge-span");
  var lists_ul_li = document.querySelectorAll(
    ".product_wrapper-filtter-item ul li"
  );
  lists_ul_li.forEach((li) => {
    li.classList.remove("list-active");
  });
  var spans = document.querySelectorAll("#filter-badge-span span");
  spans.forEach((span) => {
    span.remove();
  });
  e.classList.add("list-active");
  var new_span = document.createElement("span");
  new_span.innerText = x;
  span_div_flter.appendChild(new_span);
  product_display_title_p.innerText = `Showing 1-${filter_product.length} of ${allProductsFromJSON.length} results`;
  displayProducts(filter_product);
  new_span.addEventListener("click", () => {
    e.classList.remove("list-active");
    new_span.remove();
  });
}

function clearFilter() {
  product_display_title_p.innerText = `Showing 1-${allProductsFromJSON.length} of ${allProductsFromJSON.length} results`;

  var lists_ul_li = document.querySelectorAll(
    ".product_wrapper-filtter-item ul li"
  );
  lists_ul_li.forEach((li) => {
    li.classList.remove("list-active");
  });
  var spans = document.querySelectorAll("#filter-badge-span span");
  spans.forEach((span) => {
    span.remove();
  });
  displayProducts(allProductsFromJSON);
}
