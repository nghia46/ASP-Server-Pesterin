import ArtServices from "../services/ArtServices.js";

class ArtController {
  async searchArtwork(req, res, next) {
    try {
      const { tag } = req.params;
      const art = await ArtServices.searchArtByTag(tag);
      res.status(200).json(art);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }
  async addArtwork(req, res, next) {
    try {
      const newArt = req.body;
      await ArtServices.postArt(newArt);
      res.status(200).json(newArt);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }
}

export default new ArtController();
