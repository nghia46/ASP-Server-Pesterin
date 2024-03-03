import { Art } from "../models/Art.js";
import { Category } from "../models/Category.js";
import { Reaction } from "../models/Reaction.js";
import NotificationService from "./NotificationServices.js";

class ArtServices {
  async searchArtByTag(tagArtwork) {
    try {
      const tagOfArt = await Art.findOne({ tag: tagArtwork });
      if (!tagOfArt) {
        throw new Error("Tag not found");
      }
      return tagOfArt;
    } catch (error) {
      throw error;
    }
  }

  async postArt(newArt) {
    try {
      const category = await Category.findOne({ name: newArt.tag });

      if (category) {
        newArt.categoryId = category._id;
      } else {
        console.warn(`No category found for tag: ${newArt.tag}`);
      }
      var newArtwork = new Art(newArt);

      // Send notification to followers using NotificationService
      await NotificationService.sendPostArtworkNotificationToFollowers(
        newArtwork
      );
      await newArtwork.save();

      return newArtwork;
    } catch (error) {
      throw error;
    }
  }

  async getAllArtwork() {
    try {
      const artWorks = await Art.find({});
      const sortedArtworks = artWorks.sort((a, b) => b.createdAt - a.createdAt);
      return sortedArtworks;
    } catch (error) {
      throw error;
    }
  }

  async getAllArtworkById(id) {
    try {
      const artWork = await Art.findOne({ _id: id });
      return artWork;
    } catch (error) {
      throw error;
    }
  }

  async getAllArtworkByUserId(userId) {
    try {
      const artWorks = await Art.find({ userId: userId });
      const sortedArtworks = artWorks.sort((a, b) => b.createdAt - a.createdAt);
      return sortedArtworks;
    } catch (error) {
      throw error;
    }
  }

  async addReaction(artId, userId, reaction) {
    try {
      // Validate reaction
      if (
        reaction !== null &&
        !["Love", "Haha", "Thank", "GoodIdea", "Wow"].includes(reaction)
      ) {
        throw new Error("Invalid reaction");
      }

      // Check if the art exists
      const art = await Art.findById(artId);
      if (!art) {
        throw new Error("Art not found");
      }

      // Check if a Reactions document already exists for this art
      let reactions = await Reaction.findOne({ artId });

      // If no Reactions document exists, create one
      if (!reactions) {
        reactions = new Reaction({ artId });
      }

      // Check if the user has already reacted
      const existingReaction = reactions.reactions.find(
        (react) => react.userId.toString() === userId
      );

      if (existingReaction) {
        // Update the existing reaction or remove it if the new reaction is null
        if (reaction === null) {
          reactions.reactions.pull({ userId });
        } else {
          existingReaction.reaction = reaction;
        }
      } else if (reaction !== null) {
        // Add a new interaction if the reaction is not null
        reactions.reactions.push({ userId, reaction });
      }

      await reactions.save();

      // Update the Art document with the reference to the Reactions document
      art.reactionId = reactions._id;
      await art.save();

      return art;
    } catch (error) {
      throw error;
    }
  }

  async getReactionByUserIdAndArtId(userId, artId) {
    try {
      const artReaction = await Reaction.findOne({ artId: artId });

      if (!artReaction) {
        return null;
      }

      const reaction = artReaction.reactions.find(
        (r) => r.userId && r.userId.equals(userId)
      );
      return reaction;
    } catch (error) {
      throw error;
    }
  }

  async getReactionLength(artId) {
    try {
      const reactions = await Reaction.findOne({ artId });

      if (!reactions) {
        return 0;
      }

      return reactions.reactions.length;
    } catch (error) {
      throw error;
    }
  }
}
export default new ArtServices();
