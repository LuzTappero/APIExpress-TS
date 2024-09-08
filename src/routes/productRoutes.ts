import express from "express";
import ProductController from "../controllers/productControllers";
import validateProduct from "../middlewares/productValidator";
import upload from '../config/multerConfig'
const productRoutes = express.Router();

productRoutes.get("/", ProductController.getAll);
productRoutes.get("/:id", ProductController.getById);

productRoutes.post("/create",upload.single('image'),validateProduct,ProductController.create);

productRoutes.delete("/:id", ProductController.delete);
productRoutes.patch("/:id", upload.single('image'),ProductController.update);

export default productRoutes;


