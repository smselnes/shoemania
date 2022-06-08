import { displayMessage } from "./displayMessage.js";

//const bannerUrl = "http://localhost:1337/api/banner?populate=*";
const bannerUrl = "https://sempro2.herokuapp.com/api/banner?populate=*";
const banner = document.querySelector(".banner");
const loader = document.querySelector(".loader");

async function getBanner() {
  try {
    const response = await fetch(bannerUrl);
    const json = await response.json();

    banner.innerHTML = `
    <img src=${json.data.attributes.hero_banner.data.attributes.url} alt ="" width="100%">`;

    loader.style.display = "none";
  } catch (error) {
    displayMessage("error", "Could not find introduction image", ".banner");
    console.log(error);
    loader.style.display = "none";
  }
}

getBanner();
