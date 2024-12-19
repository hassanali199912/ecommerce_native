document.addEventListener("DOMContentLoaded", function () {
  let header_top = document.querySelector(".header_top");
  let userData = JSON.parse(localStorage.getItem("userData"));
  if (header_top && userData) {
    header_top.innerHTML = `
     <div class="container ">
                <p class="header_top_left">
                    Wellcome <span> ${userData.username}</span>
                </p>
                 <ul class="header_top_right">
                    <li>
                    <button class="logoutBtn" onclick="logout()">Logout </button>
                    </li>
                </ul>
            </div>

    `;
  } else {
    header_top.innerHTML = `
              <div class="container ">
                <p class="header_top_left">
                    With 50% discount see our products
                </p>
                <ul class="header_top_right">
                    <li><a href="login.html">Login</a></li>
                    <p> | </p>
                    <li><a href="register.html">Register</a></li>
                </ul>
            </div>
    `;
  }
});

function logout() {
  localStorage.removeItem("userData");
  window.location.href = "home.html";
}

function sheppingOrder() {
  let userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    userData.cart = [];

    localStorage.setItem("userData", JSON.stringify(userData));
    window.location.href = "home.html";
  } else {
    window.location.href = "login.html";
  }
}
