var usernameInput = document.getElementById("name");
var passwordInput = document.getElementById("pass");
var loginBtn = document.getElementById("submit-btn");
var errorMessagePass = document.getElementById("errorMessagePassword");
var errorMessageName = document.getElementById("errorMessageName");

function validateUsername(username) {
  var regex = /^[a-z0-9_]+$/;
  return regex.test(username);
}

loginBtn.addEventListener("click", function () {
  var username = usernameInput.value;
  var password = passwordInput.value;

  if (username === "" && password === "") {
    errorMessageName.innerText = "You need to fill username";
    errorMessageName.style.color = "red";
    errorMessagePass.innerText = "You need to fill password";
    errorMessagePass.style.color = "red";
    return;
  } else if (username === "") {
    errorMessageName.innerText = "You need to fill username";
    errorMessageName.style.color = "red";
    errorMessagePass.innerText = "";
    return;
  } else if (!validateUsername(username)) {
    errorMessageName.innerText = "Invalid Username.";
    errorMessageName.style.color = "red";
    errorMessagePass.innerText = "";
    return;
  } else if (password === "") {
    errorMessageName.innerText = "";
    errorMessagePass.innerText = "You need to fill password";
    errorMessagePass.style.color = "red";
    return;
  } else if (password === "xtech") {
    errorMessageName.innerText = "";
    errorMessagePass.style.display = "none";
    window.location.href = "./game.html?username=" + encodeURIComponent(username);
  } else {
    errorMessageName.innerText = "";
    errorMessagePass.innerText = "Incorrect password. Please try again.";
    errorMessagePass.style.color = "red";
  }
});

window.addEventListener('load', function () {
  setTimeout(function () {
    var audio = document.getElementById('audio');
    audio.play();
  }, 2500);
});