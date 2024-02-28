import CategoryServices from "../services/CategoryServices.js";


class CategoryController {
    async addCategory(req, res, next) {
      try {
        const addCategory = req.body;
        await CategoryServices.addNewCategories(addCategory);
        res.status(200).json("Category add successfully!",);
      } catch (error) {
        res.status(500).json({ error: error.message });
        next();
      }
    }
  }
  
  export default new CategoryController ();