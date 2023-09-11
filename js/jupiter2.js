// strange sound
window.onload = function () {
  setTimeout(function () {
    var audio = document.getElementById("strangeAudio");
    audio.play();
  }, 4000);
  setTimeout(function () {
    var alienSound = document.getElementById("alienVoice");
    alienSound.play();
  }, 9000);
};

// text animaiton
const dynamicText = document.querySelector(".dynamic-text");
const jupiter = document.getElementById("jupiter-hide");
const ufo = document.getElementById("ufo-hide");
const rocket = document.getElementById("rocket-hide");
const bgSound = document.getElementById("backgroundSound");
const textLoad = () => {
  setTimeout(() => {
    dynamicText.textContent = "Finally, you have successfully landed on Jupiter.";
  }, 0);
  setTimeout(() => {
    dynamicText.textContent = "As you came out, you heard a strange sound";
  }, 4100);
  setTimeout(() => {
    dynamicText.textContent = "Suddenly you see an alien and heard it's voice";
  }, 8000);
  setTimeout(() => {
    jupiter.style.display = "none";
    rocket.style.display = "none";
    ufo.style.display = "none";
  }, 11000);
  setTimeout(() => {
    dynamicText.textContent = "You can't understand the alien's language";
  }, 12000);
  setTimeout(() => {
    dynamicText.textContent = "If you want to understand the language of alien,";
    bgSound.play();
  }, 16000);
  setTimeout(() => {
    dynamicText.textContent = "You need to use modern machine";
  }, 20000);
  setTimeout(() => {
    dynamicText.textContent = "This is a modern machine";
  }, 24000);
  setTimeout(() => {
    dynamicText.textContent = "Click Modern Machine";
    dynamicText.style.display = "none";
  }, 28000);
}
textLoad();
setInterval(textLoad, 34000);

const machine = document.getElementById("machine");
machine.addEventListener("click", () => {
  machine.style.animationPlayState = "running";
})
function loginForm() {
  window.location.href = "./login.html";
}