//controller
import productService from '../services/product.service.js'
const getProducts = async (req, res) => {
    try {
        const { category } = req.query;
        // Si hay categoría, filtra; si no, trae todos
        const products = category 
            ? await productService.getByCategory(category)
            : await productService.getAll();
        //const products = await productService.getAll();
        res.status(200).json({ message: "Lista de productos", payload: products });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getById(id);
        if (!product) {
            return res.status(404).json({
                message: "Producto no encontrado",
                payload: null
            });
        }
        res.status(200).json({ message: "Producto encontrado", payload: product });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}
//filtrar productos por categoria
 const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.query;
        console.log('Query params:', req.query);
        if (!category) {
            return res.status(400).json({ message: "Falta el parámetro de categoría" });
        }
        const products = await productService.getByCategory(category);
        res.status(200).json({ message: "Productos filtrados por categoría", payload: products });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
} 

const saveProduct = async (req, res) => {
    try {
        const product = req.body;
        const savedProduct = await productService.addProduct(product);
        res.status(201).json({ message: "Producto guardado", payload: savedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = req.body;
        const updatedProduct = await productService.updateProd(id, product);
        res.status(200).json({ message: "Producto actualizado", payload: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await productService.deleteProd(id);
        res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export default { getProducts, getProductById, getProductsByCategory, saveProduct, updateProduct, deleteProduct };