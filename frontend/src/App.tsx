import {Outlet, ReactLocation, Router} from '@tanstack/react-location';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Toaster} from 'react-hot-toast';
import Layout from './components/layouts/Layout';
import Loader from './components/loaders/Loader';
import NotFound from './components/status-pages/NotFound';
import useTheme from './hooks/useTheme';
import Home from './pages';
import {authRoutes} from './pages/auth/auth.routes';
import {limeyfyRoutes} from './pages/limeyfy/limeyfy.routes';
import PrivateProvider from './providers/PrivateProvider';
import FullscreenLoader from "@/components/loaders/FullscreenLoader";
import {BetterHelmet} from "@limeyfy/react-seo";

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

  if (!tokenSat) return <FullscreenLoader text="Retriving authorization token... This shouldn't take more than one second" />

  return (
    <>
      <Toaster
        position='top-right'
        reverseOrder={false}
      />
        <BetterHelmet
            title={"Limeyfy portal - Content management system"}
            robots="noindex"
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
        },
        {
          path: "/auth",
          element: <Layout><Outlet /></Layout>,
          children: authRoutes
        },
        { // Not found
          path: "*",
          element: <NotFound />
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
