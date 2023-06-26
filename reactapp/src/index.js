import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MovieInfo from './MovieInfo';
import reportWebVitals from './reportWebVitals';
import NewMovie from './NewMovie';
import Genre from './Genre';
import DeleteGenre from './DeleteGenre';
import EditGenre from './EditGenre';


import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import { ChakraBaseProvider, ChakraProvider, extendBaseTheme, theme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'


import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import MovieEdit from './MovieEdit';

import defaultTheme from './theme'

const router = createBrowserRouter([
  {
    path: '/',
    element: 
      <App />,

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
    element: <NewMovie />
  },
  {
    path: '/NewGenre',
    element: <Genre />
  },
  {
    path: '/DeleteGenre',
    element: <DeleteGenre />
  },
  {
    path: '/EditGenre',
    element: <EditGenre/>
  }
])

const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={defaultTheme}>
    <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
    </QueryClientProvider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
