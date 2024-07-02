const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");

const sequelize = require("./utils/database");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const postRoutes = require("./routes/post");
const adminRoutes = require("./routes/admin");

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

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

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(8000);
  })
  .catch((err) => console.log(err));
