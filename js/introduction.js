const startAnimation = document.querySelector("#startBtn");
const rocket = document.querySelector("#rocket");

startAnimation.addEventListener("click", () => {
  rocket.style.animationPlayState = "running";
});

function startCountdown() {
  var count = document.getElementById("count");
  var startBtn = document.getElementById("startBtn");
  var next = document.getElementById("next");
  count.innerHTML = "5";
  var countdown = 6;
  var countdownInterval = setInterval(function () {
    countdown--;
    document.getElementById("clickSound").play();
    count.innerHTML = countdown.toString();
    if (countdown == 1) {
      clearInterval(countdownInterval);
      setTimeout(function () {
        count.style.display = "none";
        startBtn.style.display = "none";
      }, 1000);
      setTimeout(function () {
        next.style.display = "block";
      }, 16000);
    }
  }, 1000);
}
setTimeout(function () {
  document.getElementById("startBtn").style.display = 'block';
  document.getElementById("startBtn").style.cursor = 'pointer';
}, 16000);