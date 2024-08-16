import express from "express";
import ProductController from "../controllers/productControllers";
const productRoutes = express.Router();
ProductController;
import validateProduct from "../middlewares/productValidator";

productRoutes.get("/", ProductController.getAll);
productRoutes.get("/:id", ProductController.getById);
productRoutes.get("/name/:name", ProductController.getByName);
productRoutes.get("/category/:category", ProductController.getByCategory);
productRoutes.get("/:price", ProductController.getByPrice);

productRoutes.post("/create", validateProduct, ProductController.create);

productRoutes.delete("/:id", ProductController.delete);
productRoutes.patch("/:id", ProductController.update);

export default productRoutes;
