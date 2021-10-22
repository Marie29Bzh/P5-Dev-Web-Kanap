const server = "http://localhost:3000/api/products";


async function getAllProducts(){
    const response = await fetch(server);
    const data = await response.json();
    return data;
}

async function getProduct(idProduct){
    const response = await fetch(server+"/"+idProduct);
    return await response.json();
}