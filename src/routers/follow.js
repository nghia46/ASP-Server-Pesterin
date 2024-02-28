import express from "express";
import FollowController from "../controllers/FollowController.js";

const router = express.Router();

router.post('/createFollow/:followerId/:followingId', FollowController.create);
router.get('/getFollower/:followingId', FollowController.getFollower);
router.get('/getFollowing/:followerId', FollowController.getFollowing);
router.delete('/deleteFollow/:followerId/:followingId', FollowController.deleteFollow);

export default router;
