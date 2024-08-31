function main() {
  let contenedor = document.querySelector(".results");
  let template = document.querySelector("#results-item-template");
  const formEl = document.querySelector(".search-form");
  const apiProductsDefault = "https://api.mercadolibre.com/sites/MLA/search?category=MLA1648&limit=80"; 
  const apiProductsSearch = "https://api.mercadolibre.com/sites/MLA/search?q="; 

  fetch(apiProductsDefault)
    .then(response => response.json())
    .then(data => renderItems(data.results));

  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    const palabraABuscar = e.target.search.value;
    if (!palabraABuscar) return;
      fetch(apiProductsSearch + `${palabraABuscar}` + "&limit=10")
        .then(response => response.json())
        .then(data => renderItems(data.results));
  });
  
  // Funtion for render items
  const renderItems = (results)=>{
   for (const r of results) {
    const titleEl = template.content.querySelector(".results-item-title");
    titleEl.textContent = r.title;
    const conditionEl = template.content.querySelector(
      ".results-item-condition"
    );
    // Translate text of condition
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

    const clone = document.importNode(template.content, true); // After fill
     
    contenedor.appendChild(clone); // Take you order
}   
}
main();
