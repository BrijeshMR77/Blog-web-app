import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let posts = [];

// Routes
app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/submit", (req, res) => {
  const newPost = {
    id: Date.now().toString(),
    title: req.body.title,
    content: req.body.content
  };
  posts.push(newPost);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    res.render("edit", { post });
  } else {
    res.redirect("/");
  }
});

app.post("/edit/:id", (req, res) => {
  const postIndex = posts.findIndex(p => p.id === req.params.id);
  if (postIndex !== -1) {
    posts[postIndex].title = req.body.title;
    posts[postIndex].content = req.body.content;
  }
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
