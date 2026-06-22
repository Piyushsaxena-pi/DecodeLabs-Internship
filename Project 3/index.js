// Set the initial time in seconds (20 minutes = 1200 seconds)
const INITIAL_TIME = 20 * 60;
let timeLeft = INITIAL_TIME;
let timerId = null;

const display = document.querySelector(".js-timer");
const startBtn = document.querySelector(".js-start-button");
const resetBtn = document.querySelector(".js-reset-button");

// Formats seconds into MM:SS display format
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  display.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

// Handles the countdown interval logic
function tick() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    clearInterval(timerId);
    timerId = null;
    startBtn.textContent = "Start";
    startBtn.classList.remove("running");
    alert("Time is up!");
  }
}

// Starts or pauses the countdown
function toggleTimer() {
  if (timerId === null) {
    // Start the timer
    timerId = setInterval(tick, 1000);
    startBtn.textContent = "Pause";
    startBtn.classList.add("running");
  } else {
    // Pause the timer
    clearInterval(timerId);
    timerId = null;
    startBtn.textContent = "Start";
    startBtn.classList.remove("running");
  }
}

// Resets timer back to the default state
function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  timeLeft = INITIAL_TIME;
  updateDisplay();
  startBtn.textContent = "Start";
  startBtn.classList.remove("running");
}

// Event Listeners
startBtn.addEventListener("click", toggleTimer);
resetBtn.addEventListener("click", resetTimer);

// Initial display setup
updateDisplay();
