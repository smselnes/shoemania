import { addToFavourites } from "../ui/toggleFavourites.js";
import { getExistingFavourites } from "../tools/existingFavourites.js";

const favourites = getExistingFavourites();

export function createDetails(json) {
  const detailsContainer = document.querySelector("#productInformation");

  document.title = `Shoemania - ${json.data.attributes.name}`;

  detailsContainer.innerHTML = `
  <div class="card details__card mb-3">
    <div class="row g-0">
      <div class="col-sm-6">
        <img src=${json.data.attributes.image.data.attributes.url} alt="" class="img-fluid rounded-start">
        </div>
        <div class="col-sm-6">
          <div class="card-body">
            <i class="favourite far fa-bookmark mb-3 float-end fs-1" data-id="${json.data.id}" data-name="${json.data.attributes.name}" data-price="${json.data.attributes.price}" data-image="${json.data.attributes.image.data.attributes.url}"></i></br>
            <span class="alert-add col-8 col-sm-6 mx-auto m-2 text-center"></span>
            <span class="alert-remove col-8 col-sm-6 mx-auto m-2 text-center"></span> </br>
            <h1 class="card-title">${json.data.attributes.name}</h1>
            <p class="card-text details__description">Description: </br> ${json.data.attributes.description}</p>
            <h5 class="text-end">Price: ${json.data.attributes.price}$</h5>
          </div>
        </div> 
      </div>
    </div>`;

  /*  */

  const doesFavouriteExist = favourites.find(function (fav) {
    return parseInt(fav.id) === json.id;
  });

  const favouriteIcon = document.querySelector(".favourite");

  if (doesFavouriteExist) {
    favouriteIcon.classList.add("fa");
  }

  addToFavourites();
}
