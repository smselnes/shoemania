import { getToken } from "../tools/storage.js";
const adminLink = document.querySelector(".admin__link");

const token = getToken();

function giveAccessToAdmin() {
  if (token) {
    adminLink.classList.remove("disabled");
  }
}

giveAccessToAdmin();
