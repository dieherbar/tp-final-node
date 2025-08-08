import express from "express";
import { join, __dirname } from "./utils/index.js";
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
import { db } from "./config/db-connection.js";
import cors from "cors";
import corsMiddleware from "./middlewares/cors.middleware.js";
import bodyParser from "body-parser";
import serviceRoutes from "./routes/service.route.js";
import { xmlParser } from './utils/xmlBodyParser.js';
import soapRoutes from './routes/soap.route.js';


//settings
const app = express();
app.set("PORT", 3000);

// middlewares
app.use(express.json());
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(xmlParser);
app.use(express.text({ type: '*/xml' }));// Middleware para parsear cuerpos XML agregado el 07/08/25


//routes
app.use("/",serviceRoutes);
app.use('/ws', soapRoutes); // Por ejemplo: POST /ws/soap
app.get("/", (req, res) => {
  res.json({ title: "Home Page" });
});
app.get('/api/msg', (req, res) => {
    res.status(200).json({ message: "Soy un json desde /api index" });
});
app.use("/auth", authRoutes);
app.use("/api", productRoutes);

// Middleware para manejar errores 404 
app.use((req, res) => {
  res.status(404).send('Recurso no encontrado o ruta inválida'); 
});

//listeners
const PORT = process.env.PORT;
app.listen(app.get("PORT"), () => {
//app.listen(PORT, () => { sugerido por chat gpt
  console.log(`Server on port http://localhost:${app.get("PORT")}`);
});
