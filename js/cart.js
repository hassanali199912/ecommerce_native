//  open the Cart Page

var cartAndWishlist = {
  cart: document.querySelector(".cart"),
  wishlist: document.querySelector(".wishlist"),
};
function openAndCloseCartAndWishList(element) {
  cartAndWishlist[element].classList.toggle("active");
}
