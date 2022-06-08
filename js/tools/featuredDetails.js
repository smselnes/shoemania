import { displayMessage } from "../components/displayMessage.js";
import { createDetails } from "../components/createDetails.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://sempro2.herokuapp.com/api/products/" + id + "?populate=*";

async function details() {
  try {
    const response = await fetch(url);
    const json = await response.json();
    createDetails(json);
  } catch (error) {
    displayMessage(
      "error",
      "An error occured",
      ".productInformation__container"
    );
    console.log(error);
  }
}
details();
