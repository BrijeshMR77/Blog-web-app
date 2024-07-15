import express from "express";
const router = express.Router();

const posts = [];

router.get("/", (req, res) => {
  res.render("index", { posts });
});

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", (req, res) => {
  const { title, content } = req.body;
  const newPost = { title, content, date: new Date() };
  posts.push(newPost);
  res.redirect("/");
});

router.get("/edit/:id", (req, res) => {
  const post = posts[req.params.id];
  res.render("edit", { post, id: req.params.id });
});

router.post("/edit/:id", (req, res) => {
  const { title, content } = req.body;
  posts[req.params.id] = { title, content, date: new Date() };
  res.redirect("/");
});

router.post("/delete/:id", (req, res) => {
  posts.splice(req.params.id, 1);
  res.redirect("/");
});

export default router;
