import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import FullscreenLoader from './components/loaders/FullscreenLoader';
import useAuth from './hooks/useAuth';
import useTheme from './hooks/useTheme';
import Home from './pages';
import AuthRoutes from './pages/auth/AuthRoutes';
import Login from './pages/auth/Login';
import SignOut from './pages/auth/SignOut';
import LimeyfyRouting from './pages/limeyfy/LimeyfyRouting';
import PrivateProvider from './providers/PrivateProvider';

const Profile = React.lazy(() => import('./pages/profile/Profile'));

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
    <div>
      <Toaster
        position='top-right'
        reverseOrder={false}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-out" element={<SignOut />} />
        <Route path="*" element={<PrivatePaths />} />
      </Routes>
    </div>
  )
}

const PrivatePaths = () => {
  const user = useAuth();

  if (user.isLoading) return <FullscreenLoader text='Connecting to database..' />

  if (user.isError && user.statusCode !== 401) {
    return <p>An error occurred</p>
  }

  return (
    <PrivateProvider user={user.user}>
      <Routes>
        <Route path='/' element={<Layout><Home /></Layout>} />
        <Route path='/profile' element={<Suspense fallback="...Loading"><Profile /></Suspense>} />
        <Route path='/profile/:page' element={<Suspense fallback="...Loading"><Profile /></Suspense>} />
        <Route path='/limeyfy/*' element={<Layout><LimeyfyRouting /></Layout>} />
        <Route path='/auth/*' element={<Layout><AuthRoutes /></Layout>} />
        <Route path='*' element={<Layout><p>Not found</p></Layout>} />
      </Routes>
    </PrivateProvider>
  )
}

export default App
