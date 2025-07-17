const ageCalculate = () => {
  const today = new Date();
  const dateInput = document.getElementById("date-input");
  const error = document.getElementById("error-message");

  const dateValue = dateInput.value;
  const inputDate = new Date(dateValue);

  // Validaciones
  if (!dateValue) {
    error.textContent = "Por favor, ingresa una fecha.";
    resetVideoState();
    return;
  }

  if (isNaN(inputDate.getTime())) {
    displayResult("-", "-", "-");
    error.textContent = "Fecha inválida.";
    resetVideoState();
    return;
  }

  if (inputDate > today) {
    displayResult("-", "-", "-");
    error.textContent = "¡Esta persona no ha nacido!";
    resetVideoState();
    return;
  }

  error.textContent = "";

  // Calcular diferencia
  const diffTime = today.getTime() - inputDate.getTime();

  const years = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44)
  );
  const days = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24)
  );

  displayResult(days, months, years);
  cambiarFondoPorEdad(years);
};

const displayResult = (days, months, years) => {
  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
};

function cambiarFondoPorEdad(years) {
  let videoSrc = "";

  if (years >= 0 && years <= 2) {
    videoSrc = "media/baby.mp4";
  } else if (years >= 3 && years <= 12) {
    videoSrc = "media/child.mp4";
  } else if (years >= 13 && years <= 19) {
    videoSrc = "media/teenager.mp4";
  } else if (years >= 20 && years <= 35) {
    videoSrc = "media/young_adult.mp4";
  } else if (years >= 36 && years <= 59) {
    videoSrc = "media/adult.mp4";
  } else if (years >= 60 && years <= 94) {
    videoSrc = "media/elderly.mp4";
  } else if (years >= 95) {
    videoSrc = "media/dead.mp4";
  }

  const video = document.querySelector(".video-player__video");
  video.src = videoSrc;
  video.load();
  video.play();
  video.classList.add("fade-in-scale");

  const calculator = document.querySelector(".calculator");
  const videoPlayer = document.querySelector(".video-player");
  calculator.classList.add("calculator--shifted");
  videoPlayer.classList.add("video-player--visible");
}

function resetVideoState() {
  const calculator = document.querySelector(".calculator");
  const videoPlayer = document.querySelector(".video-player");
  const video = document.querySelector(".video-player__video");

  videoPlayer.classList.remove("video-player--visible");
  calculator.classList.remove("calculator--shifted");

  video.pause();
  video.removeAttribute("src");
  video.load();
}

document.getElementById("calc-age-btn").addEventListener("click", ageCalculate);
