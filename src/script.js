const button = document.getElementById("reactionButton");
const message = document.getElementById("message");
const reactionTimeDisplay = document.getElementById("reactionTime");
const averageTimeDisplay = document.getElementById("averageTime");

let reactionTime = null;
let startTime = null;
let averageTime = 0;
let attempts = 0;
let waitTime = 0;

button.addEventListener("click", handleClick);

function startGame() {
    button.disabled = false;
    button.style.backgroundColor = "lightgrey";
    message.textContent = "Подождите, когда кнопка станет зеленой...";
    reactionTime = null;

    // Случайное время от 2 до 5 секунд
    waitTime = Math.floor(Math.random() * 3000) + 2000;

    // Меняем цвет кнопки через случайное время
    setTimeout(() => {
        button.style.backgroundColor = "green";
        startTime = new Date().getTime();
    }, waitTime);
}

function handleClick() {
    if (button.style.backgroundColor === "green") {
        const endTime = new Date().getTime();
        reactionTime = endTime - startTime;
        reactionTimeDisplay.textContent = `Время реакции: ${reactionTime} мс`;

        // Обновляем среднее время
        attempts++;
        averageTime = ((averageTime * (attempts - 1)) + reactionTime) / attempts;
        averageTime = averageTime.toFixed(2);
        averageTimeDisplay.textContent = `Среднее время: ${averageTime} мс`;

        message.textContent = `Время реакции: ${reactionTime} мс`;
    } else {
        message.textContent = "Слишком рано!";
    }

    // Задержка перед началом новой игры
    setTimeout(startGame, 1500);
}

startGame();
