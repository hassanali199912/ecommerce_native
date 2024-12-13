//  open the Cart Page 


var test ={
    cart:document.querySelector('.cart'),
    wishlist : document.querySelector('.wishlist'),
};
function openAndCloseCartAndWishList (hamada) {
   test[hamada].classList.toggle("active");

}