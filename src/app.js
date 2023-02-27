import express  from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import handlebars from "express-handlebars";
import ProductManager from "./ProductManager.js";
import viewRouter from "./routes/views.router.js";
import {Server} from "socket.io";
import __dirname from "./util.js";






const productManager = new ProductManager();
const products = await productManager.getProducts();



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use (express.static(__dirname+`/public`));

//Handlebars
//Uso de vista de plantillas
app.engine (`handlebars`, handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');       //nos permite usar response.render() el handlebars



///delegamos, le decimos a app que use el router
app.use(`/api/products`, productsRouter); 
app.use(`/api/cart`, cartRouter);  
app.use(`/api/views`, viewRouter);

// console.log(products);
const SERVER_PORT = 8080;


const httpServer = app.listen(8080, () => {
    console.log("Server listening in " + SERVER_PORT);
    // console.log(__dirname + "/views");
});





const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
  console.log(`Nuevo cliente conectado: ${socket.id}`);
  socket.emit('message', 'New user say "Hello"');

  socket.on('disconnect', () => {
    console.log('El cliente se ha desconectado');
  });

  socket.on('update-products', async () => {
    console.log('Actualizando productos...');
    const updatedProducts = await productManager.getProducts();
    socket.emit('updated-products', updatedProducts);
  });
});
   
