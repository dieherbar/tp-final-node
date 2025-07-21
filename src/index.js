import express from "express";
import { join, __dirname } from "./utils/index.js";
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
import { db } from "./config/db-connection.js";
import cors from "cors";
import corsMiddleware from "./middlewares/cors.middleware.js";
import bodyParser from "body-parser";

//settings
const app = express();
app.set("PORT", 3000);

// middlewares
app.use(express.json());
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

//routes
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
app.listen(app.get("PORT"), () => {
  console.log(`Server on port http://localhost:${app.get("PORT")}`);
});
