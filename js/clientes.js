const clienteForm = document.getElementById("clienteForm");
const clientesTable = document.getElementById("clientesTable");
const totalClientes = document.getElementById("totalClientes");
const pesquisa = document.getElementById("pesquisa");
const clienteMessage = document.getElementById("clienteMessage");
const logoutButton = document.getElementById("logoutButton");

// ============================= CARREGAR CLIENTES

let clientes = JSON.parse(
    localStorage.getItem("clientes") 
) || [];


// ==================== MOSTRAR CLIENTES

function mostrarClientes(lista = clientes) {
    clientesTable.innerHTML = "";

    totalClientes.textContent = clientes.length;

    if (lista.length === 0) {
        clientesTable.innerHTML = `
            <tr>
                <td colspan="5" class="empty">
                    Nenhum cliente encontrado.
                </td>
            </tr>
        `;
        return;
    }

    lista.forEach(cliente => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>
                <strong>${cliente.nome}</strong>
            </td>

            <td>
                ${cliente.telefone || "-"}
            </td>
            <td>
                ${cliente.cpf || "-"}
            </td>

            <td>
                ${cliente.observacoes || "-"}
            </td>

            <td>
                <button
                    class="btn-delete"
                    onClick="excluirCliente('${cliente.id}')"
                >
                    Excluir
                </button>
            </td>
        `;

        clientesTable.appendChild(linha);
    });
}

// ========== CADASTRAR CLIENTE
clienteForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document
        .getElementById("nome")
        .value
        .trim();

    const telefone = document
        .getElementById("telefone")
        .value 
        .trim();

    const cpf = document
        .getElementById("cpf")
        .value 
        .trim();

    const observacoes = document
        .getElementById("observacoes")
        .value 
        .trim();

    const novoCliente = {
        id: Date.now().toString(),
        nome: nome,
        telefone: telefone,
        cpf: cpf,
        observacoes: observacoes,

        criadoEm: new Date().toISOString()
    };

    clientes.push(novoCliente);

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );

    clienteForm.reset();

    clienteMessage.textContent = "Cliente cadastrado com sucesso!";

    clienteMessage.style.color = "green";

    mostrarClientes();

    setTimeout(() => {
        clienteMessage.textContent = "";
    }, 3000);
});


// ====================PESQUISA

pesquisa.addEventListener("input", function() {
    const termo = pesquisa.value 
        .toLowerCase()
        .trim();

    const resultados = clientes.filter(cliente => 
        cliente.nome
        .toLowerCase()
        .includes(termo)
    );

    mostrarClientes(resultados);
});

//===================== EXCLUIR CLIENTES
function excluirCliente(id) {
    const confirmar = confirm(
        "Deseja realmente excluir este cliente?"
    );

    if(!confirmar) {
        return;
    }

    clientes = clientes.filter(
        cliente => cliente.id !== id
    );

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );

    mostrarClientes();
}


// ================== SAIR
logoutButton.addEventListener("click", function() {
    const confirmar = confirm(
        "Deseja realmente sair do sistema?"
    );

    if(confirmar) {
        window.location.href = "index.html";
    }
});

// ================= INICIALIZAÇÃO
mostrarClientes();