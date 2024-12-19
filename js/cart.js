//  open the Cart Page

var cartAndWishlist = {
  cart: document.querySelector(".cart"),
  wishlist: document.querySelector(".wishlist"),
};
function openAndCloseCartAndWishList(element) {
  cartAndWishlist[element].classList.toggle("active");
}

// add item in Cart
var allProductsFromJSON = [];

document.addEventListener("DOMContentLoaded", function () {
  async function getAllDataFromApi() {
    await fetch("https://fakestoreapi.com/products")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        allProductsFromJSON = data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  getAllDataFromApi();
});

var itemContainerInCart = document.querySelector(".itemsInCart");
var productsInCart = JSON.parse(localStorage.getItem("userData")).cart || [];

function addToCart(productId, thiselement) {
  if (localStorage.getItem("userData") == null) {
    window.location.href = "../Pages/login.html";
    return;
  }
  let product = allProductsFromJSON.find((p) => p.id === productId);

  let existingProduct = productsInCart.find((p) => p.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    productsInCart.push(product);
  }

  saveCartToLocalStorage();
  getCartInItems();
}

/*select some element from home page */
let countItemsinRedBubble = document.querySelector(".countItem");
let countInsideCart = document.querySelector(".countItemsInsideCart");
let priceBsideCartInHeader = document.querySelector(".priceCartHead");
let priceInsideCart = document.querySelector(".totalPriceOfCart");

/* function Get element from return data of api to use it in add and remove */
function getCartInItems() {
  let totalPriceInHeader = 0;
  let itemCart = "";

  if (productsInCart.length == 0) {
    itemCart = `<img src="../images/empty-shopping-cart.jpg" alt="Cart is empty" style="width: 100%;height: 100%; margin-top: 15%;" />`;
    countInsideCart.innerHTML = "Your cart is empty";
    priceBsideCartInHeader.innerHTML = "$ 0";
    priceInsideCart.innerHTML = "$ 0";
    countItemsinRedBubble.innerHTML = 0;
  } else {
    for (let i = 0; i < productsInCart.length; i++) {
      let productTitle = productsInCart[i].title;
      if (productTitle.length > 20) {
        productTitle = productTitle.substring(0, 20) + "...";
      }
      itemCart += `
                    <div class="cartItems">
                            <img src=${productsInCart[i].image} onclick="productDetailsFromCart(${i})" alt="product Image">
                            <div class="content">
                                    <h4 class="productTitle" onclick="productDetailsFromCart(${i})">
                                         ${productTitle}
                                    </h4>
                                    <p class="itemPrice">$${productsInCart[i].price}</p>
                                    <div class="quantityContainer">
                                            <button onclick="updateQuantity(${i}, 'decrease')" class="quantityBtn">-</button>
                                            <span>${productsInCart[i].quantity}</span>
                                            <button onclick="updateQuantity(${i}, 'increase')" class="quantityBtn">+</button>
                                    </div>
                            </div>
                            <button onclick="removeFromCart(${i})" class="deletItemIcon"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                    `;
      totalPriceInHeader +=
        productsInCart[i].price * productsInCart[i].quantity;
    }

    countInsideCart.innerHTML = `(<span style="color:red;font-weight:bolder;"> ${productsInCart.length} </span> Item in the Cart)`;
    priceBsideCartInHeader.innerHTML = "$ " + totalPriceInHeader.toFixed(2);
    priceInsideCart.innerHTML = "$ " + totalPriceInHeader.toFixed(2);
    countItemsinRedBubble.innerHTML = productsInCart.length;
  }

  itemContainerInCart.innerHTML = itemCart;
}

// update item quantity in Cart
function updateQuantity(index, action) {
  if (action === "increase") {
    productsInCart[index].quantity += 1;
  } else if (action === "decrease" && productsInCart[index].quantity > 1) {
    productsInCart[index].quantity -= 1;
  }
  saveCartToLocalStorage();
  getCartInItems();
}

// remove item from Cart
function removeFromCart(index) {
  productsInCart.splice(index, 1);
  saveCartToLocalStorage();
  getCartInItems();
}

function saveCartToLocalStorage() {
  var userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    userData.cart = [...productsInCart];
    localStorage.setItem("userData", JSON.stringify(userData));
  }
  //localStorage.setItem('cartItems', JSON.stringify(productsInCart));
}

function loadCartFromLocalStorage() {
  getCartInItems();
}

document.addEventListener("DOMContentLoaded", function () {
  loadCartFromLocalStorage();
});

