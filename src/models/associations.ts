import { CategoryModel } from "./categoryModel";
import { ProductModel } from "./productModel";

CategoryModel.hasMany(ProductModel, { foreignKey: 'category_id' });
ProductModel.belongsTo(CategoryModel, { foreignKey: 'category_id' });

export { CategoryModel, ProductModel };