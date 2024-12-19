document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".register-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const registerButton = document.querySelector(".register-btn");
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.querySelector(".error-div");
    errorMessage.innerHTML = "";
    let isExist = false;
    const confirmPassword = document
      .getElementById("confirm-password")
      .value.trim();

    registerButton.innerHTML = "Registering...";
    registerButton.disabled = true;

    if (!validateUsername(username)) {
      errorMessage.innerHTML =
        "Invalid username. It must be at least 3 characters long.";
      registerButton.innerHTML = "Register";
      registerButton.removeAttribute("disabled");

      return;
    }

    if (!validateEmail(email)) {
      errorMessage.innerHTML = "Invalid email address.";
      registerButton.innerHTML = "Register";
      registerButton.removeAttribute("disabled");

      return;
    }

    if (!validatePassword(password)) {
      errorMessage.innerHTML = "Password must be at least 6 characters long.";
      registerButton.innerHTML = "Register";
      registerButton.removeAttribute("disabled");

      return;
    }

    if (password !== confirmPassword) {
      errorMessage.innerHTML = "Passwords do not match.";
      registerButton.innerHTML = "Register";
      registerButton.removeAttribute("disabled");

      return;
    }

    const userData = {
      username: username,
      email: email,
      password: password,
      cart: [],
      fev: [],
    };

    let existingData = JSON.parse(localStorage.getItem("allUsersData")) || [];

    existingData.filter((user) => {
      if (user.email === email) {
        isExist = true;
      }
    });

    if (isExist) {
      errorMessage.innerHTML =
        "Email already exists. Please use a different email.";
      registerButton.innerHTML = "Register";
      registerButton.removeAttribute("disabled");

      return;
    }
    registerButton.innerHTML = "Register";
    registerButton.removeAttribute("disabled");
    existingData.push(userData);
    localStorage.setItem("allUsersData", JSON.stringify(existingData));
    localStorage.setItem(
      "userData",
      JSON.stringify({
        username: username,
        email: email,
        cart: [],
        fev: [],
      })
    );
    window.location.href = "./home.html";
  });

  function validateUsername(username) {
    return username.length >= 3;
  }

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function validatePassword(password) {
    return password.length >= 6;
  }
});
