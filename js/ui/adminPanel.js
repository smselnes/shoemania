import { getUsername } from "../tools/storage.js";
import { getToken } from "../tools/storage.js";

const token = getToken();

if (!token) {
  location.href = "/login.html";
}

const welcome = document.querySelector(".welcome__message");
const logout = document.querySelector(".logout__button");

const username = getUsername();

welcome.innerHTML = `
<h1 class="my-2">Hello <span class="fs-1">${username}.</span></h1>
<h3>Feel free to add products or </br> 
  <a href="adminProducts.html" class="button btn m-3" type="button">edit products</a>
</h3>`;

logout.addEventListener("click", () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  location.href = "login.html";
});
