import { Comment } from "../models/Comment.js";
import { ReplyComment } from "../models/ReplyComment.js";
import NotificationServices from "./NotificationServices.js";
class ReplyCommentService {
  async postReplyComment(replyCommentData) {
    try {
      const { commentId, ...replyCommentFields } = replyCommentData;
      // Find the existing ReplyComments document by commentId
      let existingReplyComments = await ReplyComment.findOne({ commentId });
      let foundComment = null;

      if (!existingReplyComments) {
        existingReplyComments = await ReplyComment.create({
          commentId,
          replyComments: [
            {
              author: replyCommentFields.author,
              replyContent: replyCommentFields.replyContent,
              createdAt: new Date(),
            },
          ],
        });
        
        //Send notification
        await NotificationServices.sendReplyCommentNotificationToFollowers(
          replyCommentData
        );

        //Find comment inside comments in Comment Collection
        const commentsArray = await Comment.find({});
        for (const comments of commentsArray) {
          for (const comment of comments.comments) {
            if (comment._id.toString() === commentId) {
              foundComment = comment;
              break;
            }
          }
          if (foundComment) {
            break;
          }
        }
        //Update replies inside Comments collection
        if (foundComment) {
          await Comment.findOneAndUpdate(
            { "comments._id": foundComment._id },
            { $set: { "comments.$.replies": existingReplyComments._id } },
            { new: true }
          );
        }
      } else {
        // Push new comment into reply comments with same comment ID
        const newReplyComment = {
          author: replyCommentFields.author,
          replyContent: replyCommentFields.replyContent,
          createdAt: new Date(),
        };

        existingReplyComments.replyComments.push(newReplyComment);
        //Send notification
        await NotificationServices.sendReplyCommentNotificationToFollowers(
          replyCommentData
        );
        await existingReplyComments.save();
      }

      return existingReplyComments.replyComments;
    } catch (error) {
      throw error;
    }
  }

  async getReplyCommentByCommentId(commentId) {
    try {
      const comments = await ReplyComment.findOne({
        commentId: commentId,
      });
      if (!comments) {
        return [];
      }
      const sortedReplyComments = comments.replyComments.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      return sortedReplyComments;
    } catch (error) {
      throw error;
    }
  }
}
export default new ReplyCommentService();
