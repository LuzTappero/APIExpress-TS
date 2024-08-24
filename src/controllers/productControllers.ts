import { Request, Response, NextFunction } from "express";
import { ProductModel } from "../models/productModel";


class ProductController {
  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const products = await ProductModel.findAll();
      if (!products){
        throw new Error ('Product not found')
      }
      res.status(200).json({ message: "Get all products", products });
    } catch (error) {
      next(error);
    }
  }
  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id
      const product = await ProductModel.findByPk(id);
      if (!product) {
        throw new Error ('Product not found')
      }
      res.status(200).json({ message: "Get products by Id ", product });
    } catch (error) {
      next(error);
    }
  }
  static async getByName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const name = req.params.name;
    try {
      const product = await ProductModel.findOne({ where: { name } });
      if (!product) {
        res.status(404).json({ message: "Product not found" });
      }
      res.status(201).json({ message: "Get products by name ", name });
    } catch (error) {
      next(error);
    }
  }
  static async getByCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const category_id = parseInt(req.params.id);
    try {
      const product = await ProductModel.findOne({ where: { category_id } });
      if (!product) {
        res.status(404).json({ message: "Product not found" });
      }
      res.status(201).json({ message: "Get products by category ", product });
    } catch (error) {
      next(error);
    }
  }
  static async getByPrice(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const price = req.params.price;
    try {
      const product = await ProductModel.findOne({ where: { price } });
      if (!product) {
        res.status(404).json({ message: "Product not found" });
      }
      res.status(201).json({ message: "Get products by price ", product });
    } catch (error) {
      next(error);
    }
  }
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, description, price, imagePath, category_id } = req.body;
      await ProductModel.create({
        name,
        description,
        price,
        imagePath,
        category_id,
      });
      res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
      next(error);
    }
  }
  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const product = await ProductModel.findByPk(id);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      await product.destroy();
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { name, description, price, imagePath, category_id } = req.body;
      const [updated] = await ProductModel.update(
        { name, description, price, imagePath, category_id },
        {
          where: { product_id: id },
        }
      );
      if (updated) {
        res.status(200).json({ message: "Product updated successfully" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      next(error);
    }
  }
}
export default ProductController;
