import { Router } from "express";

import {
  getAllUserWithName,
  getAllUserWithStartEndName,
  getOnlyUserWhosAllPostArePublished,
  getPublishedPostUser,
  creatUser,
  creatMultipleUser,
  updateUser,
  updateManyUser,
  updateUserUpsert,
  delelteUser,
  delelteManyUser,
} from "../controllers/users.controller";

const router = Router();

router.route("/getAllUserByName").get(getAllUserWithName);
router.route("/getAllUserNameStartWithEndWith").get(getAllUserWithStartEndName);
router
  .route("/getOnlyUserWhosAllPostArePublished")
  .get(getOnlyUserWhosAllPostArePublished);
router.route("/getPublishedPostUser").get(getPublishedPostUser);
router.route("/creatUser").post(creatUser);
router.route("/creatMultipleUser").post(creatMultipleUser);
router.route("/updateUser").put(updateUser);
router.route("/updateManyUser").put(updateManyUser);
router.route("/updateUserUpsert").put(updateUserUpsert);
router.route("/delelteUser").delete(delelteUser);
router.route("/delelteManyUser").delete(delelteManyUser);

export default router;
