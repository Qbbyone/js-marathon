const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");

const colors = [
  "#00a65e",
  "#ffb500",
  "#941421",
  "#23b9ce",
  "#e36822",
  "#eb0a77",
  "#5a5276",
  "#fff59a",
];

let time = 0;
let score = 0;
let timer;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  //делегирование событий
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    console.log(event.target);
    createRandomCircle();
  } else {
    if (time > 0) {
      showMinusScore();
      --score;
      event.target.children[0].remove();
      setTimeout(() => {
        deleteMinusScore(event.target.lastChild);
        createRandomCircle();
      }, 300)
    }
  }
});

function showMinusScore() {
  const minusScore = document.createElement("h1");
  minusScore.innerText = "-1";
  minusScore.classList.add('minus-score')
  board.appendChild(minusScore);
}

function deleteMinusScore(el) {
  
  board.removeChild(el);
}

function startGame() {
  timer = setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    setTime(current);
  }
}

function setTime(value) {
  if (value < 10) {
    timeEl.innerHTML = `00:0${value}`;
  } else {
    timeEl.innerHTML = `00:${value}`;
  }
}

function finishGame() {
  clearInterval(timer);
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;

  const homeLink = document.createElement("a");
  homeLink.innerHTML = "Вернуться";
  homeLink.classList.add("home-link");
  board.append(homeLink);

  homeLink.addEventListener("click", () => {
    resetGame();
  });
}

function resetGame() {
  screens[1].classList.remove("up");
  board.innerHTML = "";
  timeEl.parentNode.classList.remove("hide");
  score = 0;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  // Random color
  const color = getRandomcolor();
  circle.style.background = color;

  const size = getRandomNumber(10, 50);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomcolor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
