import { getExistingFavourites } from "../tools/existingFavourites.js";
import { saveFavourites } from "../tools/existingFavourites.js";

export function addToFavourites() {
  const favouriteButton = document.querySelector(".favourite");
  const addToCart = document.querySelector(".alert-add");
  const removeFromCart = document.querySelector(".alert-remove");

  favouriteButton.addEventListener("click", () => {
    favouriteButton.classList.toggle("fa");

    if (favouriteButton.classList.contains("fa")) {
      addToCart.style.display = "block";
      addToCart.innerHTML = "Added to cart";
      removeFromCart.style.display = "none";
    } else if (favouriteButton.classList.contains("far")) {
      removeFromCart.style.display = "block";
      removeFromCart.innerHTML = "Removed from cart";
      addToCart.style.display = "none";
    }

    const storageId = favouriteButton.dataset.id;
    const storageName = favouriteButton.dataset.name;
    const storedPrice = favouriteButton.dataset.price;
    const storedImage = favouriteButton.dataset.image;

    const currentFavourites = getExistingFavourites();

    const productExists = currentFavourites.find(function (faves) {
      return faves.id === storageId;
    });

    if (!productExists) {
      const storedProduct = {
        id: storageId,
        name: storageName,
        price: storedPrice,
        image: storedImage,
      };
      currentFavourites.push(storedProduct);
      saveFavourites(currentFavourites);
    } else {
      const newFavourites = currentFavourites.filter(
        (faves) => faves.id !== storageId
      );
      saveFavourites(newFavourites);
    }
  });
}
