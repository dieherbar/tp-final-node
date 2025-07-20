// services
import { getAllProducts } from '../models/product.model.js'

const getAll = async () => {
  return await getAllProducts();
};

export default { getAll };