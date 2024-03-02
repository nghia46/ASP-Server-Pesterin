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

  async getAllArtworkByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const artWorks = await ArtServices.getAllArtworkByUserId(userId);
      res.status(200).json(artWorks);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  //[POST] /api/v1/post/add-reaction/:artId
  async addReaction(req, res, next) {
    try {
      const { artId } = req.params;
      const { userId, reaction } = req.body;
      const art = await ArtServices.addReaction(artId, userId, reaction);
      res.status(200).json(art);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  //[GET] /api/v1/post/get-reaction/:artId/:userId
  async getReactionByUserIdAndArtId(req, res, next) {
    try {
      const { artId, userId } = req.params;
      const reaction = await ArtServices.getReactionByUserIdAndArtId(
        userId,
        artId
      );
      res.status(200).json(reaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  //[GET] /api/v1/post/get-reaction-length/:artId/
  async getReactionLength(req, res) {
    try {
      const { artId } = req.params;
      if (!artId) {
        return res.status(400).json({ error: "Invalid artId" });
      }
      const reactionLength = await ArtServices.getReactionLength(artId);
      res.status(200).json({ reactionLength });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new ArtController();
