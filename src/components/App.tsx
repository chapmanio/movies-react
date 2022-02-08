import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Loading from './assets/Loading';
import ScrollToTop from './assets/ScrollToTop';
import HomeLayout from './layouts/Home';
import Home from './pages/Home';
import DetailsLayout from './layouts/Details';
import Movie from './pages/Movie';
import TvShow from './pages/TvShow';
import Person from './pages/Person';
import Lists from './pages/Lists';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';
import NotFound from './pages/NotFound';

import { useUserState } from '../hooks/useUser';
import { ListProvider } from '../hooks/useList';

const App = () => {
  // Hooks
  const userState = useUserState();

  // Derived state
  const authedUser = userState.status === 'resolved' && userState.data.auth;

  // Render
  return userState.status === 'pending' ? (
    <Loading />
  ) : (
    <ListProvider>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Home />} />
            </Route>

            <Route
              path="/"
              element={authedUser ? <Navigate to="/" replace={true} /> : <HomeLayout />}
            >
              <Route path="sign-in" element={<SignIn />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route element={<DetailsLayout />}>
              <Route path="movie/:id" element={<Movie />} />
              <Route path="tv/:id" element={<TvShow />} />
              <Route path="person/:id" element={<Person />} />
            </Route>

            {/* Private routes */}
            <Route element={authedUser ? <DetailsLayout /> : <Navigate to="/" replace={true} />}>
              <Route path="lists" element={<Lists />} />
              <Route path="my-account" element={<MyAccount />} />
            </Route>

            {/* Fallback routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </ListProvider>
  );
};

export default App;
