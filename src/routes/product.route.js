//router
import { Router } from "express";
import productController from '../controllers/product.controller.js'
import { authentication } from "../middlewares/auth.middleware.js";

const router = Router()


router.get('/products',productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products/create', authentication, productController.saveProduct);
router.patch('/products/:id', productController.updateProduct);
router.delete('/products/:id', authentication, productController.deleteProduct);





export default router