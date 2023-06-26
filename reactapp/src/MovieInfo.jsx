import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { Card, CardHeader, CardBody, 
    CardFooter, Heading, StackDivider, Stack, Box, Text, Divider } 
    from '@chakra-ui/react'

function MovieInfo (){
    let data = useLocation() //Gets Data stored from the State Props from the Link element from a react component
    let pathname = data.pathname; //gets pathname of URL
    const [movie, setMovie] = useState({}) 
    const [genre, setGenre] = useState({})

    const navigate = useNavigate()
    async function del(){
        fetch(`/api/movies/${pathname}`, {method: 'DELETE'}).then(()=>{
            navigate('/')
        })
    }

    useEffect(() => {console.log(data)}, [])

    const movieQuery = useQuery({
        queryKey: ['moviedata'],
        queryFn: async () => {
            return fetch(`/api/movies/${pathname}`).then(
            response => response.json()
        ).then(
            data => {
                console.log(data)   
                setMovie(data[0]);
                setGenre(data[1])
                return data[0]
            }
        )
        }
    })

    let moviedata = movieQuery.data;

    if (movieQuery.isLoading){
        return <h1> Loading Movie Data! </h1>
    }

    if (movieQuery.isError){
        return (
            <>
                <h1> Cannot load Movie data! </h1>
                <p style={{display: 'inline'}}> <Link to={'/'} className="link" style={{color: 'green', backgroundColor:'yellow', borderRadius: '9px', padding: '10px'}}> Back to Home </Link></p>
            </>
            )
    }

    return(
        <>  
            <div className="moviecontainer" style={{backgroundColor: 'azure'}}>

                <Card variant='outline' style={{border: 'solid 2px', borderRadius: '9px', backgroundColor:'beige', padding: '15px'}} maxW='50vw'>
                    <CardHeader>
                        <Heading size='lg' style={{fontWeight: 'bold', fontSize: '20px'}}> Movie Information </Heading>
                    </CardHeader> <br/>
                    <CardBody marginTop={'2vh'}>
                        <Stack divider={<StackDivider />} spacing='5'> 
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Movie Name
                                </Heading>
                                <Text pt='2' fontSize='md'> 
                                    {moviedata.name}
                                </Text>
                            </Box>
                            <Box style={{marginTop: '2vh'}}>
                                <Heading size='xs' textTransform='uppercase'>
                                        Movie Genre
                                    </Heading>
                                    <Text pt='2' fontSize='md'> 
                                        {genre.name}
                                    </Text>
                            </Box>
                            <Box style={{marginTop: '2vh'}}>
                            <Heading size='xs' textTransform='uppercase'>
                                    Movie Year
                                </Heading>
                                <Text pt='2' fontSize='md'> 
                                    {moviedata.year}
                                </Text>
                            </Box><br/>

                        </Stack>

                    </CardBody>

                </Card> <br/><br/>
                
                <p style={{display: 'inline'}}> <Link to={'/'} className="link" style={{color: 'black', backgroundColor:'burlywood', borderRadius: '9px', padding: '10px'}}> Back to Home </Link></p>
                <p style={{display: 'inline', marginLeft: '2vw'}}> <Link to={`${pathname}/edit`} className="link" style={{color: 'black', backgroundColor:'burlywood', borderRadius: '9px', padding: '10px'}}> Edit </Link></p>
                <p style={{display: 'inline', marginLeft: '2vw'}}> <Link onClick={del} className="link" style={{color: 'black', backgroundColor:'burlywood', borderRadius: '9px', padding: '10px'}}> Delete </Link></p>

            <br/><br/>
            </div> 
        </>
    )

}

export default MovieInfo;