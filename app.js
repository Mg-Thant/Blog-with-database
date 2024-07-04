const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");

const sequelize = require("./utils/database");

const Post = require("./models/post");
const User = require("./models/user");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const postRoutes = require("./routes/post");
const adminRoutes = require("./routes/admin");

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findByPk(1).then((user) => {
    req.user = user;
    console.log(user)
    next();
  }).catch(err => console.log(err));
});

app.use("/post", (request, response, next) => {
  console.log("I am post middleware");
  next();
});

app.use((request, response, next) => {
  console.log("I am parent middleware");
  next();
});

app.use("/admin", (request, response, next) => {
  console.log("Admin middleware approved!");
  next();
});

app.use(postRoutes);
app.use("/admin", adminRoutes);

Post.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Post);
sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
    // app.listen(8000);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Heron", email: "abcd@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    app.listen(8000);
  })
  .catch((err) => console.log(err));
