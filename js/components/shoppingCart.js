import { displayMessage } from "./displayMessage.js";
import { getExistingFavourites } from "../tools/existingFavourites.js";

const cartContainer = document.querySelector(".shoppingcart");
const loader = document.querySelector(".loader");

const addedProducts = getExistingFavourites();

if (addedProducts.length === 0) {
  displayMessage("notice", "You have no products in your cart.", ".message");
  loader.style.display = "none";
}

addedProducts.forEach((favourite) => {
  cartContainer.innerHTML += `
  <div class="card cart__product mb-3 col-md-10 col-lg-8 mx-auto">
    <div class="row g-0">
      <div class="col-sm-6 col-md-6">
        <img src=${favourite.image} class="cart__product--image img-fluid" alt="">
      </div>
      <div class="col-sm-6 col-md-6">
        <div class="card-body cart__card">
          <h4 class="card-title cart__card--title">${favourite.name}</h4>
          <p class="card-text cart__card--price">Price: ${favourite.price}$</p>
          <a href=productDetails.html?id=${favourite.id} class="button btn cart__card--link">back to details</a>
        </div>
      </div>
    </div>
  </div>`;
  loader.style.display = "none";

  let total = 0;
  for (let i = 0; i < addedProducts.length; i++) {
    const prices = addedProducts[i].price;
    total += JSON.parse(prices);
  }

  const totalPrice = document.querySelector(".totalCost");

  if (total === 0) {
    totalPrice.style.display = "none";
  } else {
    totalPrice.innerHTML = `<p class="text-decoration-underline m-2">Sum total: ${total}$</p>`;
  }
});
