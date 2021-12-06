const productsInCart = getCart();
let html = "";
let total = 0;
let nombreDeCanapes = 0;
for (const product of Object.values(productsInCart)) {
    html += insertProduct(product)
}
document.getElementById("cart__items").innerHTML = html;

document.getElementById("totalQuantity").innerText = nombreDeCanapes;
document.getElementById("totalPrice").innerText = total;
/**
 * [insertProduct description]
 *
 * @param   {Object}  product           les caractéristiques d'un produit
 * @param   {Number}  product.price     le prix
 * @param   {String}  product.name
 * @param   {String}  product.imageUrl
 * @param   {String}  product._id
 * @param   {String}  product.color
 * @param   {Number}  product.qty
 * @return  {String}           [return description]
 */
function insertProduct(product) {
    total += product.price * product.qty;
    nombreDeCanapes += product.qty;
    const ref= product._id+"_"+product.color;
    return `
    <article class="cart__item" data-id="${ref}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${product.name} (${product.color})</h2>
                    <p>${product.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}" onchange="updateQuantity(this, '${ref}')">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" onclick="removeFromCart('${ref}')">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> 
    
    
    `
}

function updateQuantity(input, id) {
    updateProductQuantity(id, parseInt(input.value));
    window.location.reload()
}

function removeFromCart(id) {
    removeProduct(id);
    window.location.reload();
}

let myForm = document.getElementById('myForm');

myForm.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const contact = {};
    let error = false;
    const list = myForm.getElementsByTagName("input");
    for (const domInput of list) {
        if (domInput.type === "submit") continue;
        if(!domInput.checkValidity()) error= true;
        contact[domInput.id] = domInput.value
    };
    if (!error){
        sendOrder(contact);
    }
})


/*function showMsg(node, msg) {
    const myError = document.getElementById(node+"ErrorMsg");
    myError.innerHTML = msg;
    myError.style.color = 'red';
}*/