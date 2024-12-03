// Elementos da interface
const gameLog = document.getElementById("game-log");
const gameControls = document.getElementById("game-controls");

// Estados do jogo
let localizacao = "floresta";
let localAnterior = null;
let inventario = [];
let inimigoAtivo = false;
let vidaJogador = 100;

// Mapas de localizações
const locais = {
    floresta: { descricao: "Você está em uma floresta escura. Escolha seu caminho.", caminhos: ["norte", "leste", "oeste","sul","inventário", "sair"] },
    cabana: { descricao: "Você está em uma cabana abandonada. Parece haver algo útil aqui.", caminhos: ["voltar", "inventário"] },
    rio: { descricao: "Você está diante de um rio turbulento. Há uma ponte frágil ao norte.", caminhos: ["voltar", "inventário","norte"] },
    tesouro: { descricao: "Você encontrou o tesouro escondido! Parabéns!", caminhos: [] },
};

// Adicionar log no jogo
function adicionarLog(texto) {
    const p = document.createElement("p");
    p.textContent = texto;
    gameLog.appendChild(p);
    gameLog.scrollTop = gameLog.scrollHeight; // Sempre rola para a última mensagem
}

// Atualizar a interface com as opções disponíveis
function atualizarInterface() {
    gameControls.innerHTML = "";
    const local = locais[localizacao];
    adicionarLog(local.descricao);

    local.caminhos.forEach((comando) => {
        const botao = document.createElement("button");
        botao.textContent = comando.charAt(0).toUpperCase() + comando.slice(1);
        botao.onclick = () => executarComando(comando);
        gameControls.appendChild(botao);
    });
}

// Função para executar comandos
function executarComando(comando) {
    if (comando === "norte") {
        if (localizacao === "floresta") {
            localAnterior = localizacao;
            localizacao = "cabana";
            adicionarLog("Você se move para a cabana.");
        } else if (localizacao === "rio" && inventario.includes("chave")) {
            localAnterior = localizacao;
            localizacao = "tesouro";
            adicionarLog("Você atravessa a ponte com a chave.");
        } else {
            adicionarLog("Você não pode ir para o norte daqui.");
        }
    } else if (comando === "leste") {
        if (localizacao === "floresta") {
            localAnterior = localizacao;
            localizacao = "rio";
            adicionarLog("Você se move para o rio.");
        } else {
            adicionarLog("Você não pode ir para o leste daqui.");
        }
    } else if (comando === "voltar") {
        if (localAnterior) {
            const temp = localizacao;
            localizacao = localAnterior;
            localAnterior = temp;
            adicionarLog("Você volta para o local anterior.");
        } else {
            adicionarLog("Você não pode voltar mais.");
        }
    } else if (comando === "inventário") {
        mostrarInventario();
    } else if (comando === "sair") {
        encerrarJogo();
    } else {
        adicionarLog("Comando inválido.");
    }

    // Combate aleatório
    if (Math.random() < 0.3 && localizacao === "floresta") {
        iniciarCombate();
    } else {
        explorarLocal();
    }
}

// Mostrar o inventário
function mostrarInventario() {
    if (inventario.length === 0) {
        adicionarLog("Seu inventário está vazio.");
    } else {
        adicionarLog("Seus itens: " + inventario.join(", "));
    }
}

// Iniciar combate
function iniciarCombate() {
    inimigoAtivo = true;
    adicionarLog("Você foi atacado por um lobo!");
    const botaoAtacar = document.createElement("button");
    botaoAtacar.textContent = "Atacar";
    botaoAtacar.onclick = atacar;
    gameControls.appendChild(botaoAtacar);

    const botaoFugir = document.createElement("button");
    botaoFugir.textContent = "Fugir";
    botaoFugir.onclick = fugir;
    gameControls.appendChild(botaoFugir);
}

// Atacar inimigo
function atacar() {
    const dano = Math.floor(Math.random() * 20) + 10;
    adicionarLog(`Você causou ${dano} de dano ao lobo!`);
    inimigoAtivo = false;
    atualizarInterface();
}

// Fugir do combate
function fugir() {
    adicionarLog("Você conseguiu fugir do lobo!");
    inimigoAtivo = false;
    atualizarInterface();
}

// Explorar a localização atual
function explorarLocal() {
    if (localizacao === "cabana" && !inventario.includes("chave")) {
        adicionarLog("Você encontrou uma chave após resolver um quebra-cabeça!");
        inventario.push("chave");
    } else if (localizacao === "tesouro") {
        adicionarLog("Parabéns! Você encontrou o tesouro e venceu o jogo!");
        gameControls.innerHTML = ""; // Limpa os controles ao vencer
        return;
    }
    atualizarInterface();
}

// Encerrar o jogo
function encerrarJogo() {
    adicionarLog("Obrigado por jogar! Até a próxima!");
    gameControls.innerHTML = "";
}

// Inicializar o jogo
function iniciarJogo() {
    adicionarLog("Bem-vindo à Aventura em Texto!");
    adicionarLog("Cuidado com os perigos da floresta!");
    atualizarInterface();
}

iniciarJogo();
