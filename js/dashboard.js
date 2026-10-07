const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", () => {
    
    const confirmar = confirm(
        "Deseja realmente sair do sistema?"
    );

    if (confirmar) {
        window.location.href = "index.html"
    }
});