import { Art } from "../models/Art.js";

class ArtServices {
  async searchArtByTag(tagArtwork) {
    try {
<<<<<<< HEAD
      const tagOfArt = await Art.findOne({ tag: tagArtwork });
      if (!tagOfArt) {
=======
        const tagOfArt = await Art.findOne({ tag: tagArtwork})
      if (!tagOfArt){
>>>>>>> 56f022d7fe136bd1fb15c4c4b3c131e63195ad4a
        throw new Error("Tag not found");
      }
      return tagOfArt;
    } catch (error) {
      throw error;
    }
  }
  async postArt(newArt) {
    try {
      var newArtwork = new Art(newArt) 
      await newArtwork.save();
      return newArtwork;
    } catch (error) {
      throw error;
    }
  }
}
export default new ArtServices();
