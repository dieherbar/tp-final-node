//router
import { Router } from "express";
import productController from '../controllers/product.controller.js'

const router = Router()


router.get('/products',productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products/create', productController.saveProduct);
router.patch('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);





export default router