class Stopwatch {
  #elapsedTimeInSeconds = 0;
  #intervalId = null;

  start(callback = () => {}) {
    this.#intervalId = setInterval(() => {
      this.#elapsedTimeInSeconds++;
      callback();
    }, 1000);
  }

  stop(callback = () => {}) {
    clearInterval(this.#intervalId);
    callback();
  }

  reset(callback = () => {}) {
    this.#elapsedTimeInSeconds = 0;
    callback();
  }

  get elapsedTime() {
    return Stopwatch.formatTime(this.#elapsedTimeInSeconds);
  }

  static formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds - hours * 3600 - minutes * 60;

    return `${Stopwatch.zeroPadding(hours)}:${Stopwatch.zeroPadding(
      minutes
    )}:${Stopwatch.zeroPadding(seconds)}`;
  }

  static zeroPadding(originalNumber, desiredAmountDigits = 2) {
    let stringNumber = String(originalNumber);
    const zeroesRequired = desiredAmountDigits - stringNumber.length;
    if (zeroesRequired <= 0) {
      return stringNumber;
    } else {
      for (let count = 0; count < zeroesRequired; count++) {
        stringNumber = `0${stringNumber}`;
        return stringNumber;
      }
    }
  }
}
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const stopwatchDisplay = document.getElementById("stopwatch-display");
let count = 0;

function updateDisplay() {
  stopwatchDisplay.innerText = sw1.elapsedTime;
}

const sw1 = new Stopwatch();

startBtn.addEventListener("click", () => {
  try {
    if (count === 0) {
      sw1.start(updateDisplay);
      count++;
      notie.alert({ type: "success", text: "Cronômetro Iniciado com sucesso" });
    } else {
      throw new Error("Cronômetro já Iniciado");
    }
  } catch (error) {
    notie.alert({ type: "error", text: error.message });
  }
});
stopBtn.addEventListener("click", () => {
  count = 0;
  sw1.stop();
  notie.alert({ type: "success", text: "Cronômetro Parado com sucesso" });
});
resetBtn.addEventListener("click", () => {
  sw1.reset(updateDisplay);
  notie.alert({ type: "success", text: "Cronômetro reiniciado com sucesso" });
});
