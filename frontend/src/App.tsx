import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layouts/Layout';
import Loader from './components/loaders/Loader';
import useTheme from './hooks/useTheme';
import Home from './pages';
import { limeyfyRoutes } from './pages/limeyfy/limeyfy.routes';
import PrivateProvider from './providers/PrivateProvider';

const Profile = React.lazy(() => import('./pages/profile/Profile'));
const Login = React.lazy(() => import('./pages/auth/Login'));

const location = new ReactLocation();

const App = () => {
  const theme = useTheme();
  const [tokenSat, setTokenSat] = useState(false)

  useEffect(() => {
    theme.init()
    const token = window.localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common = { "Authorization": `Bearer ${JSON.parse(token)}` }
    }
    setTokenSat(true);
  }, [])

  if (!tokenSat) return <p>...Loading</p>

  return (
    <>
      <Toaster
        position='top-right'
        reverseOrder={false}
      />
      <Router
        location={location}
        routes={[
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "",
            element: <PrivatePaths />
          }
        ]}
      />
    </>
  )
}

const PrivatePaths = () => (
  <PrivateProvider>
    <Router
      location={location}
      defaultPendingElement={<Loader />}
      routes={[
        {
          path: "/",
          element: <Layout><Home /></Layout>
        },
        {
          path: "/profile",
          element: <Profile />
        },
        {
          path: "/limeyfy",
          element: <Layout><Outlet /></Layout>,
          children: limeyfyRoutes
        }
      ]}
    />
    {/* <Routes>
      <Route path='/' element={<Layout><Home /></Layout>} />
      <Route path='/profile' element={<Suspense fallback="...Loading"><Profile /></Suspense>} />
      <Route path='/profile/:page' element={<Suspense fallback="...Loading"><Profile /></Suspense>} />
      <Route path='/limeyfy/*' element={<Layout><LimeyfyRouting /></Layout>} />
      <Route path='/auth/*' element={<Layout><AuthRoutes /></Layout>} />
      <Route path='*' element={<NotFound />} />
    </Routes> */}
  </PrivateProvider>
)

export default App
