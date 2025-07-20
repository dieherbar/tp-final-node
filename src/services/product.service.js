// services
import { getAllProducts, saveProduct } from '../models/product.model.js'

const getAll = async () => {
  return await getAllProducts();
};

const addProduct = async (product) => {
  return await saveProduct(product);
}

export default { getAll, addProduct };