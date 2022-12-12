import { displayMessage } from "../components/displayMessage.js";
import { saveToken, saveUser } from "../tools/storage.js";
const newUrl = "https://sempro2.herokuapp.com/api";
//const newUrl = "http://localhost:1337/api";
const emailInput = document.querySelector(".emailInput");
const emailError = document.querySelector(".email__error");
const passwordInput = document.querySelector(".passwordInput");
const passwordError = document.querySelector(".password__error");
const loginError = document.querySelector(".login__error");
const form = document.querySelector(".login");

form.addEventListener("submit", submitLoginForm);

function submitLoginForm() {
  event.preventDefault();

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (!emailValue) {
    emailError.style.display = "block";
    emailError.innerHTML = "Please enter valid email";
  } else if (emailValue) {
    emailError.style.display = "none";
  }

  if (passwordValue.length < 8) {
    passwordError.style.display = "block";
    passwordError.innerHTML = "Password must be minimum 8 characters.";
  } else {
    passwordError.style.display = "none";
  }

  if (emailValue.length < 5 || passwordValue.length < 8) {
    loginError.innerHTML = "Invalid input values";
  }

  loginToAdmin(emailValue, passwordValue);

  async function loginToAdmin(username, password) {
    const loginUrl = newUrl + "/auth/local";

    const data = JSON.stringify({ identifier: username, password: password });

    const options = {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(loginUrl, options);
      const json = await response.json();
      console.log(json);

      if (json.user) {
        console.log("Success");

        saveToken(json.jwt);
        saveUser(json.user);

        location.href = "admin.html";
      }

      if (json.error) {
        console.log(json.error);
      }
    } catch (error) {
      console.log(error);
      return displayMessage("warning", "an error occured", ".login__error");
    }
  }
}
