import React, { ChangeEvent, useEffect, useState } from "react";
import Checkbox from "./checkbox";
import { Feed, CheckBoxMap } from "../../functions/src/models";
import { Button } from "@material-ui/core";
import { style as common, colors } from "../styles/common";

export const CategoryForm = (props: { feeds: Array<Feed>; onSubmit: any }) => {
  const { onSubmit, feeds } = props;
  const [checkedItems, setCheckedItems] = useState<CheckBoxMap>({});
  const NO_CATEGORIES = "All posts";

  // TODO: Next Make "no category" option available on each feed

  const style = {
    container: {
      ...common.row,
      background: colors.secondary,
    },
    form: { ...common.form },
    list: {
      display: "flex",
      width: "400px",
      flexFlow: "wrap row",
      margin: "0 auto",
      justifyContent: "space-between",
    },
    listItem: {
      width: "180px",
      padding: "4px 8px",
      background: "rgba(0,0,0,0.05)",
      borderRadius: "3px",
      marginBottom: "4px",
    },
    button: {
      ...common.button,
      margin: "0 auto",
    },
  };

  useEffect(() => {
    let items: CheckBoxMap = {};
    feeds.forEach((item: Feed) => {
      items[item.title] = { [NO_CATEGORIES]: true }; // adding default 'none' option
      item.categories.forEach((subItem: string) => {
        let list = items[item.title];
        items[item.title] = { ...list, [subItem]: false };
      });
    });

    setCheckedItems(items);
  }, [feeds]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const title = e.target.title;
    const isChecked = e.target.checked;
    let list = checkedItems[title];

    // user selects 'No Categories'
    if (name === NO_CATEGORIES && isChecked) {
      // reset list
      Object.keys(list).forEach((key) => {
        list[key] = false;
      });
      list = { ...list, [NO_CATEGORIES]: true };
    } else {
      list = { ...list, [name]: isChecked, [NO_CATEGORIES]: false };
    }

    // check if list has selections, if not - select no categories
    const listContainsSelections = Object.keys(list).some(
      (key) => list[key] === true
    );
    if (!listContainsSelections) list = { ...list, [NO_CATEGORIES]: true };

    setCheckedItems({ ...checkedItems, [title]: list });
  };

  const handleSubmit = () => {
    const items = Object.keys(checkedItems).map((key) => {
      const item = checkedItems[key];
      const feed = feeds.find((f: Feed) => f.title === key);
      let categories = Object.keys(item).filter(
        (category) => item[category] === true
      );
      if (categories.includes(NO_CATEGORIES)) categories = []; // return empty if user selected `no_categories`

      if (feed)
        return {
          baseUrl: feed.baseUrl,
          url: feed.url,
          title: key,
          categories,
        };
    });

    return onSubmit(items);
  };

  const _buildItems = (item: Feed) => {
    return item.categories.map((category: string, index) => {
      return (
        <div style={style.listItem} key={index}>
          <Checkbox
            title={item.title}
            name={category}
            checked={
              checkedItems[item.title]
                ? checkedItems[item.title][category]
                : undefined
            }
            onChange={handleChange}
          ></Checkbox>
        </div>
      );
    });
  };

  return feeds.length ? (
    <div style={style.container}>
      <h2>Step 2: Select tags to include</h2>
      <form style={style.form}>
        {feeds.map((item: Feed, index: number) => {
          return (
            <React.Fragment key={index}>
              <h3>{item.title}</h3>

              <div style={style.listItem} key={index}>
                <Checkbox
                  title={item.title}
                  name={NO_CATEGORIES}
                  checked={
                    checkedItems[item.title]
                      ? checkedItems[item.title][NO_CATEGORIES]
                      : undefined
                  }
                  onChange={handleChange}
                ></Checkbox>
              </div>

              <div style={style.list}>{_buildItems(item)}</div>
            </React.Fragment>
          );
        })}

        <br />
        {Object.keys(checkedItems).length !== 0 && (
          <Button onClick={handleSubmit} style={style.button}>
            Submit Items
          </Button>
        )}
      </form>
    </div>
  ) : (
    <div></div>
  );
};
