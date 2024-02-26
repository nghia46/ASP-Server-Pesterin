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
}

export default new ArtController();
