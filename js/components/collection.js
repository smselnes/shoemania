import { renderProducts } from "./renderProducts.js";
import { searchProducts } from "../ui/filterProducts.js";
const url = "http://localhost:1337/api/products?populate=*";

const loader = document.querySelector(".loader");

async function getProducts() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    renderProducts(json.data);
    loader.style.display = "none";
    searchProducts(json.data);
  } catch (error) {
    console.log(error);
  } finally {
  }
}
getProducts();
