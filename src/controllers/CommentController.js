import CommentService from "../services/CommentServices.js";

class CommentController {
  // [POST] /api/v1/comment/post
  async post(req, res, next) {
    try {
      const comments = await CommentService.postComment(req.body);
      res.status(200).json(comments);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: error.message });
      next();
    }
  }

  // [GET] /api/v1/comment/get-all-by-artId/:artId
  async getAllByArtId(req, res, next) {
    try {
      const { artId } = req.params;
      const comments = await CommentService.getAllByArtId(artId);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }
}

export default new CommentController();
