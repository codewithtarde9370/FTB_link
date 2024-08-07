import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import Home from './../src/views/Home/home'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import SignUp from './../src/views/Signup/signup'
import Login from './../src/views/Login/login'
import Edit from './../src/views/Edit/edit'
import AboutUs from './views/AboutUS/about';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/signup",
    element: <SignUp/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/edit/:id",
    element: <Edit/>
  },
  {
    path: "/about",
    element: <AboutUs/>
  },
  {
    path: "*",
    element: <h1>404 Page not found</h1>
  }
])
root.render(<RouterProvider router={router}/>);

