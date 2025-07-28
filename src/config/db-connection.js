import { getFirestore } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import {envs} from './envs.js';

const initializeFirebase = () => {
  if (getApps().length > 0) {
    return getFirestore();
  }}

const firebaseConfig = {
  apiKey: envs.database.apikey,
  authDomain: envs.database.authDomain,
  projectId: envs.database.projectId,
  storageBucket: envs.database.storageBucket,
  messagingSenderId: envs.database.messagingSenderId,
  appId: envs.database.appId
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

//const db = getFirestore(app);
let db;
try {
  db = initializeFirebase();
  console.log('Firebase inicializado correctamente');
} catch (error) {
  console.error('Error al inicializar Firebase:', error);
  process.exit(1); // Termina la aplicación si Firebase no se inicializa
}
export {db};
