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
}

export default new CategoryService();
