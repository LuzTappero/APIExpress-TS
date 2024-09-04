import express from "express";
import ProductController from "../controllers/productControllers";
import validateProduct from "../middlewares/productValidator";
const productRoutes = express.Router();
import upload from '../config/multerConfig'
import { verifyToken } from "../middlewares/verifyToken";

productRoutes.get("/", ProductController.getAll);
productRoutes.get("/:id", ProductController.getById);
productRoutes.post("/create", upload.single('image'), ProductController.create);

productRoutes.delete("/:id", ProductController.delete);
productRoutes.patch("/:id",validateProduct, ProductController.update);

export default productRoutes;
