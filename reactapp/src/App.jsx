import React  from 'react';
import Moviecard from './Moviecard';
import { useState, useEffect } from 'react';
import './App.css'
import searchicon from './search.svg'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";


const key = 'ace5116';
const API_URL = 'http://www.omdbapi.com?apikey=' + key;

function App() {
  const [backendData, setBackendData] = useState([{}])
  const [movies, setMovies] = useState([])
  const [fmovies, setFMovies] = useState([])
  const [search, setSearch] = useState('')
  const [genres, setGenres] = useState([])

  useEffect(() => {
    fetch('/api').then(response => response.json())
    .then(data => {
      console.log(data)
      setMovies(data[0])
      setFMovies(data[0])
      setGenres(data[1])
      
    })
  },[])
  

function fetchData(title){
  if (title.trim() === ''){
    return setMovies(fmovies)
  }
    let filtered = fmovies.filter((movie) => {
      return movie.MovieName.toUpperCase().indexOf(title.toUpperCase()) > -1
    })    
    setMovies(filtered);
    console.log(filtered)
}

function getSearch(e){
    setSearch(e.target.value);
}

function filter(e){
    console.log(e.target.value)
    if (e.target.value === 'Choose a Genre'){
      return setMovies(fmovies)
    }
    let filtered = fmovies.filter((movie) => {
      return movie.GenreName === e.target.value
    })
    console.log(filtered)
    setMovies(filtered)
}

  return (
    <div className="App">

    <div className='App'>
      <h1> MovieLand </h1>
      <h2 style={{position: 'absolute', right: '7vw'}}> 
        <Link className='link' to={'/movies/new'}> Create a Movie </Link>
      </h2>
      <div className='search'>
          <input
          placeholder='Search for movies'
          value={search}
          onChange={getSearch}
          />  
          <img src={searchicon} alt='search'
          onClick={() => fetchData(search)}
          />
      </div>
      <div>
        <div className='header' style={{color: 'white', fontSize: '30px'}}> Filter by Genre: </div>
        <select name='genre' id='genre' onChange={filter} style={{padding: '5px', borderRadius: '9px', marginLeft: '4vw'}}> 
          <option> Choose a Genre </option>
          {
              genres.map((genre, key) => {
                  return <option type='text' value={genre.name}> {genre.name} </option>
              })
          }
        </select>
      </div>
    </div>



      {
        movies?.length > 0 ? (
          <>
            <div className='container'> 
              {
                movies.map((movie, key) => {
                  return <Moviecard movie={movie} />
                })
              }
            </div>
          </>
        ) : (
          <div className='empty' style={{color: 'white', fontSize: '30px'}}> 
            No movies found!
          </div>
        )
        
          
      }
    </div>
  );
}

export default App;

