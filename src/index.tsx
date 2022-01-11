import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ScrollToTop from './components/assets/ScrollToTop';
import HomeLayout from './components/layouts/Home';
import Home from './components/pages/Home';
import DetailsLayout from './components/layouts/Details';
import Movie from './components/pages/Movie';
import TvShow from './components/pages/TvShow';
import Person from './components/pages/Person';
import NotFound from './components/pages/NotFound';
import SignIn from './components/pages/SignIn';
import Register from './components/pages/Register';

import { UserProvider } from './hooks/useUser';

import reportWebVitals from './reportWebVitals';

import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <UserProvider>
        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<HomeLayout />}>
                <Route index element={<Home />} />
                <Route path="sign-in" element={<SignIn />} />
                <Route path="register" element={<Register />} />
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
          </ScrollToTop>
        </BrowserRouter>
      </UserProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
