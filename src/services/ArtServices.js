import { Art } from "../models/Art.js";
import { Category } from "../models/Category.js";

class ArtServices {
  async searchArtByTag(tagArtwork) {
    try {
      const tagOfArt = await Art.findOne({ tag: tagArtwork });
      if (!tagOfArt) {
        throw new Error("Tag not found");
      }
      return tagOfArt;
    } catch (error) {
      throw error;
    }
  }
  async postArt(newArt) {
    try {
      const category = await Category.findOne({ name: newArt.tag });

      if (category) {
        newArt.categoryId = category._id;
      } else {
        console.warn(`No category found for tag: ${newArt.tag}`);
      }
      var newArtwork = new Art(newArt);
      await newArtwork.save();
      return newArtwork;
    } catch (error) {
      throw error;
    }
  }

  async getAllArtwork() {
    try {
      const artWorks = await Art.find({});
      const sortedComments = artWorks.sort((a, b) => b.createdAt - a.createdAt);
      return sortedComments;
    } catch (error) {
      throw error;
    }
  }

  async getAllArtworkById(id) {
    try {
      const artWork = await Art.findOne({ _id: id });
      return artWork;
    } catch (error) {
      throw error;
    }
  }
}
export default new ArtServices();