function productDetailsFromCart(index) {
  let product = productsInCart[index];
  window.location.href = `productDetails.html?id=${product.id}`;
}
// function productDetails (productId)
// {
//         const product = allProductsFromJSON[productId];
//         localStorage.setItem('myProduct', JSON.stringify(product));
//         window.location.href= "../Pages/product.html";
// }

// wishlist
var itemContainerInWishList = document.querySelector(".itemsInwishlist");
var productsInWishList = JSON.parse(localStorage.getItem("userData")).fev || [];

function addToWishList(productId, thiselement) {
  if (localStorage.getItem("userData") == null) {
    window.location.href = "../Pages/login.html";
    return;
  }
  let product = allProductsFromJSON.find((p) => p.id === productId);

  let existingProduct = productsInWishList.find((p) => p.id === productId);

  if (existingProduct) {
    thiselement.classList.add("active");
  } else {
    thiselement.classList.add("active");
    productsInWishList.push(product);
  }

  saveWishListToLocalStorage();
  getWishListItems();
  updateWishListCounters();
}

let countItemsinRedBubbleForWishList =
  document.querySelector(".countItemWishList");
let countInsideWishList = document.querySelector(".countItemsInsideWishList");
let priceInsideWishList = document.querySelector(".totalPriceOfWishList");

function activateWishListFeatures() {
  getWishListItems();
  updateWishListCounters();
}

function addToCartFromWishList(index) {
  let product = productsInWishList[index];
  addToCart(product.id);
  removeFromWishList(index);
}

document.addEventListener("DOMContentLoaded", function () {
  activateWishListFeatures();
});

function saveWishListToLocalStorage() {
  var userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    userData.fev = productsInWishList;
    localStorage.setItem("userData", JSON.stringify(userData));
    // if (!isExistInWishlist(userData.fev, productsInWishList[index])) {
    // }
  }
  //localStorage.setItem("wishListItems", JSON.stringify(productsInWishList));
}

function getWishListItems() {
  let itemWishList = "";
  let totalPriceInWishList = 0;

  if (productsInWishList.length == 0) {
    itemWishList = `<img src="../images/empty-shopping-cart.jpg" alt="Wishlist is empty" style="width: 100%;height: 100%; margin-top: 15%;" />`;
    countInsideWishList.innerHTML = "Your wishlist is empty";
    countItemsinRedBubbleForWishList.innerHTML = 0;
    priceInsideWishList.innerHTML = "$ 0";
  } else {
    for (let i = 0; i < productsInWishList.length; i++) {
      let productTitle = productsInWishList[i].title;
      if (productTitle.length > 20) {
        productTitle = productTitle.substring(0, 20) + "...";
      }
      itemWishList += `
            <div class="wishlistItems">
                <img src=${productsInWishList[i].image} onclick="productDetailsFromCart(${i})" alt="product Image">
                <div class="content">
                    <h4 class="productTitle" onclick="productDetailsFromCart(${i})">
                        ${productTitle}
                    </h4>
                    <p class="itemPrice">$${productsInWishList[i].price}</p>
                    <button class="addToCardInWishList addToCartBtn" onclick="addToCartFromWishList(${i})" >Add to Cart</button>
                </div>
                <button onclick="removeFromWishList(${i})" class="deletItemIcon"><i class="fa-solid fa-trash-can"></i></button>
            </div>
            `;
      totalPriceInWishList += productsInWishList[i].price;
    }

    countInsideWishList.innerHTML = `(<span style="color:red;font-weight:bolder;"> ${productsInWishList.length} </span> Item in the Wishlist)`;
    priceInsideWishList.innerHTML = "$ " + totalPriceInWishList.toFixed(2);
    countItemsinRedBubbleForWishList.innerHTML = productsInWishList.length;
  }

  itemContainerInWishList.innerHTML = itemWishList;
}

function removeFromWishList(index) {
  productsInWishList.splice(index, 1);
  saveWishListToLocalStorage(index);
  getWishListItems();
  updateWishListCounters();
}

function updateWishListCounters() {
  countItemsinRedBubbleForWishList.innerHTML = productsInWishList.length;
  countInsideWishList.innerHTML = `(<span style="color:red;font-weight:bolder;"> ${productsInWishList.length} </span> Item in the Wishlist)`;
  let totalPriceInWishList = productsInWishList.reduce(
    (total, product) => total + product.price,
    0
  );
  priceInsideWishList.innerHTML = "$ " + totalPriceInWishList.toFixed(2);
}
