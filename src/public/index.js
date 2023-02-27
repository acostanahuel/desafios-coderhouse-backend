const socket = io();

socket.on('updated-products', (products) => {
  // Aquí puedes actualizar la lista de productos en el cliente con la lista actualizada enviada desde el servidor
  console.log('Productos actualizados:', products);
});
