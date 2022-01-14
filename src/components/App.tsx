import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Loading from './assets/Loading';
import ScrollToTop from './assets/ScrollToTop';
import HomeLayout from './layouts/Home';
import Home from './pages/Home';
import DetailsLayout from './layouts/Details';
import Movie from './pages/Movie';
import TvShow from './pages/TvShow';
import Person from './pages/Person';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';

import { useUserState } from '../hooks/useUser';

const App = () => {
  // Hooks
  const userState = useUserState();

  // Derived state
  const authedUser = userState.status === 'resolved' && userState.data.auth;

  // Render
  return userState.status === 'pending' ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route
              path="sign-in"
              element={authedUser ? <Navigate to="/" replace={true} /> : <SignIn />}
            />
            <Route
              path="register"
              element={authedUser ? <Navigate to="/" replace={true} /> : <Register />}
            />
          </Route>

          <Route path="my-account" element={<DetailsLayout />}>
            <Route index element={<MyAccount />} />
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
  );
};

export default App;
