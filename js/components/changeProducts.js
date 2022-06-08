import { url } from "../tools/api.js";
import { getToken } from "../tools/storage.js";

const token = getToken();
if (!token) {
  location.href = "/login.html";
}

const container = document.querySelector(".editProducts");
const loader = document.querySelector(".loader");

async function products() {
  try {
    const response = await fetch(url);
    const json = await response.json();
    const data = json.data;
    loader.style.display = "none";

    data.forEach(function (product) {
      console.log(product);
      container.innerHTML += `
      <div class="card details__card">
        <img src=${product.attributes.image.data.attributes.url} alt="" class="card-img-top">
          <div class="card-body">
            <h4>${product.attributes.name}</h4>
            <h5>${product.attributes.price}$</h5>
            <h6>Product id:${product.id}</h6>  
            <a type="button" href="editProduct.html?id=${product.id}"  class="button btn edit__icon fas fa-edit float-end m-2 p-2"></a>
          </div>
      </div>
      `;
    });
  } catch (error) {
    console.log(error);
  }
}

products();
