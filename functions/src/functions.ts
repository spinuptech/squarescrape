import * as functions from "firebase-functions";
import { stringify } from "query-string";
import fetch from "node-fetch";
import { Post, Feed, PostCollection } from "./models";

export const getCategories = (feeds: Array<string>): Promise<Array<Feed>> => {
  const requests = feeds.map(async (feed) => {
    const query = stringify({ format: "json" });
    const url = `${feed}?${query}`;
    const res = await fetch(url, { method: "GET" });
    const html = await res.text();
    const json = JSON.parse(html);

    return {
      title: json.collection.title,
      url: feed,
      baseUrl: json.website.baseUrl,
      categories: json.collection.categories,
    };
  });
  return Promise.all(requests);
};

export const getPosts = async (
  feeds: Array<Feed>
): Promise<Array<PostCollection>> => {
  const requests = feeds.map(async (feed) => {
    const queryData: any = { format: "json" };
    if (feed.categories?.length > 0) {
      queryData.category = feed.categories.join(",");
    }
    const query = stringify(queryData);
    functions.logger.info("query", query);
    const url = `${feed.url}?${query}`;
    const res = await fetch(url);
    const html = await res.text();
    const json = JSON.parse(html);
    const items = json.upcoming ? json.upcoming : json.items;
    const posts = items.map((item: Post) => buildHTMLElement(item));

    return { title: json.collection.title, results: posts, url: feed.baseUrl };
  });
  return await Promise.all(requests);
};

const buildHTMLElement = (item: Post): Post => {
  return item;
};
