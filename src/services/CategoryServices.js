import { Category } from "../models/Category.js";

class CategoryService {
  async addNewCategories(models) {
    try {
      const categories = await Promise.all(
        models.map(async (model) => {
          const category = new Category(model);
          await category.save();
          return category;
        })
      );
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async searchCategoryByName(partialName) {
    try {
      const categories = await Category.find({
        name: { $regex: new RegExp(partialName, "i") },
      });
      const response = categories.map((category) => category.name);

      return response;
    } catch (error) {
      throw new Error(`Error searching category: ${error.message}`);
    }
  }
}

export default new CategoryService();
