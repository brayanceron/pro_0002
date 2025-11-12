import { useNavigate } from 'react-router';
import SongForm from '../../components/forms/SongForm'
import type { reqProps } from '../../hooks/usePost';

const POST = () => {
    const navigate = useNavigate();

    function cb({ result, error, res }: reqProps) { 
        if (error) { return alert(error.message); }
        if (res && res.status == 200){ return navigate(`/song/get/${result.id}`); }
        alert("Operation not completed");
    }

    return (
        // <div className='w-1/4 h-screen mt-15 mx-auto'>
        <div className='w-1/3 h-screen mt-15 mx-auto'>
        {/* <div className='w-1/2 h-screen mt-15 mx-auto'> */}
            <SongForm url='http://localhost:5000/api/song' callback={cb}/>
        </div>
    )
}

export default POST
