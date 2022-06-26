import { useUserContext } from '../../contexts/UserContext'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import fetch from 'node-fetch';
import AllCard from "../../Components/Cards/AllCard ";
import SearchCard from "../../Components/Cards/SearchCard";
import CommentCard from "../../Components/Cards/CommentCard";
import Footer from "../../Components/Footer/Footer";

export default function User({ onAlert, token }) {
    const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";

    const navigate = useNavigate()
    const { logout } = useUserContext()

    const logoutHandler = () => {
        logout()
        navigate("/")
    }

    const location = useLocation();

    const [posts, setPosts] = useState([]);
    const [favoriteId, setFavoriteId] = useState([]);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);

    const [word, setWord] = useState("");
    const [searchFound, setSearchFound] = useState(false);
    const [searchData, setSearchData] = useState([]);

    const [comment, setComment] = useState("");
    const [commentId, setCommentId] = useState("");
    const [commentData, setCommentData] = useState([]);

    const [updateFeed, setFeed] = useState(0);

    const onChange = (e, save) => {
        save(e.target.value);
    }

    const handleIncrement = () => {
        if (page < (pages - 1)) {
            setPage(nextCount => nextCount + 1);
        }
    }

    const handleDecrement = () => {
        if (page !== 0) {
            setPage(prevCount => prevCount - 1);
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {

            const filters = { limit: 6, page: page };

            await fetch(`${BASE_URL}/post/all?limit=${filters.limit}&page=${filters.page}`, {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(resData => {
                    setPage(resData.page)
                    setPages(resData.pages)

                    setPosts([...resData.data.filter((del) => del._id !== posts._id)])
                })
                .catch(err => {
                    console.error('There has been a problem with your fetch operation:', err);
                });
        };

        const fetchFavorites = async () => {
            await fetch(`${BASE_URL}/post/fav`, {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(resData => {
                    setFavoriteId(resData.favorites)
                })
                .catch(err => {
                    console.error('There has been a problem with your fetch operation:', err);
                });
        };

        fetchPosts();
        fetchFavorites();
    }, [page, updateFeed, location]);

    const onLike = async (postId) => {
        await fetch(`${BASE_URL}/post/like/${postId}`, {
            "method": "PATCH",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    onAlert('error', 'An error has occurred');
                }
            })
            .catch(err => {
                console.error('There has been a problem with your fetch operation:', err);
            });

        setFeed(nextCount => nextCount + 1);
    }

    const onFavorite = async (postId) => {
        await fetch(`${BASE_URL}/post/fav/${postId}`, {
            "method": "PATCH",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    onAlert('error', 'An error has occurred');
                }
            })
            .catch(err => {
                console.error('There has been a problem with your fetch operation:', err);
            });

        setFeed(nextCount => nextCount + 1);
    }

    const ShowResults = (value1, value2) => {
        if (value1._id === value2) {
            return (<AllCard key={value1._id} value={value1} onLike={onLike} onFavorite={onFavorite} onComment={onComment} />)
        }
    }

    const onSubmitHandler1 = async (e) => {
        e.preventDefault();

        const found = posts.find(element => element.title === word);

        if (found) {
            onAlert('info', 'Post found');

            setSearchFound(true);

            posts.forEach(element => {
                if (element.title === word) {
                    setSearchData(element);
                }
            });
        } else {
            onAlert('warning', 'Post not found');

            setSearchFound(false);
        }

        setWord("");
    }

    const onSubmitHandler2 = async (e) => {
        e.preventDefault();

        await fetch(`${BASE_URL}/post/comment/${commentId}`, {
            "method": "PATCH",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${token}`
            },
            "body": `description=${comment}`
        })
            .then(response => {
                if (!response.ok) {
                    onAlert('error', 'An error has occurred');
                } else {
                    onAlert('success', 'Comment posted successfully');
                }
            })
            .catch(err => {
                console.error('There has been a problem with your fetch operation:', err);
            });

        setComment("");
        setCommentId("");
        navigate("/user");
        setCommentData([]);

        setFeed(nextCount => nextCount + 1);
    }

    const onCancelSearch = () => {
        setWord("");
        navigate("/user");
        setSearchFound(false);
        setSearchData([]);
        setFeed(nextCount => nextCount + 1);
    }

    const onComment = (value) => {
        setCommentId(value._id);
        setCommentData(value);
        navigate("/user/comment");
    }

    const onCancelComment = () => {
        setComment("");
        setCommentData([]);
        navigate("/user");
        setFeed(nextCount => nextCount + 1);
    }

    return (
        <section>
                <div className='justify-center items-center min-h-screen p-8 my-3'>
                    <div className=' justify-center'>
                        <h2 className='text-5xl '>User Dashboard</h2>
                        <button onClick={logoutHandler} className='border-2 border-green-600 text-green-600 w-24 h-8 rounded-xl my-3'>Log out</button>
                        {<Footer handleDecrement={handleDecrement} handleIncrement={handleIncrement} page={page} pages={pages} />}

                    </div>
                    <div className='mx-auto'>
                        <button onClick={() => navigate("/user")} className="mx-2 border-2 border-red-600  rounded-xl p-2 my-2  text-xl text-red-600 ">See all</button>
                        <button onClick={() => navigate("/user/favorite")} className="mx-2 border-2 border-red-600  rounded-xl p-2 my-2 text-xl  text-red-600">See all favorites ({favoriteId.length})</button>
                        <button onClick={() => navigate("/user/search")} className="mx-2 border-2 border-red-600  rounded-xl p-2 my-2 text-xl  text-red-600">Search post</button>
                    </div>
                    <div className='blur grid items-center justify-center p-1'>
                        {(location.pathname === '/user/search') && (<SearchCard onCancelSearch={onCancelSearch} onSubmitHandler1={onSubmitHandler1} onChange={onChange} word={word} setWord={setWord} />)}
                        {(location.pathname === '/user/comment') && (<CommentCard onCancelComment={onCancelComment} onSubmitHandler2={onSubmitHandler2} onChange={onChange} comment={comment} setComment={setComment} />)}
                        <hr />
                    
                        {(location.pathname === '/user') && (posts.map((value1) => (<AllCard key={value1._id} value={value1} onLike={onLike} onFavorite={onFavorite} onComment={onComment} />)))}
                        {(location.pathname === '/user/favorite') && (posts.map((value1) => (favoriteId.map((value2) => (ShowResults(value1, value2))))))}
                        {(location.pathname === '/user/search') && (searchFound) && (<AllCard key={searchData._id} value={searchData} onLike={onLike} onFavorite={onFavorite} onComment={onComment} />)}
                        {(location.pathname === '/user/comment') && (<AllCard key={commentData._id} value={commentData} onLike={onLike} onFavorite={onFavorite} onComment={onComment} />)}
                        <hr />
                        {<Footer handleDecrement={handleDecrement} handleIncrement={handleIncrement} page={page} pages={pages} />}
                        <hr />
                    </div>
        
                </div>
        </section>
    )

}