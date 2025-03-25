let score = 0;
let multiplier = 1;
const clickButton = document.getElementById("clickButton");
const scoreDisplay = document.getElementById("score");
const messageDisplay = document.getElementById("message");
const backgroundMusic = document.getElementById("backgroundMusic");
const clickSound = document.getElementById("clickSound");
const metaSound = document.getElementById("metaSound");
const toggleMusicButton = document.getElementById("toggleMusic");
const bonSprite = document.getElementById("bonSprite");

// Ativar a música apenas após interação
let musicStarted = false;
clickButton.addEventListener("click", () => {
    if (!musicStarted) {
        backgroundMusic.play();
        musicStarted = true;
    }
});

toggleMusicButton.addEventListener("click", () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        toggleMusicButton.textContent = "Pausar Música";
    } else {
        backgroundMusic.pause();
        toggleMusicButton.textContent = "Tocar Música";
    }
    updateBonSprite();
});

// Estrutura otimizada para as mensagens
const milestones = {
    10: "Boa campeão!",
    50: "Ótimo!",
    100: "'cem' palavras pra dizer!",
    250: "Calma jogador (Ó¬Ò)",
    500: "Bebe uma água desculpado",
    1000: "Você está precisando de terapia",
    5000: "Ou um psicólogo",
    10000: "PARA PELA MOR DE DEUS!",
    50000: "Tu tá vivo ainda?",
    100000: "Muitos pontos você ein?",
    500000: "Determinação!",
    1000000: "Olá, você tem vida não?",
};

clickButton.addEventListener("click", function() {
    clickSound.play();
    score += 1 * multiplier;
    scoreDisplay.textContent = "Pontos: " + score;

    if (milestones[score]) {
        messageDisplay.textContent = milestones[score];
        metaSound.play();
        multiplier = 2;
        setTimeout(() => {
            multiplier = 1;
        }, 10000);
        
        if (score === 500000) {
            messageDisplay.style.color = "red";
        } else if (score === 1000000) {
            messageDisplay.style.color = "gold";
            setTimeout(() => {
                score = 0;
                scoreDisplay.textContent = "Pontos: 0";
                messageDisplay.textContent = "";
                messageDisplay.style.color = "black";
            }, 3000);
        }
    }
    
    // Animação no botão ao clicar
    clickButton.style.transform = "scale(0.9)";
    setTimeout(() => {
        clickButton.style.transform = "scale(1)";
    }, 100);
});

// Atualiza a sprite do personagem
function updateBonSprite() {
    if (!backgroundMusic.paused) {
        let frame = 1;
        bonSprite.src = `bon-dancando${frame}.png`;
        let danceInterval = setInterval(() => {
            frame = frame % 12 + 1;
            bonSprite.src = `bon-dancando${frame}.png`;
            if (backgroundMusic.paused) {
                clearInterval(danceInterval);
                bonSprite.src = "bon-parado.png";
            }
        }, 200);
    } else {
        bonSprite.src = "bon-parado.png";
    }
}
