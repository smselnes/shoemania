import { renderProducts } from "../components/renderProducts.js";

export function searchProducts(json) {
  const search = document.querySelector(".search__form");

  search.onkeyup = function () {
    const searchValue = event.target.value.trim().toLowerCase();

    const filteredProducts = json.filter(function (filteredJson) {
      if (filteredJson.attributes.name.toLowerCase().startsWith(searchValue)) {
        return true;
      }
    });
    renderProducts(filteredProducts);
  };
}
