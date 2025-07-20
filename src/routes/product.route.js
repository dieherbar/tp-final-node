//router
import { Router } from "express";
import productController from '../controllers/product.controller.js'

const router = Router()


router.get('/products',productController.getProducts);
router.post('/products', productController.saveProduct);





export default router