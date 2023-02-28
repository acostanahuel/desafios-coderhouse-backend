const productsContainer = document.querySelector('#products-container');
const socket = io();
socket.emit('client:message', 'HI I AM A NEW USER CONNECTED');

setInterval(() => {
  socket.emit('client:products');}, 3000);

socket.on('server:products', async (Products) => {
  addProductsToRealTime(Products);
});

const addProductsToRealTime = (products) => {
  let html = '';
  products.forEach(p => {
    html += `
    <div class="col-lg-4 d-flex justify-content-center align-item-center p-5">
    <div class="card shadow" style="width: 18rem;">
      <img src="${p.thumbnail}" class="card-img-top" alt="thumbnail: ${p.thumbnail}">
      <div class="card-body">
        <h5 class="card-title">Title: ${p.title}</h5>
        <p class="card-text">Description: ${p.description}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Price: ${p.price}</li>
        <li class="list-group-item">Status: ${p.status}</li>
        <li class="list-group-item">Category: ${p.category}</li>
      </ul>
    </div>
  </div>`
    productsContainer.innerHTML = html;
  });
};
