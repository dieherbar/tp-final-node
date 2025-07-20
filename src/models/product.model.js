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
        throw new Error("Error", error.message);
    }
}

export const saveProduct = async (product) => {
    try {
        const docRef = await addDoc(productCollection, product);
        return { id: docRef.id, ...product };
    } catch (error) {
        throw new Error("Error", error.message);
        
    }
}