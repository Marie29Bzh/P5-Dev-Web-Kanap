window.onload = showProduct;

let produit;

async function showProduct() {
  const idProduit = window.location.search.slice(4);
  produit = await getProduct(idProduit);
  console.log(produit);

  /*
  altTxt: "Photo d'un canapé jaune et noir, quattre places"
  colors: (2) ['Black/Yellow', 'Black/Red']
  description: "Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus."
  imageUrl: "http://localhost:3000/images/kanap02.jpeg"
  name: "Kanap Cyllène"
  price: 4499
  _id: "415b7cacb65d43b2b5c1ff70f3393ad1"

  */

  document.querySelector(".item__img").innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
  document.getElementById("title").innerText = produit.name;
  document.getElementById("price").innerText = produit.price;
  document.getElementById("description").innerText = produit.description;

  let options = "";
  produit.colors.forEach(couleur => {
    options += `<option value="${couleur}">${couleur}</option>`;
  });
  document.getElementById("colors").innerHTML += options;
}

document.getElementById("addToCart").addEventListener("click", function(evt) {
  const qty = parseInt(document.getElementById("quantity").value);
  if (qty === 0) return;
  addToCart({"_id":produit._id, "name":produit.name}, qty);
  evt.target.innerHTML = "Produit ajouté";
});
