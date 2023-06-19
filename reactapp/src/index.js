import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MovieInfo from './MovieInfo';
import reportWebVitals from './reportWebVitals';
import NewMovie from './NewMovie';
import Genre from './Genre';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import MovieEdit from './MovieEdit';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h2> Error </h2>
  },
  {
    path: '/:id',
    element: <MovieInfo />
  },
  {
    path: '/:id/edit',
    element: <MovieEdit />
  },
  {
    path: '/new',
    element: <NewMovie />,
    //action: '/api/movies/new'
  },
  {
    path: '/NewGenre',
    element: <Genre />
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
