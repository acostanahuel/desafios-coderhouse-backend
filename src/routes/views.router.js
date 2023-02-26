import { Router } from 'express'
import ProductManager from '../ProductManager.js';
import {Server} from 'socket.io';



const router = Router();
const productManager = new ProductManager();
const Products = await productManager.getProducts();
const socket = new Server 

//Muestro toda la lista de productos
router.get(`/`,(req, res)=>{
  res.render('home',{products:Products})
});

router.get (`/realtimeproducts`, (req, res) =>{
  res.render ('realTimeProducts',{products:Products});
});


router.post('/realtimeproducts', async (request, response) => {

  try {
    let newProd = request.body;
   let productCreated = await productManager.addProduct(newProd.title,newProd.description, newProd.price, newProd.thumbnail, newProd.stock, newProd.category, newProd.status);

    if (productCreated.success) {
      socket.emit("update-products", await productManager.getProducts());
      response.status(201).send(productCreated.message);
    } else {
      response.status(400).send(productCreated.message);
    }
  } catch (error) {
    console.error(error);
    response.status(500).send("Error al procesar la solicitud");
  }
});





export default router;
