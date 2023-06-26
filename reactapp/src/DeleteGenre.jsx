import { useNavigate, Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useQuery, useMutation} from '@tanstack/react-query'

import  {Box, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon } 
    from '@chakra-ui/react'
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function DeleteGenre(){
    const navigate = useNavigate()

    const [genres, setGenres] = useState([])
    const [id, setID] = useState([])

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

    function del(e){
        fetch(`/api/genres/${e.genreID}`, {method: 'DELETE'})
        .then(
            response => response.json()
        ).then(
            data => {navigate(data)}
        )
    }

    const schema = yup.object().shape({
        genreID: yup.number().typeError('genreID must be a NUMBER').positive().integer().test({
            test(value, ctx){
                if (!id.includes(Number(value))){
                    return ctx.createError({message: 'ID cannot be found in the Genre Database'})
                }
                return true
            }
        }).required('')
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    return (
        <>
        <h2 style={{margin: '20px', fontWeight: 'bold', fontSize: '20px'}}> <Link to={'/NewGenre'} className='link'> Back to Create Genre </Link> </h2>
        <div>
            <form onSubmit={handleSubmit(del)} style={{margin: 'auto', borderRadius: '9px', marginTop: '5vh', width: '25%', backgroundColor: 'burlywood'}}>
                <div className='inputgroup'>
                    <h2 style={{color: 'red'}}> {errors.genreID?.message} <br/> </h2>
                    <h2 style={{color: 'black', fontSize: '20px', fontWeight: 'bold'}}> Genre ID to Delete </h2><br/>
                    <input {...register('genreID')} type='text' placeholder='Genre ID'/><br/><br/><br/>
                    <button type='submit' style={{color: 'black', backgroundColor: 'teal', padding: '15px'}}> Delete Genre </button><br/><br/>  

                </div>
            </form> 

            <Accordion maxW='20vw' style={{marginLeft: '2vw', marginTop: '15vh', width:'20vw', backgroundColor: 'azure', borderRadius: '9px', padding:'10px', position: 'absolute', top:'1vh'}} allowToggle>
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
            </div>
        </>
    )

}

export default DeleteGenre;