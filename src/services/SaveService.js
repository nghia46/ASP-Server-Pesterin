import { Save } from "../models/Save.js";
import { User } from "../models/User.js";
class SaveService {
  async saveArtToBookmark(userID, artID) {
    try {
      let save = await Save.findOne({ userID });

      if (!save) {
        // If there's no existing Save document for the user, create a new one
        save = new Save({
          userID,
          arts: [{ artID }],
        });
        await save.save();

        // Update the User model with the saveID
        await User.findByIdAndUpdate(userID, { saveId: save._id });
      } else {
        // If there's an existing Save document, add the new artID to the arts array
        save.arts.push({ artID });
        await save.save();
      }

      return save;
    } catch (error) {
      console.error("Error saving artwork:", error);
      throw error;
    }
  }

  async getAllArtIDsForUser(userId) {
    try {
      const save = await Save.findOne({ userID: userId });

      if (!save) {
        return [];
      }

      const artIDs = save.arts.map((art) => art.artID.toString());
      return artIDs;
    } catch (error) {
      throw error;
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
