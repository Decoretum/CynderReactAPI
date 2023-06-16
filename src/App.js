import React, {useEffect, useState} from 'react';
import './App.css';
import searchicon from './search.svg';
import Moviecard from './Moviecard';

const key = 'ace5116';
const API_URL = 'http://www.omdbapi.com?apikey=' + key;



const App = () => {
    //states
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');


    //App to API promise function
    async function fetchData(title){
        const res = await fetch(`${API_URL}&s=${title}`)
        const data = await res.json(); //JSON data
        setMovies(data.Search);
        console.log(data.Search)
    }

    function getSearch(e){
        setSearch(e.target.value);
    }

    //load API data as soon as component loads
    useEffect(() => {
        fetchData('Batman');
    }, [])  

    
    return(
        <>
            <div className='App'>
                <h1> MovieLand </h1>
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

                {
                    movies?.length > 0 
                    ? (
                        <>
                            <div className='container'>
                                {movies.map((movie) => {
                                    return <Moviecard movie={movie} />
                                })} 
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='empty'> 
                                <h2> No movies found! </h2>
                            </div>
                        </>
                    ) 
                    

                }
                
            </div>
        
        </>
    )   
}

export default App;