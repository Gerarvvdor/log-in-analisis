import { useUserContext } from '../../contexts/UserContext'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import fetch from 'node-fetch';
import CommentsCard from "../../Components/Comments/Comments"
import CommentCard from '../../Components/Comments/Comments';

const Comments = ({ onAlert, token }) => {
    const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";

    const { logout } = useUserContext()

    const logoutHandler = () => {
        logout()
        navigate("/")
    }
    const navigate = useNavigate();

    const { id } = useParams();
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            await fetch(`${BASE_URL}/post/one/${id}`, {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(resData => {
                    if (!resData.error) {
                        setPost(resData.comments)
                    }
                })
                .catch(err => {
                    console.error('There has been a problem with your fetch operation:', err);
                });
        };

        fetchPost();
    }, []);

    return (
        <div>
            <button onClick={() => navigate("/")}>Go back</button>
            <button onClick={logoutHandler}>Log out</button>
            <hr />
            {( (post.length >= 1) && (post.map((value) => (<CommentCard key={value._id} value={value} />))))}
            {( (post.length <= 0) && (<p>This post does not have comments</p>))}
        </div>
    );
};

export default Comments;