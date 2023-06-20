import React  from 'react';
import Moviecard from './Moviecard';
import { useState, useEffect } from 'react';
import './App.css'
import searchicon from './search.svg'

import {useQuery, useMutation} from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom';

import {
  Link,
} from "react-router-dom";


function App() {
  const [movies, setMovies] = useState([])
  const [fmovies, setFMovies] = useState([])
  const [genres, setGenres] = useState([])

  const [search, setSearch] = useState('')
  const[searchGenre, setSearchGenre] = useState('')


  let [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    let params = {}
    setSearchParams(params)

  },[])

  
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
  //if Search word is empty
  if (searchGenre.trim() !== '' && !search){
    let params = {genreID: searchGenre}
    setSearchParams(params)
    fetch(`/api/queried/${searchGenre}`).then(
      response => response.json()
    ).then(
      data => {
        setMovies(data)
      }
    )
  
  //if search word is not empty
  } else if (searchGenre && search || searchGenre && search !== ''){
    let params = {
      genreID: searchGenre,
      term: search
    }
    setSearchParams(params)
    fetch(`/api/queried/${searchGenre}`).then(
      response => response.json()
    ).then(
      data => {
        //setMovies(data)
        console.log(data)
        let worded = data.filter((element) => {
          let movie = element.MovieName.toUpperCase().replaceAll(" ",'');
          let searched = search.toUpperCase().replaceAll(" ",'');
          return movie.indexOf(searched) > -1
        })
        setMovies(worded)
      }
    )
  }

  //if genre is all genres but search not empty
  else if (search !== '' && searchGenre === '') {
    let params = {term: search}
    setSearchParams(params)
    let worded = fmovies.filter((element) => {
      let movie = element.MovieName.toUpperCase().replaceAll(" ",'');
      let searched = search.toUpperCase().replaceAll(" ",'');
      return movie.indexOf(searched) > -1
    })
    setMovies(worded)
  }

  //genre is all genres and no search word
  else{
    let params = {}
    setSearchParams(params)
    setMovies(fmovies)
  }
}



//const secondfiltered

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
          onClick={filtered}
          />
      </div>
      <div>
        <div className='header' style={{color: 'white', fontSize: '30px'}}> Filter by Genre & Term <br/><br/> Click a Genre then press the magnifying glass to instantly filter all movies based on a genre from SQLITE3 <br/><br/> Type a word on the search box to filter genre based on the "term" then press the magnifying glass. </div>
        <div className='header' style={{color: 'white', fontSize: '20px'}}> To view a Movie, press the Movie name from down below. You will be redirected to the Movie information page. </div>
        <div className='header' style={{color: 'white', fontSize: '20px'}}> Movie Information Page: Contains Information about the movie as well as "Edit" and "Delete" buttons that will redirect you to an Edit form or delete a movie object from SQLITE3. </div>

        <select onChange={(e) => setSearchGenre(e.target.value)} 
           style={{padding: '5px', borderRadius: '9px', marginLeft: '4vw'}}
           > 
          <option value=''> All Genres </option>
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
          <>
          <br/><br/>
          <div className='empty' style={{color: 'white', fontSize: '30px'}}> 
            No movies found!
          </div> <br/><br/>
          </>
        )
        
          
      }
    </div>
  );
}

export default App;

