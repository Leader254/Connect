/* eslint-disable react/prop-types */
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Login from './Pages/Login/Login'
import Register from './Pages/SignUp/SignUp'
import { createBrowserRouter as Router, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import RightBar from './Components/rightBar/rightBar';
import LeftBar from './Components/leftBar/leftBar';
import Messenger from './Pages/Messenger/Messenger';
import { useContext } from 'react';
import { AuthContext } from './Context/authContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Update from './Components/Update/Update'

function App() {

  const { user } = useContext(AuthContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className='theme-dark'>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>

            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    )
  }

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      console.log(user)
      return <Navigate to='/login' />

    }
    return children
  }


  const router = Router([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/profile/:id',
          element: <Profile />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/messenger',
      element: <Messenger />
    },
    {
      path: '/update/:id',
      element: <Update />
    }

  ])
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App