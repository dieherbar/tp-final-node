//model
import { db } from '../config/db-connection.js';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';

const productCollection = collection(db, 'products');

export const getAllProducts = async () => {
    try {
        const productsList = await getDocs(productCollection);
        const products = [];
        productsList.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));

        return products;
    } catch (error) {
        throw new Error("Error: " + error.message);
    }
}

export const getProductById = async (id) => {
    //mejorar producto no encontrado, devolver error 500
    try {
        const productRef = doc(db, 'products', id);
        const productDoc = await getDoc(productRef);
        if (productDoc.exists()) {
            return { id: productDoc.id, ...productDoc.data() };
        } else {
            throw new Error("Producto no encontrado");
        }
    } catch (error) {
        throw new Error("Error: " + error.message);
    }
}

export const saveProduct = async (product) => {
    try {
        const docRef = await addDoc(productCollection, product);
        return { id: docRef.id, ...product };
    } catch (error) {
        throw new Error("Error: " + error.message);

    }
}

export const updateProduct = async (id, product) => {
    try {
        const productRef = doc(db, 'products', id);
        await updateDoc(productRef, product);
        const updatedDoc = await getDoc(productRef);
        return { id, ...updatedDoc.data() };
    } catch (error) {
        throw new Error("Error:", error.message);
    }
}