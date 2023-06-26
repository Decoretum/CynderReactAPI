import React  from 'react';
import { useState, useEffect } from 'react';
import './App.css'
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
  } from "react-router-dom";

function Genre(){
    useEffect(() => {

    })
    const navigate = useNavigate()

    const schema = yup.object().shape({
        genrename: yup.string().trim().min(4).required()
    })

    const {register, handleSubmit, reset} = useForm({
        resolver: yupResolver(schema)
    });

    function create(e){
        //method='POST' action='/api/genres'
        let genrename = e.genrename;
        fetch(`/api/genres`, {
            headers: {
                "Content-Type" : "application/json"
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({genrename: genrename})
        }).then(
            response => response.json()
        ).then(
            data => {navigate(data)}
        )
    }

    return (
        <>
            <h2 style={{margin: '20px', fontSize: '20px', fontWeight: 'bold'}}> <Link to={'/'} className='link'> Back to Home </Link> </h2>
            <form onSubmit={handleSubmit(create)}  style={{margin: 'auto', marginTop: '5vh', width: '40%', backgroundColor: 'burlywood', borderRadius: '9px'}}>
                <div className='inputgroup'>
                    <h2 style={{color: 'black'}}> Genre Name </h2><br/>
                    <input style={{width: '25vw'}} type='text' placeholder='Genre Name' {...register('genrename')}/><br/><br/><br/>
                    <button type='submit' style={{backgroundColor:'teal', color: 'black', padding: '10px'}}> Create Genre </button><br/><br/>

                </div>
            </form> <br/><br/><br/>

            <h2 style={{margin: 'auto', width: '25%'}}>
                <Link to={'/DeleteGenre'} style={{marginLeft: '20px'}} className='link'> Genre Deletion Page </Link> <br/><br/>
                <Link to={'/EditGenre'} style={{marginLeft: '20px'}} className='link'> Genre Edit Page </Link>
            </h2>
        </>
    )
}

export default Genre;