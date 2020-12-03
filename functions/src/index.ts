import * as functions from "firebase-functions";
import { getCategories, getPosts } from "./functions";
import app from "./app";

exports.api = functions.https.onRequest(app);
exports.getCategories = functions.https.onCall(async (data, context) => {
  // return { text: data.feeds };
  return await getCategories(data.feeds);
});

exports.getPosts = functions.https.onCall(async (data, context) => {
  return await getPosts(data.feeds);
});
