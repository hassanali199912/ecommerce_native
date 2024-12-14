var header = document.getElementById("header_component");
var footer = document.getElementById("footer_component");

function loadHeader() {
  header.innerHTML = `
    
        <div class="header_top">
            <div class="container ">
                <p class="header_top_left">Hi<span> Hassan</span> </p>
                <ul class="header_top_right">
                    <li><a href="login.html">Login</a></li>
                    <p> | </p>
                    <li><a href="register.html">Register</a></li>
                </ul>
            </div>
        </div>

        <nav>
            <div class="container">
                <div class="logo">
                    <a href="home.html"><img src="../images/logo.png" alt="logo"></a>
                </div>
                <ul>
                    <li><a href="home.html">Home</a></li>
                    <li><a href="shop.html">Shop</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contacts.html">Contact</a></li>
                </ul>
                <div class="search">
                    <input type="text" placeholder="Search">
                    <button>Search</button>
                </div>

                <div class="cartHeader">
                    <div class="wishlistIcon">
                        <a href="wishlist.html" class="icon"><i class="fa-solid fa-heart"></i></a>
                        <span class="countItem">0</span>
                    </div>
                    <div class="cartIcon">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span class="countItem">0</span>
                    </div>
                    <!-- Price beside the Cart in Header -->
                    <div class="totalPrice">
                        <p class="priceCartHead">$0</p>
                    </div>
                </div>
            </div>

        </nav>
    
    `;
}
function loadFooter() {
  footer.innerHTML = `
    
        <div class="footer-top">
            <div class="container">
                <div class="footer-column">
                    <!-- قسم عن ShopEase -->
                    <div class="footer-section">
                        <h5>About ShopEase</h5>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Press Releases</a></li>
                            <li><a href="#">ShopEase Cares</a></li>
                        </ul>
                    </div>
                    <!-- قسم دعم العملاء -->
                    <div class="footer-section">
                        <h5>Customer Service</h5>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Returns & Refunds</a></li>
                            <li><a href="#">Shipping Info</a></li>
                            <li><a href="#">Track Order</a></li>
                        </ul>
                    </div>
                    <!-- قسم السياسة والشروط -->
                    <div class="footer-section">
                        <h5>Policies</h5>
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Use</a></li>
                            <li><a href="#">Cookies Policy</a></li>
                            <li><a href="#">Security</a></li>
                        </ul>
                    </div>
                    <!-- قسم التواصل الاجتماعي -->
                    <div class="footer-section">
                        <h5>Connect With Us</h5>
                        <ul class="social-links">
                            <li><a href="#"><i class="fa-brands fa-facebook"></i> Facebook</a></li>
                            <li><a href="#"><i class="fa-brands fa-twitter"></i> Twitter</a></li>
                            <li><a href="#"><i class="fa-brands fa-instagram"></i> Instagram</a></li>
                            <li><a href="#"><i class="fa-brands fa-linkedin"></i> LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <p>&copy; 2024 ShopEase. All rights reserved.</p>
            </div>
        </div>
    
    `;
}

window.onload = () => {
  loadHeader();
  loadFooter();
};
