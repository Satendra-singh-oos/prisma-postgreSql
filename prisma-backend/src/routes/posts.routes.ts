import { Router } from "express";
import {
  getAllPost,
  getAllPostWithTitleAndPublished,
  getPostByUserName,
  getPostByUserNameOnlyTitle,
  aggregationPost,
  groupAggregationPost,
  sortTheOutput,
  paginationOffsetOfPost,
  paginationCursorOfPost,
  transaction,
} from "../controllers/posts.controller";

const router = Router();

router.route("/getAllPost").get(getAllPost);
router.route("/getAllPostWith").get(getAllPostWithTitleAndPublished);
router.route("/getPostByUserName").get(getPostByUserName);
router.route("/getPostByUserNameOnlyTitle").get(getPostByUserNameOnlyTitle);
router.route("/aggregation").get(aggregationPost);
router.route("/groupAggregation").get(groupAggregationPost);
router.route("/sort").get(sortTheOutput);
router.route("/paginationOffset").get(paginationOffsetOfPost);
router.route("/paginationCursor").get(paginationCursorOfPost);
router.route("/transaction").post(transaction);
export default router;
