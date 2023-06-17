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
  const [search, setSearch] = useState('')
  const [word, setWord] = useState('')

  useEffect(() => {
    fetchData('Batman')
  },[])
  

async function fetchData(title){
    const res = await fetch(`${API_URL}&s=${title}`)
    const data = await res.json(); //JSON data
    setMovies(data.Search);
}

function getSearch(e){
    setSearch(e.target.value);
}

  return (
    <div className="App">

    <div className='App'>
      <h1> MovieLand </h1>
      <h2 style={{position: 'absolute', right: '7vw'}}> 
        <Link className='link' to={'/movie/new'}> Create a Movie </Link>
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
          <div className='empty'> 
            No movies found!
          </div>
        )
        
          
      }
    </div>
  );
}

export default App;

