import { Router } from "express";
import { checkLikeUser, toogleLike, totalLike } from "../controllers/likesController.js";

const likeRouter = Router();

likeRouter.post("/toogle", toogleLike);
likeRouter.get("/:postId/total", totalLike);
likeRouter.get("/:postId", checkLikeUser);

export default likeRouter;