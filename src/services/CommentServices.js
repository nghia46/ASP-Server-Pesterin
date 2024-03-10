import { Art } from "../models/Art.js";
import { Comment } from "../models/Comment.js";
import NotificationServices from "./NotificationServices.js";
class CommentService {
  async postComment(commentData) {
    try {
      const { artId, ...commentFields } = commentData;
      let existingComments = await Comment.findOne({ artId });

      if (!existingComments) {
        existingComments = await Comment.create({
          artId,
          comments: [
            {
              author: commentFields.author,
              commentContent: commentFields.commentContent,
              createdAt: new Date(),
              replies: null,
            },
          ],
        });
        await NotificationServices.sendCommentNotificationToFollowers(
          commentData
        );
        const art = await Art.findById(artId);
        if (!art) {
          throw new Error("Art not found when updating comments.");
        }
        art.commentId = existingComments._id;
        await art.save();
      } else {
        const newComment = {
          author: commentFields.author,
          commentContent: commentFields.commentContent,
          createdAt: new Date(),
          replies: null,
        };
        existingComments.comments.push(newComment);
        await NotificationServices.sendCommentNotificationToFollowers(
          commentData
        );
        await existingComments.save();
      }

      return existingComments.comments;
    } catch (error) {
      throw error;
    }
  }

  async getAllByArtId(artId) {
    try {
      const art = await Comment.findOne({ artId: artId });
      if (!art) {
        return [];
      }
      const sortedComments = art.comments.sort(
        (a, b) => b.createdAt - a.createdAt
      );

      return sortedComments;
    } catch (error) {
      throw error;
    }
  }
}

export default new CommentService();
