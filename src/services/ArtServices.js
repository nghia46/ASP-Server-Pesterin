import { Art } from "../models/Art.js";

class ArtServices {
  async searchArtByTag(tagArtwork) {
    try {
        const tagOfArt = await Art.findOne({ tag: tagArtwork})
      if (!tags) {
        throw new Error("Tag not found");
      }
      return tagOfArt;
    } catch (error) {
        throw error;
    }
  }
}

export default new ArtServices();
