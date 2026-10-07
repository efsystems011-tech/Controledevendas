const vendaForm = document.getElementById("vendaForm");

const clienteSelect = document.getElementById("cliente");
const produtoInput = document.getElementById("produto");
const valorInput = document.getElementById("valor");

const quantidadeParcelas = document.getElementById("quantidadeParcelas");

const primeiroVencimento = document.getElementById("primeiroVencimento");

const valorParcela = document.getElementById("valorParcela");

const resumoValor = document.getElementById("resumoValor");

const resumoParcelas = document.getElementById("resumoParcelas");

const resumoValorParcela = document.getElementById("resumoValorParcela");

const previewParcelas = document.getElementById("previewParcelas");

const vendaMessage = document.getElementById("vendaMessage");

const logoutButton = document.getElementById("logoutButton");

// ===============  DADOS
const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

let vendas = JSON.parse(localStorage.getItem("vendas")) || [];

// ==================== CARREGAR CLIENTES 
function carregarClientes() {
    clientes.forEach(cliente => {
        const option = document.createElement("option");

        option.value = cliente.id;
        option.textContent = cliente.nome;
        clienteSelect.appendChild(option);
    });
}

carregarClientes();

// ======================= FORMATAÇÃO DE MOEDA

function formatarMoeda(valor) {
    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}


// ================ ADICIONAR MESES
function adicionarMeses(dataString, meses) {
    const partes = dataString.split("-");

    const ano = Number(partes[0]);
    const mes = Number(partes[1]) -1;
    const dia = Number(partes[2]);

    const novaData = new Date(
        ano,
        mes + meses,
        1
    );

    const ultimoDiaMes = new Date(
        novaData.getFullYear(),
        novaData.getMonth() + 1,
        0
    ).getDate();

    novaData.setDate(
        Math.min(dia, ultimoDiaMes)
    );

    return novaData;
}

// ================= FORMATAR DATA

function formatarData(data) {

    return data.toLocaleDateString(
        "pt-BR"
    );
}

// ======================== CALCULAR PARCELAS
function calcularParcelas() {
    const valor = Number(valorInput.value);
    const quantidade = Number(quantidadeParcelas.value);
    const data = Number(quantidadeParcelas.value);

    if(!valor || valor <= 0) {
        valorParcela.textContent = "R$ 0,00";

        resumoValor.textContent = "R$ 0,00";

        resumoValorParcela.textContent = "R$ 0,00";

        previewParcelas.innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    Informe o valor da venda.
                </td>
            </tr>
        `;

        return;

    }

    const parcela = valor / quantidade;

    valorParcela.textContent = formatarMoeda(parcela);

    resumoValor.textContent = formatarMoeda(valor);

    resumoParcelas.textContent = quantidade + "x";

    resumoValorParcela.textContent = formatarMoeda(parcela);

    if (!data) {
        previewParcelas.innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    Informe o primeiro vencimento.
                </td>
            </tr>
        `;

        return;
    }

    previewParcelas.innerHTML = "";

    for (let i = 0; i < quantidade; i++) {

        const vencimento = adicionarMeses(data, i);

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>
                ${i + 1}/${quantidade}
            </td>

            <td>
                ${formatarMoeda(parcela)}
            </td>

            <td>
                ${formatarMoeda(vencimento)}
            </td>

            <td>
                <span class="status-pendente">
                    Pendente
                </span>
            </td>
        `;

        previewParcelas.appendChild(linha);
    }
}

// ====================== EVENTOS PARA CÁLCULO
valorInput.addEventListener(
    "input",
    calcularParcelas
);

quantidadeParcelas.addEventListener(
    "change",
    calcularParcelas
);

//  ===================== CADASTRAR VENDA
vendaForm.addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        const clientId = clienteSelect.value;

        const cliente = clientes.find(
            item => item.id === clientId
        );

        if (!cliente) {
            vendaMessage.textContent = "Selecione um cliente.";

            vendaMessage.style.color = "red";

            return;
        }

        const valor = Number(valorInput.value);

        const quantidade = Number(quantidadeParcelas.value);

        const dataInicial = primeiroVencimento.value;

        
    }
)