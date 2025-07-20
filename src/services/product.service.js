// services
import { getAllProducts, getProductById, saveProduct, updateProduct } from '../models/product.model.js'

const getAll = async () => {
  return await getAllProducts();
};

const getById = async (id) => {
  return await getProductById(id);
}

const addProduct = async (product) => {
  return await saveProduct(product);
}

const updateProd = async (id, product) => {
  return await updateProduct(id, product);
}

export default { getAll,getById, addProduct, updateProd };