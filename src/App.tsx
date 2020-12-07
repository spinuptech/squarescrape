import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { getCategories, getPosts, getUserData, updateUserData } from "./api";
import { Header } from "./components/header";
import { UrlForm } from "./components/urlForm";
import { CategoryForm } from "./components/categoryForm";
import { PostsForm } from "./components/postsForm";
import { DisplayMarkup } from "./components/displayMarkup";
import { Feed, PostCollection } from "../functions/src/models";
import { scroll } from "./utils";
import "./styles/App.css";

function App() {
  const [user, setUser] = useState<firebase.User>();
  const [urls, setUrls] = useState<Array<string>>();
  const [feeds, setFeeds] = useState<Array<Feed>>([]);
  const [posts, setPosts] = useState<Array<PostCollection>>([]);
  const [selectedPosts, setSelectedPosts] = useState<Array<PostCollection>>([]);

  // auth
  useEffect(() => {
    const auth = firebase.auth();
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      if (user) handleAuth(user);
    });
    auth.signInAnonymously();

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const handleAuth = async (user: firebase.User) => {
    const urls = await getUserData(user);
    setUrls(urls);
    setUser(user);
  };

  const handleSubmitUrls = async (urls: Array<string>) => {
    try {
      const { data } = await getCategories({ feeds: urls });
      setFeeds(data);
      scroll();
      if (user) await updateUserData(user, urls);
    } catch (error) {
      console.error(error);
    }
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
      <UrlForm onSubmit={handleSubmitUrls} urls={urls} />
      <CategoryForm onSubmit={handleSubmitFeeds} feeds={feeds} />
      <PostsForm onSubmit={handleSubmitCategories} posts={posts} />
      <DisplayMarkup posts={selectedPosts} />
    </div>
  );
}

export default App;
