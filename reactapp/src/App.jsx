import React  from 'react';
import Moviecard from './Moviecard';
import { useState, useEffect } from 'react';
import './App.css'
import searchicon from './search.svg'

import {useQuery, useMutation} from '@tanstack/react-query'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";


function App() {
  const [backendData, setBackendData] = useState([{}])
  const [movies, setMovies] = useState([])
  const [fmovies, setFMovies] = useState([])
  const [search, setSearch] = useState('')
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {},[])

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
  
  

  
  

const movieQuery = useQuery({
  queryKey: ['movies'],
  queryFn: async () => {
    return fetch('/api').then(
      response => response.json()
    ).then(
      data => {
        console.log(data)
        setMovies(data[0])
        setFMovies(data[0])
        setGenres(data[1])
        return data[0]
      }
    )
  }
})

const filtered = (e) => {
  fetch(`/api/queried/${e.target.value}`).then(
    response => response.json()
  ).then(
    data => {
      console.log(data)
      setMovies(data)
      return data
    }
  )
}

if (movieQuery.isLoading){
  return <h1> Loading movies! </h1>
} else if (movieQuery.isError){
  return <h1> Movies cannot be loaded from SQLITE3 Database. </h1>
}

  return (
    <div className="App">

    <div className='App'>
      <h1> MovieLand </h1>
      <h2 style={{position: 'absolute', right: '7vw'}}> 
        <Link className='link' to={'/new'}> Create a Movie </Link> <br/><br/>
        <Link className='link' to={'/NewGenre'}> Create/Delete a Genre </Link>

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
        <select name='genre' id='genre' onChange={filtered} style={{padding: '5px', borderRadius: '9px', marginLeft: '4vw'}}> 
          <option> All Genres </option>
          {
              genres.map((genre, key) => {
                  return <option type='text' value={genre.genreID}> {genre.name} </option>
              })
          }
        </select>
      </div>
    </div>



      {
       movies.length > 0 ? (
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

