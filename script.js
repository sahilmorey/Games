let bets = { red: 0, yellow: 0, green: 0 };
let timeLeft = 15;
let userBets = 0;
let userSelections = [];

const timerElement = document.getElementById('time');
const messageElement = document.getElementById('message');

document.querySelectorAll('.color-btn').forEach(button => {
    button.addEventListener('click', () => {
        if (userBets < 2 && !userSelections.includes(button.dataset.color)) {
            userSelections.push(button.dataset.color);
            bets[button.dataset.color]++;
            userBets++;
            button.disabled = true;
        } else {
            alert("You can only place two bets and can't choose the same color twice.");
        }
    });
});

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}s`;
        if (timeLeft === 10) {
            messageElement.textContent = "Place your bets!";
        }
        if (timeLeft === 5) {
            messageElement.textContent = "Bets are closed. Calculating results...";
        }
        if (timeLeft === 0) {
            showResult();
        }
    }
}

function showResult() {
    const leastBetColor = Object.keys(bets).reduce((a, b) => bets[a] < bets[b] ? a : b);
    messageElement.textContent = `The result is: ${leastBetColor}!`;
    setTimeout(resetGame, 5000);
}

function resetGame() {
    bets = { red: 0, yellow: 0, green: 0 };
    timeLeft = 15;
    userBets = 0;
    userSelections = [];
    document.querySelectorAll('.color-btn').forEach(button => button.disabled = false);
    messageElement.textContent = "";
    timerElement.textContent = `Time: ${timeLeft}s`;
    startGame();
}

function startGame() {
    setInterval(updateTimer, 1000);
}

startGame();