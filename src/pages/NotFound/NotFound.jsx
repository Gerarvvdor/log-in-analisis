import { MdErrorOutline } from "react-icons/all";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate()

    const onClick = (e) => {
        navigate('/')
    }

    return (
        <div>
            <MdErrorOutline />
            <h2>Error 404</h2>
            <h3>Page not found</h3>
            <p>The page you are looking for doesn't exist or an other error occurred</p>
            <button onClick={(e) => onClick(e)}>Go to Login</button>
        </div>
    );
}

export default NotFound;