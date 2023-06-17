import React  from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './App.css'


function NewMovie({props}){
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => {
       
    },[])


    function getName(e){
        setName(e.target.value);
    }

    function getYear(e){
        setYear(e.target.value);
    }

    function getGenre(e){
        setGenre(e.target.value);
    }

    return(
            <>
            <h2 style={{margin: '20px'}}> <Link to={'/'} className='link'> Back to Home </Link> </h2>
            <form action = '/api/movie/new' method='POST' style={{margin: 'auto', marginTop: '5vh', width: '25%', }}>
            <h2 className='header' style={{color: 'white'}}> Create a Movie! </h2>
                <div className='inputgroup'>
                    <span style={{color:'white'}}>Movie Name</span> <br/><br/>
                    <input name='name' id='name' type='text' placeholder='Movie Name' onChange={getName}/><br/><br/><br/>

                    <span style={{color:'white'}}>Movie Genre</span> <br /><br />
                    <input name='genre' id= 'genre' type='text' placeholder='Movie Genre' onChange={getGenre} /><br/><br/><br/>

                    <span style={{color:'white'}}>Year</span> <br /><br />
                    <input name='year' id='year' type='text' placeholder='Year' onChange={getYear} /><br/><br/><br/>    

                    <button type='submit'> Create Movie </button> 
                </div>
            </form>
            </>

    )
}

export default NewMovie;