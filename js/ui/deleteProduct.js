import { url } from "../tools/api.js";
import { getToken } from "../tools/storage.js";

export function deleteButton(id) {
  const container = document.querySelector(".deleteProduct__container");

  container.innerHTML = `<button class="delete__button button d-flex ms-auto">Delete Product</button>`;

  const deleteProduct = document.querySelector(".delete__button");

  deleteProduct.onclick = async function () {
    const confirmDelete = confirm("Do you really want to delete this product?");

    console.log(confirmDelete);
    if (confirmDelete) {
      const productUrl = url + "/" + id;

      console.log(productUrl);

      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(productUrl, options);
        const json = await response.json();

        location.href = "/adminProducts.html";
      } catch (error) {
        console.log(error);
      }
    }
  };
}
