import React, { useState } from "react";
import { getCategories, getPosts } from "./api";
import { Header } from "./components/header";
import { UrlForm } from "./components/urlForm";
import { CategoryForm } from "./components/categoryForm";
import { PostsForm } from "./components/postsForm";
import { DisplayMarkup } from "./components/displayMarkup";
import { Feed, PostCollection } from "../functions/src/models";
import { scroll } from "./utils";
import "./styles/App.css";

function App() {
  const [feeds, setFeeds] = useState<Array<Feed>>([]);
  const [posts, setPosts] = useState<Array<PostCollection>>([]);
  const [selectedPosts, setSelectedPosts] = useState<Array<PostCollection>>([]);

  const handleSubmitUrls = async (urls: Array<string>) => {
    const { data } = await getCategories({ feeds: urls });
    setFeeds(data);
    scroll();
  };

  const handleSubmitFeeds = async (feedList: Array<Feed>) => {
    const { data } = await getPosts({ feeds: feedList });
    setPosts(data);
    scroll();
  };

  const handleSubmitCategories = async (selected: Array<PostCollection>) => {
    setSelectedPosts(selected);
  };

  return (
    <div className="App">
      <Header />
      <UrlForm onSubmit={handleSubmitUrls} />
      <CategoryForm onSubmit={handleSubmitFeeds} feeds={feeds} />
      <PostsForm onSubmit={handleSubmitCategories} posts={posts} />
      <DisplayMarkup posts={selectedPosts} />
    </div>
  );
}

export default App;
