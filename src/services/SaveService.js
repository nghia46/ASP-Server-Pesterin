import { Save } from "../models/Save.js";

class SaveService {
  async saveArtToBookmark(userID, artID) {
    try {
      const save = await Save.create({ userID, artID });
      // tìm thông tin về Art khi có artId

      return save;
    } catch (err) {
      throw err;
    }
  }

  async removeArtFromBookmark(userID, artID) {
    try {
      const result = await Save.findOneAndDelete({ userID, artID });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new SaveService();
