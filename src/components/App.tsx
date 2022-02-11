import { useEffect, useState } from 'react';
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
import ListModal from './lists/ListModal';
import Notification, { NotificationProps } from './assets/Notification';

import { useUserState } from '../hooks/useUser';
import { useListDispatch, useListState } from '../hooks/useList';

import { getAllLists } from '../lib/api/lists';
import { ApiError } from '../lib/api';

// Types
type NotificationType = Omit<NotificationProps, 'onClose'>;

// Component
const App = () => {
  // Hooks
  const userState = useUserState();
  const listState = useListState();
  const listDispatch = useListDispatch();

  // Local state
  const [notification, setNotification] = useState<NotificationType | undefined>(undefined);

  // Effects
  useEffect(() => {
    if (userState.status === 'resolved' && userState.data.auth) {
      // If we have an authed user, get their lists as well
      getAllLists()
        .then((lists) => {
          listDispatch({ type: 'SET_LISTS', lists });
        })
        .catch((error: ApiError) => {
          listDispatch({ type: 'LISTS_ERROR', error });
        });
    }
  }, [userState, listDispatch]);

  useEffect(() => {
    if (listState.lists.status === 'rejected') {
      setNotification({
        type: 'error',
        visible: true,
        title: 'Unable to retrieve your lists',
      });
    }
  }, [listState.lists]);

  // Derived state
  const authedUser = userState.status === 'resolved' && userState.data.auth;

  // Render
  return userState.status === 'pending' ? (
    <Loading />
  ) : (
    <>
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

      <ListModal />

      {notification ? (
        <Notification
          {...notification}
          onClose={() =>
            setNotification((notification) =>
              notification ? { ...notification, visible: false } : undefined
            )
          }
        />
      ) : null}
    </>
  );
};

export default App;
