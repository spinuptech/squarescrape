import React from "react";
import { Post, PostCollection } from "../../functions/src/models";
import { renderToStaticMarkup } from "react-dom/server";
import { decodeHTMLEntities, decodeHTMLCharacters } from "../utils";
import moment from "moment";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { style as common, colors } from "../styles/common";
import { defaultTheme } from "../styles/themes";

export class PostsTransformer {
  constructor(private postCollections: Array<PostCollection>) {}
  // TODO: investigate https://www.campaignmonitor.com/css/color-background/background/ for support

  private parseStartDate = (time: number) => {
    const date = moment(time);
    return date.format("MMM");
  };

  private buildDate = (post: Post) => {
    const style = {
      container: {
        padding: "0px 10px 10px",
        textTransform: "uppercase",
        fontSize: ".8em",
      } as CSSProperties,
    };

    const startDate = post.startDate ? moment(post.startDate) : undefined;
    const endDate = post.endDate ? moment(post.endDate) : undefined;

    return (
      startDate && (
        <div style={style.container}>
          {`${startDate.format("MMM Do")} @ ${startDate.format("h a")}`}
          {startDate.hour !== endDate?.hour && ` - `}
          {startDate.day !== endDate?.day && startDate.format("MMM Do")}
          {startDate.hour !== endDate?.hour && startDate.format("h:mm a")}
        </div>
      )
    );
  };

  private buildElement = (post: Post, key: number, url: string) => {
    const style = {
      container: {
        display: "block",
        margin: "20px auto",
        width: "400px",
        border: "1px solid #eee",
        borderRadius: "8px",
        overflow: "hidden",
        background: defaultTheme.cardBackground,
        textAlign: "center",
        // boxShadow: '0px 2px 4px rgba(0,0,0,0.25)'
      } as CSSProperties,
      link: {
        textDecoration: "none",
        textAlign: "center",
        color: defaultTheme.text,
      } as CSSProperties,
      title: {
        padding: "20px 10px 10px 10px",
        margin: "0",
        textAlign: "center",
        color: defaultTheme.text,
      } as CSSProperties,
      excerpt: {
        padding: "0px 10px 10px",
        margin: "0",
        textAlign: "center",
        fontFamily: "sans-serif",
      } as CSSProperties,
      image: {
        width: "400px",
        height: "300px",
        backgroundImage: `url(${post.assetUrl}?format=1000w)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop: "10px",
      },
    };

    return (
      <div key={key} style={style.container}>
        <a href={`${url}${post.fullUrl}`} style={style.link}>
          <h2 style={style.title}>{decodeHTMLEntities(post.title)}</h2>
          {this.buildDate(post)}
          <p style={style.excerpt}>{decodeHTMLEntities(post.excerpt)}</p>
          <div style={style.image}></div>
        </a>
      </div>
    );
  };

  private buildCollection = (collection: PostCollection, key: number) => {
    const style = {
      container: {
        width: "100%",
      },
      title: {
        textAlign: "center",
      } as CSSProperties,
    };
    return (
      <div key={key} style={style.container}>
        <h1 style={style.title}>{collection.title}</h1>
        {collection.results.map((post, index) => {
          return this.buildElement(post, index, collection.url);
        })}
      </div>
    );
  };

  public getMarkup(): string {
    const collections = this.postCollections.map((collection, index) => {
      const markup = renderToStaticMarkup(
        this.buildCollection(collection, index)
      );
      return decodeHTMLCharacters(markup);
    });
    return collections.join();
  }

  public renderPosts() {
    const markup = this.getMarkup();
    return <div dangerouslySetInnerHTML={{ __html: markup }}></div>;
  }
}
