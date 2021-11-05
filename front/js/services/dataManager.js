const server = "http://localhost:3000/api/products";

const ls = localStorage.getItem("panier") === null? {} : JSON.parse(localStorage.getItem("panier"));

async function getAllProducts(){
    const response = await fetch(server);
    const data = await response.json();
    return data;
}

async function getProduct(idProduct){
    const response = await fetch(server+"/"+idProduct);
    return await response.json();
}

function addToCart(product, qty){
    if (!ls[product._id]) {
        ls[product._id] = {...product, qty:0};
        delete ls[product._id].altTxt;
        delete ls[product._id].description;
        delete ls[product._id].colors;
    }
    ls[product._id].qty +=qty;
    updateLocalStorage();
}

function updateProductQuantity(id, qty){
    ls[id].qty = qty;
    updateLocalStorage();
}

function updateLocalStorage(){
    localStorage.setItem("panier", JSON.stringify(ls));
}

function removeProduct(id){
    delete ls[id];
    updateLocalStorage();
}