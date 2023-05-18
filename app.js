//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

let posts = [];

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Creating route
app.get("/", function (req, res) {
  res.render("home", {
    startContent: homeStartingContent,
    posts: posts,
  });
  // Line bellow console log our array to hyper
  // console.log(posts);
});
// This methode get the value from app.js and print it to the about.ejs using ejs template value
app.get("/about", function (req, res) {
  res.render("about", { aboutValue: aboutContent });
});
// This methode get the value from app.js and print it to the contact using ejs template value
app.get("/contact", function (req, res) {
  res.render("contact", { contactValue: contactContent });
});
// This methode return the value of compose.ejs into the server
app.get("/compose", function (req, res) {
  res.render("compose");
});
// This methode post the values inputed into the Title and post field of the field and return it
app.post("/compose", function (req, res) {
  const composeValue = {
    postTitle: req.body.postTitle,
    postPostSection: req.body.postPostSection,
  };
  // This line of code return it to the server
  // console.log(composeValue);
  // This line of code bellow send the value of post into the "posts array declared above".
  posts.push(composeValue);
  // res.redirect send our user back to the home page after
  res.redirect("/");
});

// Route parameters
app.get("/posts/:postName", function (req, res) {
  // console.log(req.params.postName);
  let requestTitle = req.params.postName;
  // The code bellow check if the store title match with the request by using /posts/+ "name of the title entered"
  posts.forEach(function (post) {
    let storeTitle = post.postTitle;
    if (storeTitle === requestTitle) {
      console.log("Match found");
    } else {
      return "Not a Match";
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
