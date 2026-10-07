const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginMessage = document.getElementById("loginMessage");

togglePassword.addEventListener("click", () => {
    if (password.type === "password") {

        passwordInput.type = "text";

        togglePassword.textContent = "🙈";

    } else {
        passwordInput.type  = "password";

        togglePassword.textContent = "👁️";

    }
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();

    const password = passwordInput.value.trim();

    if (email === "" || password === "") {
        loginMessage.textContent = "Preencha todos os campos.";

        loginMessage.style.color.color = "red";

        return;
    }

    if (
        email === "enzofurtuoso@gmail.com" && password === "123456"
    ) {
        loginMessage.textContent = "Login realizado com sucesso!";

        loginMessage.style.color = "green";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    } else {
        loginMessage.textContent = "E-mail ou senha incorretos.";

        loginMessage.style.color = "red";
    }
});