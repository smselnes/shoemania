const url = "http://localhost:1337/api/products?populate=*";
const container = document.querySelector(".container");

async function getProducts() {
  const response = await fetch(url);
  const json = await response.json();
  const data = json.data;
  console.log(data);
  console.log(data[7].attributes.image.data.attributes.url);
  container.innerHTML = `
    <img src= "http://localhost:1337/api/products/data[7].attributes.image.data.attributes.url">`;
  data.forEach((product) => {
    console.log(product);
  });
}
getProducts();
