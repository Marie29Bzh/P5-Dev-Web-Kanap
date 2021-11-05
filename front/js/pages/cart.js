const productsInCart = JSON.parse(localStorage.getItem("panier"));
let html = "";
let total = 0;
let nombreDeCanapes = 0;
for (const product of Object.values(productsInCart)){
    html += insertProduct(product)
}
document.getElementById("cart__items").innerHTML=html;

document.getElementById("totalQuantity").innerText = nombreDeCanapes;
document.getElementById("totalPrice").innerText = total;
/**
 * [insertProduct description]
 *
 * @param   {Object}  product  [product description]
 * @param   {Number}  product.price
 * @param   {String}  product.name
 * @param   {String}  product.imageUrl
 * @param   {String}  product._id
 * @param   {Number}  product.qty
 * @return  {String}           [return description]
 */
function insertProduct(product){
    total += product.price * product.qty;
    nombreDeCanapes+=product.qty;
    return `
    <article class="cart__item" data-id="${product._id}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${product.name}</h2>
                    <p>${product.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}" onchange="updateQuantity(this, '${product._id}')">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" onclick="removeFromCart('${product._id}')">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> 
    
    
    `
}

function updateQuantity(input, id){
    updateProductQuantity(id, parseInt(input.value));
    window.location.reload()
}

function removeFromCart(id){
    removeProduct(id);
    window.location.reload();
}