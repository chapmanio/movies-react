import { ListItem } from "../../lib/format";

export type SearchType = "all" | "movie" | "tv" | "person";

export type SearchArgs = {
  query: string;
  page: number;
};

export type ListingResponse = {
  items: ListItem[];
  total: number;
};
