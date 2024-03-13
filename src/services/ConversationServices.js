import { Conversation } from "../models/Conversation.js";

class ConversationService {
  async newConversation(senderId, receiverId) {
    try {
      const existingConversation = await this.findConversation(
        senderId,
        receiverId
      );

      if (existingConversation) {
        const conversations = await this.getConversation(senderId);
        return { conversations, conversation: existingConversation };
      }

      const newConversation = new Conversation({
        members: [{ user_id: senderId }, { user_id: receiverId }],
      });
      const savedConversation = await newConversation.save();
      const newConversations = await this.getConversation(senderId);

      return {
        conversations: newConversations,
        conversation: savedConversation,
      };
    } catch (error) {
      console.error("Error new conversation", error);
      throw error;
    }
  }

  async findConversation(senderId, receiverId) {
    try {
      const conversation = await Conversation.findOne({
        members: {
          $all: [{ user_id: senderId }, { user_id: receiverId }],
        },
      });

      return conversation;
    } catch (error) {
      console.error("Error finding conversation", error);
      throw error;
    }
  }

  async getConversation(userId) {
    try {
      const conversations = await Conversation.find({
        members: { $in: { user_id: userId } },
      })
        .sort({ updatedAt: -1 })
        .exec();
      return conversations;
    } catch (error) {
      console.error("Error get conversation", error);
      throw error;
    }
  }

  async getConversationById(conversationId) {
    try {
      const conversation = await Conversation.findOne({ _id: conversationId });
      return conversation;
    } catch (error) {
      console.error("Error get conversation", error);
      throw error;
    }
  }
}

export default new ConversationService();
