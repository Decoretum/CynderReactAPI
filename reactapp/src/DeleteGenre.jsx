import { useNavigate, Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';

function DeleteGenre(){
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()

    function del(e){
        fetch(`/api/genres/${e.genreID}`, {method: 'DELETE'})
        .then(
            response => response.json()
        ).then(
            data => {navigate(data)}
        )
    }

    return (
        <>
        <h2 style={{margin: '20px'}}> <Link to={'/NewGenre'} className='link'> Back to Create Genre </Link> </h2>
            <form onSubmit={handleSubmit(del)} style={{margin: 'auto', marginTop: '5vh', width: '25%'}}>
                <div className='inputgroup'>
                    <h2 style={{color: 'white'}}> Genre ID to Delete </h2><br/>
                    <input {...register('genreID')} type='text' placeholder='Genre ID'/><br/><br/><br/>
                    <button type='submit'> Delete Genre </button>

                </div>
            </form> 
        </>
    )

}

export default DeleteGenre;