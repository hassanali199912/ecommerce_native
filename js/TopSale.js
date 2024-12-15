fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        
        const productsDev = document.getElementById("productsDev");

        allProductsFromJSON = data;
        data.forEach(product => {


            const oldPricePara = product.price ? `<p class="oldPrice">$${product.price}</p>` : '';
            const discountSpan = product.old_price ? `<span class="salePersent">%${Math.floor((product.old_price - product.price) / product.old_price * 100)}</span>` : '';
            const maxLength = 16;
            var productName = product.title.substring(0, maxLength) + "...";

            productsDev.innerHTML += `
                <div class="product ${product.category}">

                    <div class="icons">
                        <span><i onclick="addToCart(${product.id}, this)" class="fa-solid fa-cart-plus"></i></span>
                        <span><i class="fa-solid fa-heart"></i></span>
                        <span><i class="fa-solid fa-share-nodes"></i></span>
                    </div>

                    ${discountSpan}

                    <div class="imgProduct" onclick="productDetails(${product.id})">
                        <img src="${product.image}" alt="">
                        <img class="imgHover" src="${product.image}" alt="">
                    </div>
                    <h3 class="productName" style="cursor: pointer;" onclick="productDetails(${product.id})">${productName}</h3>
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star opac"></i>
                    </div>

                    <div class="price">
                        <p><span>$${product.price}</span></p>
                        ${oldPricePara}
                    </div>

                    <div class="buttons">
                    <button class="moreBtn" onclick="productDetails(${product.id})">Details</button>
                    <button class="addToCartBtn" onclick="addToCart(${product.id}, this)">Add To Cart</button>
                    </div>

                </div>
              `;
        });

        loadCartFromLocalStorage(); // تحميل البيانات من LocalStorage عند تحميل الصفحة
    });



    function FilterProducts(category) {
        const products = document.querySelectorAll('.product');
        products.forEach(product => {
            if (category == "men"){
                category = "men's";
            }else if (category == "women"){
                category = "women's";
            }


            if (product.classList.contains(category) || category === 'all') {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }



////////// back to top /////////////////////
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.backToTop');
    if (window.scrollY > 100) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

document.querySelector('.backToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
