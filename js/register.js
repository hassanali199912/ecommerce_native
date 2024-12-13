document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".register-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        if (!validateUsername(username)) {
            alert("Invalid username. It must be at least 3 characters long.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Invalid email address.");
            return;
        }

        if (!validatePassword(password)) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const userData = {
            username: username,
            email: email,
            password: password,
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        alert("User registered successfully!");
        window.location.href = "./login.html";
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
