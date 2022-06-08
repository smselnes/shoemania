import { displayMessage } from "./displayMessage.js";
import { url } from "../tools/api.js";

const featuredContainer = document.querySelector(".featured");

async function getFeaturedProducts() {
  try {
    const response = await fetch(url);
    const json = await response.json();
    const featProd = json.data;

    featProd.forEach(function (featuredProduct) {
      if (featuredProduct.attributes.featured) {
        featuredContainer.innerHTML += `
        <div class="featured__card card" style="width:15rem;">
        <img src=${featuredProduct.attributes.image.data.attributes.url} class="card-img-top" alt="">
          <div class="card-body">
            <h4 class="card-title">${featuredProduct.attributes.name}</h4>
            <h5 class="card-text">${featuredProduct.attributes.price}$</h5>
            <a type="button" class="button btn featured__link" href= "productDetails.html?id=${featuredProduct.id}">Details</a>
          </div>
        </div>`;
      }
    });
  } catch (error) {
    displayMessage(
      "error",
      "Could not show featured products at the moment",
      ".featured"
    );
    console.log(error);
  }
}
getFeaturedProducts();

/* 
featProd.forEach(function (featuredProduct) {
  if (featuredProduct.attributes.featured) {
    featuredContainer.innerHTML += `
    <div class="featured__card card" style="width:15rem;">
      <img src=http://localhost:1337${featuredProduct.image.url} class="card-img-top" alt="${featuredProduct.image.alternativeText}">
      <div class="card-body">
        <h4 class="card-title">${featuredProduct.title}</h4>
        <h5 class="card-text">${featuredProduct.price}$</h5>
        <a type="button" class="button btn featured__link" href= "productDetails.html?id=${featuredProduct.id}">Details</a>
      </div>
    </div>`;
  }
});
} catch (error) {
displayMessage(
  "error",
  "Could not show featured products at the moment",
  ".featured"
);
console.log(error);
}
}
getFeaturedProducts(); */
