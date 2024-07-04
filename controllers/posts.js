// const posts = [];
const Post = require("../models/posts");

exports.createPost = (request, response) => {
  const { title, description, photo } = request.body;
  Post.create({
    title,
    description,
    imgUrl: photo,
  })
    .then((result) => {
      console.log(result);
      response.redirect("/");
    })
    .catch((error) => console.log(error));
};

exports.renderCreatePage = (request, response) => {
  response.render("createpost", { title: "Post create" });
};

exports.getPosts = (request, response) => {
  Post.findAll({ order: [["createdAt", "desc"]] })
    .then((posts) => {
      response.render("home", {
        title: "Ejs",
        postsArr: posts,
      });
    })
    .catch((err) => console.log(err));
};

exports.getPost = (request, response) => {
  const id = request.params.id;
  Post.findOne({ where: { id } })
    .then((post) => {
      response.render("details", {
        title: "Details Page",
        post,
      });
    })
    .catch((err) => console.log(err));

  // Post.findByPk(id).then(post => { response.render("details", {
  //   title: "Details Page",
  //   post,
  // });}).catch(err => console.log(err))
};

exports.deletePost = (request, response) => {
  const postId = request.params.postId;
  Post.findByPk(postId)
    .then((post) => {
      if (!post) {
        response.redirect("/");
      }
      return post.destroy();
    })
    .then((result) => {
      response.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOldData = (request, response) => {
  const postId = request.params.postId;
  Post.findByPk(postId)
    .then((post) => {
      response.render("editPost", {
        title: `${post.title}`,
        post,
      });
    })
    .catch((err) => console.log(err));
};

exports.updatePost = (request, response) => {
  const { title, description, photo, post_id } = request.body;
  Post.findByPk(post_id)
    .then((post) => {
      (post.title = title),
        (post.description = description),
        (post.imgUrl = photo)
        return post.save()
    }).then(result => {
      response.redirect("/");
    })
    .catch((err) => console.log(err));
};
