import express from "express";
import ProductController from "../controllers/productControllers";
import validateProduct from "../middlewares/productValidator";
const productRoutes = express.Router();
import upload from '../config/multerConfig'

productRoutes.get("/", ProductController.getAll);
productRoutes.get("/:id", ProductController.getById);
productRoutes.get("/name/:name", ProductController.getByName);
productRoutes.get("/category/:category", ProductController.getByCategory);
productRoutes.get("/:price", ProductController.getByPrice);

productRoutes.post("/create", validateProduct, upload.single('image'), ProductController.create);

productRoutes.delete("/:id", ProductController.delete);
productRoutes.patch("/:id",validateProduct, ProductController.update);

export default productRoutes;
