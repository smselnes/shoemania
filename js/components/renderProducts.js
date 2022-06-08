export function renderProducts(products) {
  const container = document.querySelector(".products__collection");
  container.innerHTML = "";
  products.forEach(function (product) {
    if (!product.attributes.image.data) {
      container.innerHTML += `<div class="card product__card mx-auto" style="width: 20rem;">
          <img src="/images/placeholder-image.png" alt="image is missing for this product" class="card-img-top">
            <div class="card-body">
              <h4 class="card-title">${product.attributes.name}</h4>
              <h5 class="card-text">Price: ${product.attributes.price}$</h5>
              <a type="button" href="productDetails.html?id=${product.id}" class="btn button details__button">More details</a>
            </div>
        </div>`;
    } else {
      container.innerHTML += `<div class="card product__card mx-auto" style="width: 20rem;">
          <img src=${product.attributes.image.data.attributes.url} alt="" class="card-img-top">
            <div class="card-body">
              <h4 class="card-title">${product.attributes.name}</h4>
              <h5 class="card-text">Price: ${product.attributes.price}$</h5>
              <a type="button" href="productDetails.html?id=${product.id}" class="btn button details__button">More details</a>
            </div>
        </div>`;
    }
  });
}
