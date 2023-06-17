import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MovieInfo from './MovieInfo';
import reportWebVitals from './reportWebVitals';
import NewMovie from './NewMovie';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { get, post } from '../../ExpressAPI/routes/movie';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h2> Error </h2>
  },
  {
    path: '/movie/:name',
    element: <MovieInfo />
  },
  {
    path: '/movie/new',
    element: <NewMovie />,
    action: '/api/movie/new'
  },
  {
    path: '/movie/new',
    element: <NewMovie />,
    action: '/api/movie/new'
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
