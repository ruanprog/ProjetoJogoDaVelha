class JogoDaVelha {
    constructor(mode) {
        this.tabuleiro = ["", "", "", "", "", "", "", "", ""];
        this.jogadorAtual = "X"; // X começa
        this.gameOver = false;
        this.mode = mode;
    }

    // Função para verificar se alguém ganhou
    verificarVitoria() {
        const combinaçõesDeVitoria = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of combinaçõesDeVitoria) {
            const [a, b, c] = combo;
            if (this.tabuleiro[a] && this.tabuleiro[a] === this.tabuleiro[b] && this.tabuleiro[a] === this.tabuleiro[c]) {
                return this.tabuleiro[a]; // Retorna 'X' ou 'O'
            }
        }

        if (!this.tabuleiro.includes("")) return "empate"; // Empate

        return null;
    }

    // Função para fazer uma jogada
    fazerJogada(posicao) {
        if (this.tabuleiro[posicao] || this.gameOver) return;

        this.tabuleiro[posicao] = this.jogadorAtual;
        const vencedor = this.verificarVitoria();

        if (vencedor === "X") {
            this.incrementarPontos(1);
            alert("Jogador 1 (X) venceu!");
            this.gameOver = true;
        } else if (vencedor === "O") {
            this.incrementarPontos(2);
            alert("Jogador 2 (O) venceu!");
            this.gameOver = true;
        } else if (vencedor === "empate") {
            alert("Empate!");
            this.gameOver = true;
        } else {
            this.jogadorAtual = this.jogadorAtual === "X" ? "O" : "X"; // Troca jogador
            if (this.mode === "single" && this.jogadorAtual === "O") {
                this.jogarComputador();
            }
        }

        this.atualizarTabuleiro();
    }

    // Função para jogar contra o computador
    jogarComputador() {
        let posicaoLivre = this.tabuleiro.indexOf("");
        while (posicaoLivre === -1) posicaoLivre = this.tabuleiro.indexOf("");
        setTimeout(() => {
            this.fazerJogada(posicaoLivre);
        }, 500);
    }

    // Atualizar a interface gráfica do tabuleiro
    atualizarTabuleiro() {
        const cells = document.querySelectorAll(".cell");
        this.tabuleiro.forEach((valor, index) => {
            cells[index].textContent = valor;
            cells[index].disabled = valor !== "";
        });
    }

    // Reiniciar o jogo
    resetarJogo() {
        this.tabuleiro = ["", "", "", "", "", "", "", "", ""];
        this.jogadorAtual = "X";
        this.gameOver = false;
        this.atualizarTabuleiro();
    }

    // Incrementar pontos no ranking
    incrementarPontos(jogador) {
        if (jogador === 1) {
            let player1Wins = parseInt(document.getElementById("player1Wins").textContent.split(": ")[1]);
            document.getElementById("player1Wins").textContent = `Jogador 1: ${player1Wins + 1}`;
        } else if (jogador === 2) {
            let player2Wins = parseInt(document.getElementById("player2Wins").textContent.split(": ")[1]);
            document.getElementById("player2Wins").textContent = `Jogador 2: ${player2Wins + 1}`;
        }
    }
}

let jogo;

function startGame(mode) {
    jogo = new JogoDaVelha(mode);
    document.getElementById("gameBoard").style.display = "block";
    document.getElementById("gameMode").style.display = "none";
    document.getElementById("restartButton").style.display = "inline";
}

function makeMove(pos) {
    jogo.fazerJogada(pos);
}

function resetGame() {
    jogo.resetarJogo();
    document.getElementById("gameBoard").style.display = "none";
    document.getElementById("gameMode").style.display = "block";
    document.getElementById("restartButton").style.display = "none";
}
