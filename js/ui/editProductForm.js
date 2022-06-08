import { url } from "../tools/api.js";
import { getToken } from "../tools/storage.js";
import { displayMessage } from "../components/displayMessage.js";
import { deleteButton } from "./deleteProduct.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
//const productUrl = url + "/" + id;
const productUrl = "http://localhost:1337/api/products" + "/" + id;

const token = getToken();
if (!token) {
  location.href = "/login.html";
}

const editForm = document.querySelector(".edit__form");
const newProductId = document.querySelector("#editProduct__id");
const newTitleInput = document.querySelector("#editProduct__title");
const newPriceInput = document.querySelector("#editProduct__price");
const newDescriptionInput = document.querySelector("#editProduct__description");
const editFeaturedProduct = document.querySelector(".form-check-input");

const messageContainer = document.querySelector(".message__container");
const loader = document.querySelector(".loader");

let isFeatured = false;
(async function () {
  try {
    const response = await fetch(productUrl);
    const productDetails = await response.json();

    console.log(productDetails);

    //document.title = `Shoemania - Edit product: ${productDetails.data.attributes.name}`;

    newProductId.value = productDetails.data.id;
    newTitleInput.value = productDetails.data.attributes.name;
    newPriceInput.value = productDetails.data.attributes.price;
    newDescriptionInput.value = productDetails.data.attributes.description;
    editFeaturedProduct.checked = productDetails.data.attributes.featured;

    deleteButton(productDetails.id);
  } catch (error) {
    displayMessage("error", "Unexpected error", ".message__container");
    console.log(error);
  } finally {
    loader.style.display = "none";
  }
})();

editFeaturedProduct.addEventListener("click", changeState);

function changeState() {
  editFeaturedProduct.toggleAttribute("checked");
  if (editFeaturedProduct.hasAttribute("checked", true) === true) {
    isFeatured = true;
  } else if (editFeaturedProduct.hasAttribute("checked", true) === false) {
    isFeatured = false;
  }
}

editForm.addEventListener("submit", submitChanges);

function submitChanges() {
  event.preventDefault();

  messageContainer.innerHTML = "";

  const titleError = document.querySelector(".editProduct__title--error");
  const priceError = document.querySelector(".editProduct__price--error");
  const descriptionError = document.querySelector(
    ".editProduct__description--error"
  );

  const titleValue = newTitleInput.value.trim();
  const priceValue = newPriceInput.value.trim();
  const description = newDescriptionInput.value.trim();
  const featuredValue = isFeatured;

  if (titleValue.length >= 6) {
    titleError.style.display = "none";
  } else {
    titleError.style.display = "block";
    titleError.innerHTML = "Title must be minimum 6 characters";
  }

  if (priceValue.length >= 2) {
    priceError.style.display = "none";
  } else {
    priceError.style.display = "block";
    priceError.innerHTML = "Price must be minimum 2 digits";
  }

  if (description.length >= 10) {
    descriptionError.style.display = "none";
  } else {
    descriptionError.style.display = "block";
    descriptionError.innerHTML = "Description must be minimum 10 characters";
  }

  if (
    titleValue.length >= 6 &&
    priceValue.length >= 1 &&
    description.length >= 10
  ) {
    updateProduct(titleValue, priceValue, description, featuredValue);
  } else {
    return displayMessage(
      "warning",
      "Please enter valid values",
      ".message__container"
    );
  }
}

async function updateProduct(
  titleValue,
  priceValue,
  description,
  featuredValue
) {
  const url = productUrl;

  const data = JSON.stringify({
    name: titleValue,
    price: priceValue,
    description: description,
    featured: featuredValue,
  });
  const token = getToken();

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.updated_at) {
      displayMessage("success", "Product updated", ".message__container");
    }

    if (json.error) {
      displayMessage("error", json.error, ".message__container");
    }
  } catch (error) {
    console.log(error);
  }
}
