import express from "express";
import { join, __dirname } from "./utils/index.js";
import productRoutes from "./routes/product.route.js";
import { db } from "./config/db-connection.js";
import cors from "cors";
import { corsOptions } from "./middlewares/cors.middleware.js";
import bodyParser from "body-parser";

//settings
const app = express();
app.set("PORT", 3000);

// middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.json({ title: "Home Page" });
});
// app.use("/api/users", userRoutes);
app.use("/api", productRoutes);


//listeners
app.listen(app.get("PORT"), () => {
  console.log(`Server on port http://localhost:${app.get("PORT")}`);
});
