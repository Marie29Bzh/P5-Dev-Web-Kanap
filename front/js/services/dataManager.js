const server = "http://localhost:3000/api/products";

const ls = localStorage.getItem("panier") === null? {} : JSON.parse(localStorage.getItem("panier"));

async function getAllProducts(){
    const response = await fetch(server);
    const data = await response.json();
    return data;
}

/**
 * récupère les informations d'un produit
 *
 * @param   {String}  idProduct  l'id du prodiut
 *
 * @return  {Promise.<Object>}   les caractéristiques d'un produit
 */
async function getProduct(idProduct){
    const response = await fetch(server+"/"+idProduct);
    return await response.json();
}

function addToCart(product, qty, color){
    const ref = product._id+"_"+color;
    if (!ls[ref]) {
        ls[ref] = {...product, qty:0, color};
        delete ls[ref].altTxt;
        delete ls[ref].description;
        delete ls[ref].colors;
    }
    ls[ref].qty +=qty;
    updateLocalStorage();
}

function updateProductQuantity(id, qty){
    ls[id].qty = qty;
    updateLocalStorage();
}

function updateLocalStorage(){
    localStorage.setItem("panier", JSON.stringify(ls));
}

function getCart(){
    return JSON.parse(localStorage.getItem("panier"));
}

function removeProduct(id){
    delete ls[id];
    updateLocalStorage();
}

/**
 * envoi la commande au serveur
 *
 * @param   {Object}  contact  [contact description]
 * @param   {String}  contact.address
 *
 * @return  {Promise.<void>}           change de page une fois la validation reçue
 */
async function sendOrder(contact){
    const products = [];
    Object.keys(getCart()).forEach(ref=>{
        products.push(ref.split("_")[0]);
    })
    const order = {
        products,
        contact
    };
    const response = await fetch(server+"/order",{
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(order)
    });
    const data = await response.json();
    localStorage.clear();
    window.location.href = "./confirmation.html?"+data.orderId;
}