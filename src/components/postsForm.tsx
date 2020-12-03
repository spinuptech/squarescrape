import { Button } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import { Post, PostCollection } from "../../functions/src/models";
import { style as common } from "../styles/common";
import Checkbox from "./checkbox";

export const PostsForm = (props: {
  posts: Array<PostCollection>;
  onSubmit: any;
}) => {
  const { posts, onSubmit } = props;
  const [checkedItems, setCheckedItems] = useState<Array<string>>([]);

  const style = {
    container: {
      ...common.row,
      background: "rgba(0,0,0,0.05)",
    },
    form: {
      ...common.form,
    },
    button: {
      ...common.button,
      marginBottom: "10px",
    },
    list: {
      marginBottom: "20px",
    },
    listItem: {
      marginBottom: "4px",
    },
  };

  const handleSubmit = (e: any) => {
    // filter results in collection based on checkedItems
    const selectedPosts = posts
      .map((collection) => {
        const results = collection.results.filter((post) =>
          checkedItems.includes(post.id)
        );
        return { ...collection, results };
      })
      .filter((collection) => collection.results.length);

    e.preventDefault();
    onSubmit(selectedPosts);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.title;
    const isChecked = e.target.checked;
    let list = [...checkedItems];
    const isInList = list.includes(id);

    if (isChecked && !isInList) list.push(id);
    else list = list.filter((item) => id !== item);

    setCheckedItems(list);
  };

  const buildItem = (post: Post) => {
    const isChecked = checkedItems.includes(post.id);
    return (
      <div style={style.listItem} key={post.id}>
        <Checkbox
          title={post.id}
          name={post.title}
          checked={isChecked}
          onChange={handleChange}
          assetUrl={post.assetUrl}
        ></Checkbox>
      </div>
    );
  };

  const buildItems = () => {
    return posts.map((collection) => {
      return (
        <div>
          <h4>{collection.title}</h4>
          {collection.results.map(buildItem)}
        </div>
      );
    });
  };

  return posts.length ? (
    <div style={style.container}>
      <h2>Step 3: Select posts to include</h2>
      <form onSubmit={handleSubmit} style={style.form}>
        <div style={style.list}>{buildItems()}</div>
        <Button type="submit" style={style.button}>
          Submit
        </Button>
      </form>
    </div>
  ) : (
    <div></div>
  );
};
