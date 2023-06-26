import React  from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import {useQuery, useMutation} from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {Button} from '@chakra-ui/react'

import './App.css'


function NewMovie({props}){
    const navigate = useNavigate()

    const schema = yup.object().shape({
        name: yup.string().trim().min(5).required('Minimum of 5 characters for name'),
        genre: yup.string().trim().notOneOf([yup.ref('Choose a Genre')]).required('Choose an actual Genre'),
        year: yup.number().integer('Year must be an INTEGER, not a DECIMAL').typeError('Year must be a NUMBER, not a STRING').positive().max(9000).required('Year must be positive and a max of 9000')
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });


    const genresQuery = useQuery({
        queryKey: ['genres'],
        queryFn: async () => {
            return (fetch(`/api/movies/new`).then(
                repsonse => repsonse.json()
               ).then(
                data => {
                    //setGenres(data)
                    return data;
                }
               ))
        }
    })

    if (genresQuery.isLoading){
        return (
            <>
                <h1> Retrieving All genres from SQLITE3 Database. </h1>
            </>
        )
    } if (genresQuery.isError){
        return (
            <>
                <h1> Failed to retrieve genres from SQLITE3 Database. </h1>
                <h2 style={{margin: '20px'}}> <Link to={'/'} className='link'> Back to Home </Link> </h2>

            </>
        )
    }

    function submit(e){
        fetch(`/api/movies/new`, {
            headers: {
                'Content-Type' : 'application/json',
            },
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(e)
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            navigate(data)})

    }


    return(
            <>
            <h2 className='link' style={{margin: '20px', color: 'white', fontWeight: 'bold', fontSize: '20px'}}> <Link to={'/'}> Back to Home </Link> </h2>
            <h2 style={{color: 'red', margin: 'auto', width: '33%'}} > {errors.year?.message || errors.genre?.message || errors.name?.message} </h2>
            <form style={{margin: 'auto', marginTop: '5vh', width: '33%', backgroundColor: 'burlywood', padding: '15px', borderRadius: '9px' }} onSubmit={handleSubmit(submit)}>
            <h2 className='header' style={{fontWeight: 'bold', fontSize: '20px'}}> Create a Movie! </h2> 
                <div className='inputgroup'>
                    <span style={{color:'black'}}>Movie Name</span> <br/><br/>
                    <input {...register('name')} style={{width: '20vw'}} type='text' placeholder='Movie Name'/><br/><br/><br/>

                    <span style={{color:'black'}}>Movie Genre</span> <br /><br />
                    <select {...register('genre')} style={{padding: '5px', borderRadius: '9px'}}> 
                        <option value=""> Choose a Genre </option>
                        {
                            genresQuery.data.map((genre, key) => {
                                return <option type='text' value={genre.genreID}> {genre.name} </option>
                            })
                        }
                    </select><br /> <br />

                    <span style={{color:'black'}}>Year</span> <br /><br />
                    <input {...register('year')} type='text' placeholder='Year' /><br/><br/><br/>    

                    <Button colorScheme='teal' style={{backgroundColor: 'teal', padding: '10px'}} size='lg' type='submit'> Create Movie </Button> 
                </div>
            </form>
            </>

    )
}

export default NewMovie;