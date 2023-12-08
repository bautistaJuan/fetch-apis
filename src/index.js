function searchTheProduct(results) {
  console.log(results.sold_quantity);
  const contenedor = document.querySelector(".results");
  contenedor.innerHTML = ""; //hace un efecto refresh al buscar un nuevo producto
  const template = document.querySelector("#results-item-template");

  for (const r of results) {
    const titleEl = template.content.querySelector(".results-item-title");
    titleEl.textContent = r.title;
    const conditionEl = template.content.querySelector(
      ".results-item-condition"
    );
    // Solamente por que no queria hacerlo mas extenso
    if (r.condition == "new") {
      conditionEl.textContent = "Nuevo";
    } else {
      conditionEl.textContent = r.condition;
    }

    const priceEl = template.content.querySelector(".result-item-price");
    priceEl.textContent = r.price.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });

    const imgEl = template.content.querySelector(".results-item-img");
    imgEl.setAttribute("src", r.thumbnail);

    const clone = document.importNode(template.content, true);
    contenedor.appendChild(clone);
  }
}
function productsDefault(results) {
  const contenedor = document.querySelector(".results");
  contenedor.innerHTML = ""; //hace un efecto refresh al buscar un nuevo producto
  const template = document.querySelector("#results-item-template");

  for (const r of results) {
    const titleEl = template.content.querySelector(".results-item-title");
    titleEl.textContent = r.title;
    const conditionEl = template.content.querySelector(
      ".results-item-condition"
    );

    // Solamente por que no queria hacerlo mas extenso
    if (r.condition == "new") {
      conditionEl.textContent = "Nuevo";
    } else {
      conditionEl.textContent = r.condition;
    }
    const priceEl = template.content.querySelector(".result-item-price");
    priceEl.textContent = r.price.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });

    const imgEl = template.content.querySelector(".results-item-img");
    imgEl.setAttribute("src", r.thumbnail);

    const clone = document.importNode(template.content, true);
    contenedor.appendChild(clone);
  }
}

function main() {
  fetch(
    "https://api.mercadolibre.com/sites/MLA/search?category=MLA1648&limit=20"
  )
    .then(response => response.json())
    .then(data => productsDefault(data.results));

  const formEl = document.querySelector(".search-form");
  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    const palabraABuscar = e.target.search.value;
    if (palabraABuscar == "") {
      return false;
    } else {
      fetch(
        `https://api.mercadolibre.com/sites/MLA/search?q=${palabraABuscar}&limit=10`
      )
        .then(response => response.json())
        .then(data => searchTheProduct(data.results));
    }
  });
}
main();
