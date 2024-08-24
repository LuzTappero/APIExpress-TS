import express from "express";
import CategoryController from "../controllers/categoryControllers";
const categoryRoutes = express.Router();


categoryRoutes.get("/", CategoryController.getAll);
categoryRoutes.get("/id/:id", CategoryController.getById);
categoryRoutes.post("/create", CategoryController.create);

categoryRoutes.delete("/:id", CategoryController.deleteCategory);
categoryRoutes.patch("/:id", CategoryController.updatedCategory);

export default categoryRoutes;
