import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomeLayout from './components/layouts/Home';
import Home from './components/pages/Home';
import DetailsLayout from './components/layouts/Details';
import Movie from './components/pages/Movie';
import TvShow from './components/pages/TvShow';
import Person from './components/pages/Person';
import NotFound from './components/pages/NotFound';

import reportWebVitals from './reportWebVitals';

import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="movie" element={<DetailsLayout />}>
          <Route path=":id" element={<Movie />} />
        </Route>

        <Route path="tv" element={<DetailsLayout />}>
          <Route path=":id" element={<TvShow />} />
        </Route>

        <Route path="person" element={<DetailsLayout />}>
          <Route path=":id" element={<Person />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
