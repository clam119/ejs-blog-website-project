const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = 3000;
const posts = [];
const _ = require('lodash');

const homeStartingContent = 'Hey! Thank you for stopping by my EJS Blog Website. Feel free to head on over to "Create A Post" and write your first post';
const aboutContent = "Thank you for checking out my EJS Blog Website. This project was created with the intention of understanding templating & layouts using EJS and to build on the core fundamentals of Express' Backend Routing. In order to compose a post you will need to head on over to 'Create A Post' in the navigation bar and get started there!";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get('/', function (req, res) {
  res.render('home', {
    homeEjsContent: homeStartingContent,
    posts: posts,
  });
});

app.get('/post/:postName', function (req, res) {

  let requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {

    let storedTitle = _.lowerCase(post.title);
    let postTitle = post.title;
    let postText = post.text;

    if (storedTitle === requestedTitle) {
      res.render('post', {
        postTitle: postTitle,
        postText: postText,
      });
    }
  })

});

app.get('/about', function (req, res) {
  res.render('about', {
    aboutEjsContent: aboutContent
  });
});


app.get('/contact', function (req, res) {
  res.render('contact', {
    contactEjsContent: contactContent
  });
});

app.get('/compose', function (req, res) {
  res.render('compose', {
    newPostEjs: posts
  });
});

app.post('/compose', function (req, res) {
  const post = {
    title: req.body.titleComposePost,
    text: req.body.textComposePost
  };
  posts.push(post);
  res.redirect('/');
});

app.listen(process.env.PORT || port, function () {
  console.log("Server started on port 3000");
});