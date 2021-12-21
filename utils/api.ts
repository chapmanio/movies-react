import { MovieDb } from 'moviedb-promise';

let api: MovieDb;

declare global {
  var __api: MovieDb | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === 'production') {
  api = new MovieDb(process.env.MOVIE_API_KEY);
} else {
  if (!global.__api) {
    global.__api = new MovieDb(process.env.MOVIE_API_KEY);
  }

  api = global.__api;
}

export { api };
