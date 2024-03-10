import ReplyCommentService from "../services/ReplyCommentService.js";

class ReplyCommentController {
  // [POST] /api/v1/replyComment/post
  async post(req, res, next) {
    try {
      const replyComments = await ReplyCommentService.postReplyComment(
        req.body
      );
      res.status(200).json(replyComments);
    } catch (error) {
      console.error("Error creating reply comment:", error);
      res.status(500).json({ error: error.message });
      next();
    }
  }

  // [GET] /api/v1/replyComment/get-all-by-commentId/:commentId
  async getAllReplyByCommentId(req, res, next) {
    const { commentId } = req.params;
    try {
      const replyComment = await ReplyCommentService.getReplyCommentByCommentId(
        commentId
      );
      if (!replyComment) {
        res.status(404).json({ message: "Reply comment not found" });
      } else {
        res.status(200).json(replyComment);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
      next(error);
    }
  }
}

export default new ReplyCommentController();
