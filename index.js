const $start = document.querySelector("#start");
const $game = document.querySelector("#game");
const $time = document.querySelector("#time");
const $result = document.querySelector("#result");
const $timeHeader = document.querySelector("#time-header");
const $resultHeader = document.querySelector("#result-header");
const $gameTime = document.querySelector("#game-time");
let score = 0;
isGameStarted = false;

$start.addEventListener("click", startGame);
$game.addEventListener("click", handleBoxClick);
$gameTime.addEventListener("input", setGameTime);

function show($el) {
  $el.classList.remove("hide");
}

function hide($el) {
  $el.classList.add("hide");
}

function getRandom(min = 0, max) {
  return Math.floor(min + Math.random() * max);
}

function getRandomColor() {
  return `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(
    0,
    255
  )})`;
}

function startGame() {
  score = 0;
  setGameTime();
  $gameTime.setAttribute("disabled", "true");
  isGameStarted = true;
  $game.style.backgroundColor = "#fff";
  hide($start);

  const interval = setInterval(function() {
    let time = parseFloat($time.textContent);
    console.log("INTERVAL", $time.textContent);

    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  $gameTime.removeAttribute("disabled");
  show($start);
  $game.style.backgroundColor = "#ccc";
  $game.innerHTML = "";
  hide($timeHeader);
  show($resultHeader);
}

function setGameTime() {
  let time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
  show($timeHeader);
  hide($resultHeader);
}

function setGameScore() {
  $result.textContent = score.toString();
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }
  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

function renderBox() {
  $game.innerHTML = "";
  const box = document.createElement("div");
  let boxSize = getRandom(20, 100);
  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  maxLeft = gameSize.width - boxSize;
  let boxColor = getRandomColor();
  box.style.height = box.style.width = boxSize + `px`;
  box.style.position = "absolute";
  box.style.backgroundColor = boxColor;
  box.style.top = getRandom(0, maxTop) + "px";
  box.style.left = getRandom(0, maxLeft) + "px";
  box.style.cursor = "pointer";
  box.setAttribute("data-box", "true");

  $game.insertAdjacentElement("afterbegin", box);
}
