window.onload = showIndex;

async function showIndex() {
    let html = "";
    const products = await getAllProducts();
    products.forEach(produit => {
        html += productCard(produit)
    });
    document.getElementById("items").innerHTML = html;
}

/**
 * génère le code html d'une fiche produit
 *
 * @param   {Object}  product  [product description]
 * @param   {Array.<String>}  product.colors   par exmple : [  "Blue", "White",  "Black" ],
 * @param   {String}  product._id   par exmple : "107fb5b75607497b96722bda5b504926",
 * @param   {String}  product.name   par exmple : "Kanap Sinopé",
 * @param   {Number}  product.price   par exmple : 1849,
 * @param   {String}  product.imageUrl   par exmple : "http://localhost:3000/images/kanap01.jpeg",
 * @param   {String}  product.description   par exmple : "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
 * @param   {String}  product.altTxt   par exmple : "Photo d'un canapé bleu, deux places"
 *
 * @return  {String}           [return description]
 */
function productCard(product) {
    const {_id, name, imageUrl, description, altTxt} = product;
    return `
<a href="./product.html?id=${_id}">
<article>
  <img src="${imageUrl}" alt="${altTxt}">
  <h3 class="productName">${name}</h3>
  <p class="productDescription">${description}</p>
</article>
</a>
    `;
}