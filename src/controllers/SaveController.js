import saveService from "../services/SaveService.js";

class SaveController {
  async saveArtToBookmark(req, res) {
    try {
      const data = await saveService.saveArtToBookmark(req.body.userID, req.body.artID);
      res.status(201).json({ message: "Success" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new SaveController();
