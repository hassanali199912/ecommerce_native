document.addEventListener("DOMContentLoaded", async () => {
  const loginForm = document.querySelector(".login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.querySelector(".error-div");
  const login_btn = document.querySelector(".login-btn");
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    login_btn.setAttribute("disabled", false);
    login_btn.textContent = "Logging in...";
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    errorMessage.textContent = "";
    if (!username || !password) {
      errorMessage.textContent = "Please fill in all fields.";
      return;
    }

    console.log(username, password);

    let islogin = await getUserInfo(username, password);
    console.log(islogin);

    if (!islogin.resstatus) {
      login_btn.removeAttribute("disabled");
      login_btn.textContent = "login";
      errorMessage.textContent = islogin.message;
      return;
    }

    errorMessage.textContent = "";
    window.location.href = "./home.html";
  });
});

async function getUserInfo(userName, passWord) {
  localStorage.removeItem("user");
  return await fetch("https://fakestoreapi.com/users")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
        if (user.username === userName) {
          if (user.password === passWord) {
            localStorage.setItem("user", JSON.stringify(user));
            return {
              resstatus: true,
              message: "Login successful!",
            };
          }
          return {
            resstatus: false,
            message: "Invalid Data.",
          };
        }
      });

      console.log(localStorage.getItem("user"));

      if (localStorage.getItem("user") === null) {
        return {
          resstatus: false,
          message: "User not registered.",
        };
      } else {
        return {
          resstatus: true,
          message: "Login successful!",
        };
      }
    })
    .catch((error) => {
      console.log(error.message);

      return error.message;
    });
}
