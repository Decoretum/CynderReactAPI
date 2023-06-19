import React  from 'react';
import { useState, useEffect } from 'react';
import './App.css'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
  } from "react-router-dom";

function Genre(){
    useEffect(() => {

    })

    const [genre, setGenre] = useState('')

    return (
        <>
            <h2 style={{margin: '20px'}}> <Link to={'/'} className='link'> Back to Home </Link> </h2>
            <form method='POST' action='/api/genres' style={{margin: 'auto', marginTop: '5vh', width: '25%'}}>
                <div className='inputgroup'>
                    <h2 style={{color: 'white'}}> Genre Name </h2><br/>
                    <input name='name' id='name' type='text' placeholder='Genre Name' onChange={(e) => setGenre(e.target.value)}/><br/><br/><br/>
                    <button type='submit'> Create Genre </button>

                </div>

            </form>
        </>
    )
}

export default Genre;