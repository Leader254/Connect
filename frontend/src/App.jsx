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
import { useContext } from 'react';
import { AuthContext } from './Context/authContext';


function App() {

  const { currentuser } = useContext(AuthContext);

  const Layout = () => {
    return (
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
    )
  }

  const ProtectedRoute = ({ children }) => {
    if (!currentuser) {
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
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
