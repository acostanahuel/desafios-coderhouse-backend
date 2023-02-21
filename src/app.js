import express  from "express";
import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"
import handlebars from "express-handlebars"
import {Server} from "socket.io"
import ProductManager from './ProductManager.js';



const productManager = new ProductManager();
const products = await productManager.getProducts();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Handlebars
//Uso de vista de plantillas
app.engine (`handlebars`, handlebars.engine());
// app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');       //nos permite usar response.render() el handlebars



///delegamos, le decimos a app que use el router
app.use(`/api/products`, productsRouter); 
app.use(`/api/cart`, cartRouter);  

app.get(`/`,(req, res)=>{
    res.render('home',{products:products[11]})
  })

console.log(products);
const SERVER_PORT = 8081;

const httpServer = app.listen(8081, () => {
    console.log("Server listening in " + SERVER_PORT);
    // console.log(__dirname + "/views");
});

const socketServer = new Server(httpServer);
