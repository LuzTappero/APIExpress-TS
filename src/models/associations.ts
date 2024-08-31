import { CategoryModel } from "./categoryModel";
import { ProductModel } from "./productModel";
import { ProfileModel } from "./profileModel";
import UserModel  from "./userModel"

CategoryModel.hasMany(ProductModel, { foreignKey: 'category_id' });
ProductModel.belongsTo(CategoryModel, { foreignKey: 'category_id' });

UserModel.hasOne(ProfileModel, { foreignKey: 'user_id', onDelete: 'CASCADE' });
ProfileModel.belongsTo(UserModel, { foreignKey: 'user_id' });

export { CategoryModel, ProductModel, ProfileModel, UserModel };