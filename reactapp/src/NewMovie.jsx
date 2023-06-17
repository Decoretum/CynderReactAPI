import React  from 'react';
import { useState, useEffect } from 'react';

import './App.css'
import { Form } from 'react-router-dom';

function NewMovie({props}){



    return(
        <Form method='post' action='/api/movie/new' style={{margin:'auto'}}>
            <h2 className='header' style={{color: 'white'}}> Create a Movie! </h2>
            <div className='inputgroup'>
                <span style={{color:'white'}}>Movie Name</span> <br/><br/>
                <input name='name' id='name' placeholder='Movie Name' /><br/><br/><br/>

                <span style={{color:'white'}}>Movie Genre</span> <br /><br />
                <input name='genre' id= 'genre' placeholder='Movie Genre' /><br/><br/><br/>

                <span style={{color:'white'}}>Year</span> <br /><br />
                <input name='year' id='year' placeholder='Year' /><br/><br/><br/>    

                <button type='submit'> Create Movie </button>
            </div>
        </Form>

    )
}

export default NewMovie;