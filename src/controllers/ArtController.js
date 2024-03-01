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
      const newArtwork = await ArtServices.postArt(newArt);
      res.status(200).json(newArtwork);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  async getAllArtwork(req, res, next) {
    try {
      const artWorks = await ArtServices.getAllArtwork();
      res.status(200).json(artWorks);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  async getAllArtworkById(req, res, next) {
    try {
      const { id } = req.params;
      const artWork = await ArtServices.getAllArtworkById(id);
      res.status(200).json(artWork);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }
}

export default new ArtController();
