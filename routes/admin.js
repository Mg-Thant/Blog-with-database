const express = require("express");

const router = express.Router();
const postController = require("../controllers/posts");

router.get("/create-post", postController.renderCreatePage);

router.post("/", postController.createPost);

router.post("/post/:postId", postController.deletePost);

router.get("/post-edit/:postId", postController.getOldData);
router.post("/post-edit", postController.updatePost);

module.exports = router;
