document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    loginForm.appendChild(errorMessage);

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            errorMessage.textContent = 'Please fill in all fields.';
            return;
        }

        const user = JSON.parse(localStorage.getItem(username));

        if (!user) {
            errorMessage.textContent = 'User not registered.';
            return;
        }

        if (user.password !== password) {
            errorMessage.textContent = 'Incorrect password.';
            return;
        }

        errorMessage.textContent = '';
        alert('Login successful!');
        window.location.href = './home.html'; // Redirect to home page upon successful login
    });
});