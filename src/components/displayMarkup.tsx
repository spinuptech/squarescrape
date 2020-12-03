import React, { useEffect, useState } from "react";
import { PostCollection } from "../../functions/src/models";
import { PostsTransformer } from "./postsTransformer";
import { style as common, colors } from "../styles/common";
import { scroll } from "../utils";

export const DisplayMarkup = (props: { posts: Array<PostCollection> }) => {
  const { posts } = props;
  const [markup, setMarkup] = useState<string>();

  const style = {
    container: {
      ...common.row,
      padding: "20px 0 40px 0",
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      background: colors.secondary,
    },
    textarea: {
      width: "80%",
      height: "120px",
      margin: "0 auto",
    },
    text: {
      fontStyle: "italic",
    },
  };

  useEffect(() => {
    const postsTransformer = new PostsTransformer(posts);
    const html = postsTransformer.getMarkup();
    copyToClipboard(html);
  }, [posts]);

  const copyToClipboard = async (html: string) => {
    await navigator.clipboard.writeText(html);
    setMarkup(html);
    scroll();
  };

  return markup ? (
    <div style={style.container}>
      <h2>
        Step 4: Paste into email program{" "}
        <span role="img" aria-label="Smiley Face">
          😎
        </span>
      </h2>
      <p style={style.text}>Code below is copied to your clipboard!</p>
      <textarea value={markup} readOnly style={style.textarea}></textarea>
    </div>
  ) : (
    <div></div>
  );
};
