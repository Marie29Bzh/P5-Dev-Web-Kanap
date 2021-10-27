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
    if (!ls[product._id]) ls[product._id] = {product, qty:0};
    ls[product._id].qty +=qty;
    updateLocalStorage();
}

function updateLocalStorage(){
    localStorage.setItem("panier", JSON.stringify(ls));
}