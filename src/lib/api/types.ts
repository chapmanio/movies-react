enum Direction {
  MOVIE,
  TV,
  PERSON,
}

export type ListItem = {
  id: string;
  listId: string;
  mediaType: Direction;
  mdbId: string;
};

export type List = {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  items: ListItem[];
};

export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  lists: List[];
};