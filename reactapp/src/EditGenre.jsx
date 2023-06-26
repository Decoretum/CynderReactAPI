import { Link, json } from "react-router-dom";
import { Card, CardHeader, CardBody, 
    CardFooter, Heading, StackDivider, Stack, Box, Text, Divider, Input, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon } 
    from '@chakra-ui/react'

import React  from 'react';
import { useState, useEffect } from 'react';
import './App.css'
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form'
import {useQuery, useMutation} from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

function EditGenre(){
    const [genres, setGenres] = useState([])
    const [id, setID] = useState([])

    const schema = yup.object().shape({
        name: yup.string().trim().min(5).required('Minimum of 5 Characters for the name'),
        genreID: yup.number().typeError('GenreID must be a NUMBER').integer('GenreID must be an INTEGER').test({
            test(value, ctx){
                 if (Number(value) < 0){
                    return ctx.createError({message: 'GenreID MUST be a POSITIVE number'})
                }
                return true
            }
        }).positive().max(9000).test({
            test(value, ctx){
                if (!id.includes(Number(value))){
                    return ctx.createError({message: 'GenreID input is not part of the Genre Database!'})
                }
                return true
            }
        }).required('GenreID can only be a positive number')
    })

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const navigate = useNavigate()
    useEffect(() => {
        
    })

    const genreQuery = useQuery({
        queryKey: ['genres'],
        queryFn: async () => {
            return fetch(`api/genres/`)
            .then(response => response.json())
            .then(genres => {
                setGenres(genres)
                genres.map((genre) => {
                    setID(id => [...id, genre.genreID])
                })
                return genres
            })
        }
    })



    function create(e){
        let genreID = e.genreID;
        schema.validate(e)
        fetch(`api/genres/${genreID}`, {
            headers:{
                "Content-Type" : "application/json"
            },
            mode: 'cors',
            method: 'PUT',
            body: JSON.stringify(e)
        }).then(
            response => response.json()
        ).then(
            jsonized => {
                navigate(jsonized)
            }
        )
    }

    if (genreQuery.isLoading){
        return <h1> Loading Genres from SQLITE3 </h1>
    } if (genreQuery.isError){
        return <h1> Failed to load Genres from SQLITE3, Database connection error </h1>
    }

    return(
        <>  
            <form onSubmit={handleSubmit(create)} style={{padding: '15px', margin: '15px', backgroundColor: 'burlywood', width: '50%', borderRadius: '9px'}}>
            <h2> Edit a Genre </h2> <span> {errors.name?.message || errors.genreID?.message} <br/> </span> <br/>
                <Stack width={'40vw'} spacing={5}>
                    <h2> Genre ID </h2>
                    <Input style={{height: '5vh', borderRadius: '9px', padding: '10px'}} {...register('genreID')} variant='outline' placeholder="Genre ID" /><br/>
                    <h2> New Name </h2>
                    <Input style={{height: '5vh', borderRadius: '9px', padding: '10px'}} {...register('name')} variant='outline' placeholder="New Genre Name" />
                </Stack> <br/>
                <button> Submit </button>
                <Link to={'/NewGenre'} style={{marginLeft: '20px', color: 'black'}} className='link'> Back </Link>
            </form>

            
            <Accordion maxW='20vw' style={{marginLeft: '3vw', backgroundColor: 'azure', borderRadius: '9px'}} allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{bg: 'tomate'}}>
                            <Box as="span" flex={1} textAlign='left'>
                                Genre IDs
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                        <AccordionPanel pb={5} style={{marginLeft: '3vw'}}>
                            {genres.map((genre) => {
                                return (
                                <>
                                <br/>
                                <span> Genre ID: {genre.genreID} </span><br/>
                                <span> Name: {genre.name} </span> <br/><br/>
                                </>
                                )
                                
                                
                            })}
                        </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </>
    )
}

export default EditGenre;