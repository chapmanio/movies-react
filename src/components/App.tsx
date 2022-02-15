import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
import ListModal from './lists/ListModal';
import WithAuth from './assets/WithAuth';

// Component
const App = () => {
  // Render
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
          </Route>

          <Route
            path="/"
            element={
              <WithAuth restricted={false}>
                <HomeLayout />
              </WithAuth>
            }
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
          <Route
            element={
              <WithAuth>
                <DetailsLayout />
              </WithAuth>
            }
          >
            <Route path="lists" element={<Lists />} />
          </Route>

          <Route
            element={
              <WithAuth>
                <HomeLayout />
              </WithAuth>
            }
          >
            <Route path="my-account" element={<MyAccount />} />
          </Route>

          {/* Fallback routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ScrollToTop>

      <ListModal />
    </BrowserRouter>
  );
};

export default App;
