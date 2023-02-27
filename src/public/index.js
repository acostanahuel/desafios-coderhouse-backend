const socket = io();

socket.on('updated-products', (products) => {
  // Aquí puedes actualizar la lista de productos en el cliente con la lista actualizada enviada desde el servidor
  console.log('Productos actualizados:', products);
});


///o tengo también esta opcion 2
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
  console.log("new user conected:", socket.id);

  socket.on("client:message", data => {
    console.log("-------------------------------")
    console.log(data);
  });

  socket.on('client:products', async (data) => {
    console.log(data)
    socket.emit('server:productsUp', await productManager.products)

    socket.on('client:productsUpdate', async (data) => {
      if (JSON.stringify(data) !== JSON.stringify(await productManager.products)) {
      socket.emit('server:updateProducts', false);
      } else {
        console.log("Productos iguales, no hay actualizaciones")
        socket.emit('server:updateProducts', true)
      }
    });
  });
});
