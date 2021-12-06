window.onload = showProduct;

let produit;

/**
 * rempli la fiche produit
 *
 * @return  {Promise.<void>}  met à jour la page
 */
async function showProduct() {
  const idProduit = window.location.search.slice(4);
  produit = await getProduct(idProduit);
  console.log(produit);

  document.querySelector(".item__img").innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
  document.getElementById("title").innerText = produit.name;
  document.getElementById("price").innerText = produit.price;
  document.getElementById("description").innerText = produit.description;
  document.title = produit.name;

  let options = "";
  produit.colors.forEach(couleur => {
    options += `<option value="${couleur}">${couleur}</option>`;
  });
  document.getElementById("colors").innerHTML += options;
}

document.getElementById("addToCart").addEventListener("click", function(evt) {
  const qty = parseInt(document.getElementById("quantity").value);
  if (qty === 0) return;
  const color = document.getElementById("colors").value;
  if (color === "") return;
  addToCart(produit, qty, color);
  evt.target.innerHTML = "Produit ajouté";
});
