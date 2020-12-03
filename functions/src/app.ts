import express from "express";
import { getCategories, getPosts } from "./functions";
const app = express();
const cors = require("cors")({ origin: true });

app.use(cors);

app.get("/categories", async (req, res) => {
  const feeds = req.body.data.feeds;
  const categories = await getCategories(feeds);
  res.send(categories);
});
app.get("/posts", async (req, res) => {
  const feeds = req.body.data.feeds;
  const posts = await getPosts(feeds);
  res.send(posts);
});

export default app;
