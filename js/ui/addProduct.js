import { displayMessage } from "../components/displayMessage.js";
import { getToken } from "../tools/storage.js";
import { baseUrl } from "../tools/api.js";

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const featuredCheck = document.querySelector("#featured");
const image = document.querySelector("#image");
const message = document.querySelector(".message__container");

const url = baseUrl + "products";

// Validates if the featured checkbox is checked
let isItFeatured = false;
function validateCheckBox() {
  featuredCheck.onclick = () => {
    featuredCheck.toggleAttribute("checked", true);
    if (!featuredCheck.checked) {
      isItFeatured = false;
    } else if (featuredCheck.checked) {
      isItFeatured = true;
    }
  };
}
validateCheckBox();

form.addEventListener("submit", submitForm);

async function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const formData = new FormData();

  //form validation
  const newTitleError = document.querySelector(".addProduct__title--error");
  const newPriceError = document.querySelector(".addProduct__price--error");
  const newDescriptionError = document.querySelector(
    ".addProduct__description--error"
  );
  const newImageError = document.querySelector(".addProduct__image--error");

  if (titleValue.length >= 6) {
    newTitleError.style.display = "none";
  } else {
    newTitleError.style.display = "block";
    newTitleError.innerHTML = "Title must be minimum 6 characters";
  }

  if (isNaN(priceValue) === false) {
    newPriceError.style.display = "none";
  } else {
    newPriceError.style.display = "block";
    newPriceError.innerHTML = "Price must be numbers";
  }

  if (descriptionValue.length >= 10) {
    newDescriptionError.style.display = "none";
  } else {
    newDescriptionError.style.display = "block";
    newDescriptionError.innerHTML =
      "Description must be minimum 10 characters.";
  }

  if (image.files.length === 1) {
    newImageError.style.display = "none";
  } else {
    newImageError.style.display = "block";
    newImageError.innerHTML = "Please select an image for upload";
  }

  if (
    titleValue.length >= 6 &&
    image.files.length === 1 &&
    isNaN(priceValue) === false &&
    descriptionValue.length >= 10
  ) {
    const file = image.files[0];

    const data = {
      title: titleValue,
      price: priceValue,
      description: descriptionValue,
      featured: isItFeatured,
    };
    formData.append("files.image", file, file.name);
    formData.append("data", JSON.stringify(data));

    const token = getToken();

    const options = {
      method: "POST",
      body: formData,
      headers: {
        //"Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        displayMessage(
          "success",
          "Product successfully created",
          ".message__container"
        );
        form.reset();
      }
    } catch (error) {
      console.log(error);
      displayMessage("error", "An error occured", ".message__container");
    }
  } else {
    return displayMessage(
      "warning",
      "Please supply proper values",
      ".message__container"
    );
  }
}
