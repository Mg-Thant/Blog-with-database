// const posts = [];
const Post = require("../models/posts");

exports.createPost = (request, response) => {
  const { title, description, photo } = request.body;
  // posts.push({ title, description, id: Math.random(), photo });
  const post = new Post(title, description, photo);
  post
    .setPost()
    .then(() => {
      response.redirect("/")
    })
    .catch((err) => console.log(err));
};

exports.renderCreatePage = (request, response) => {
  // response.sendFile(path.join(__dirname, "..", "views", "createpost.html"));
  response.render("createpost", { title: "Post create" });
};

exports.getPosts = (request, response) => {
  // __dirname = project's rootfolder
  // response.sendFile("./views/homepage.html", { root : __dirname})
  // response.sendFile(path.join(__dirname, "..", "views", "homepage.html"));
  Post.getAllPost()
    .then(([rows]) => {
      console.log(rows);
      response.render("home", {
        title: "Ejs",
        postsArr: rows,
      });
    })
    .catch((err) => console.log(err));
  // expressDay-1/views/homepage.html
};

exports.getPost = (request, response) => {
  const id = request.params.id;
  // const post = posts.find((post) => post.id == id);
  Post.getSinglePost(id)
    .then(([row]) => {
      console.log(row);
      response.render("details", {
        title: "Details Page",
        post: row[0],
      });
    })
    .catch((err) => console.log(err));
};
