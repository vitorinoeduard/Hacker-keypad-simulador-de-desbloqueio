const SENHA_MESTRE = "1234";
let codigoDigitado = "";


const slots = document.querySelectorAll('.keypad-display .slot');
const statusText = document.getElementById('keypad-status');
const displayContainer = document.getElementById('keypad-display');
const rewardBox = document.getElementById('reward-box');
const numKeys = document.querySelectorAll('.btn-key[data-key]');
const btnDel = document.getElementById('btn-del');
const btnEnter = document.getElementById('btn-enter');


function atualizarVisor() {
    slots.forEach((slot, index) => {
        if (index < codigoDigitado.length) {
            slot.textContent = codigoDigitado[index];
        } else {
            slot.textContent = "_";
        }
    });
}

function inserirDigito(digito) {
    if (codigoDigitado.length < 4) {
        codigoDigitado += digito;
        atualizarVisor();

        statusText.classList.remove('error');
        statusText.textContent = "PROCESSANDO DIRETIVAS...";
    }
}

function apagarDigito() {
    if (codigoDigitado.length > 0) {
        codigoDigitado = codigoDigitado.slice(0, -1);
        atualizarVisor();
        if (codigoDigitado.length === 0) {
            statusText.textContent = "INSIRA O CÓDIGO DE ACESSO";
        }
    }
}

function validarCodigo() {
    if (codigoDigitado.length < 4) {
        statusText.textContent = "DIGITE OS 4 DÍGITOS";
        statusText.classList.add('error');
        acionarTremor();
        return;
    }

    if (codigoDigitado === SENHA_MESTRE) {

        statusText.textContent = "ACESSO CONCEDIDO";
        statusText.classList.remove('error');
        statusText.classList.add('success');
        rewardBox.classList.remove('hidden');


        document.querySelectorAll('.btn-key').forEach(btn => btn.disabled = true);
    } else {
        statusText.textContent = "ACESSO NEGADO: CÓDIGO INVÁLIDO";
        statusText.classList.remove('success');
        statusText.classList.add('error');

        acionarTremor();


        codigoDigitado = "";
        atualizarVisor();
    }
}

function acionarTremor() {
    displayContainer.classList.add('shake');
    setTimeout(() => {
        displayContainer.classList.remove('shake');
    }, 400); // 400ms bate com o tempo do @keyframes no CSS
}

//Ouvintes de Evento (Cliques nos Botões da Tela)
numKeys.forEach(btn => {
    btn.addEventListener('click', () => {
        const valor = btn.getAttribute('data-key');
        inserirDigito(valor);
    });
});

btnDel.addEventListener('click', apagarDigito);
btnEnter.addEventListener('click', validarCodigo);


window.addEventListener('keydown', (evento) => {
    if (evento.key >= '0' && evento.key <= '9') {
        inserirDigito(evento.key);
    } else if (evento.key === 'Backspace' || evento.key === 'Delete') {
        apagarDigito();
    } else if (evento.key === 'Enter') {
        validarCodigo();
    }
});