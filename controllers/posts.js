// const posts = [];
const Post = require("../models/posts");

exports.createPost = (request, response) => {
  const { title, description, photo } = request.body;
  Post.create({
    title,
    description,
    imgUrl : photo, 
  }).then((result) => {
    console.log(result);
    response.redirect("/")
  }).catch(error => console.log(error))
};

exports.renderCreatePage = (request, response) => {
  response.render("createpost", { title: "Post create" });
};

exports.getPosts = (request, response) => {
  Post.findAll().then(posts => {
    response.render("home", {
      title: "Ejs",
      postsArr: posts,
    });
  }).catch(err => console.log(err))
};

exports.getPost = (request, response) => {
  const id = request.params.id;
  Post.findOne({where : {id}}).then(post => { response.render("details", {
    title: "Details Page",
    post,
  });}).catch(err => console.log(err));

  // Post.findByPk(id).then(post => { response.render("details", {
  //   title: "Details Page",
  //   post,
  // });}).catch(err => console.log(err))
};
