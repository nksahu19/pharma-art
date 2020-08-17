import React from 'react';
import { Navigate } from 'react-router-dom';
import {Orders, Account, SignIn, SignUp, Invoices} from '../components/pages';
import Layout from '../components/layout';

const routes = [
  {
    path: '/',
    element: '',
    children: [
      { path: 'signin', element: <SignIn /> },
      { path: 'register', element: <SignUp /> },
      { path: '/', element: <Navigate to="/signin" /> },
    ]
  },

  {
    path: '',
    element: <Layout />,
    children: [
      { path: 'orders', element: <Orders /> },
      { path: 'invoices', element: <Invoices /> },
      { path: 'profile', element: <Account /> },
    ]
  },
];

export default routes;
