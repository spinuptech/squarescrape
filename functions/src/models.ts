export interface CheckBoxMap {
  [key: string]: { [key: string]: boolean };
}

export interface FeedCollection {
  title: string;
  results: Array<Feed>;
}

export interface Feed {
  baseUrl: string;
  url: string;
  title: string;
  categories: Array<string>;
  NO_CATEGORIES?: boolean;
}
export interface PostCollection {
  title: string;
  results: Array<Post>;
  url: string;
}
export interface Post {
  id: string;
  fullUrl: string;
  startDate: string;
  endDate: string;
  title: string;
  excerpt: string;
  assetUrl: string;
}
