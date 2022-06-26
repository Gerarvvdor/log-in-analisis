import { useUserContext } from '../../contexts/UserContext';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import fetch from 'node-fetch';
import OwnedCard from "../../Components/Cards/OwnedCard";
import PostCard from '../../Components/Cards/PostCard';
import EditCard from '../../Components/Cards/EditCard';
import Footer from "../../Components/Footer/Footer";

export default function Admin({ onAlert, token }) {
    const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";

    const navigate = useNavigate()
    const { logout } = useUserContext()

    const logoutHandler = () => {
        logout()
        navigate("/")
    }

    const location = useLocation();

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);

    const [updateFeed, setFeed] = useState(0);

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

    const onChange = (e, save) => {
        save(e.target.value);
    }

    const onSubmitHandler1 = async (e) => {
        e.preventDefault();

        await fetch(`${BASE_URL}/post/create`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${token}`
            },
            "body": `title=${title}&description=${description}&image=${image}`
        })
            .then(response => {
                if (!response.ok) {
                    onAlert('error', 'An error has occurred while Posting');
                } else {
                    onAlert('success', 'Post created successfully');
                }
            })
            .catch(err => {
                console.error('There has been a problem with your fetch operation:', err);
            });

        setTitle("");
        setDescription("");
        setImage("");

        setPage(0);
    }

    const onSubmitHandler2 = async (e) => {
        e.preventDefault();

        await fetch(`${BASE_URL}/post/update/${id}`, {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${token}`
            },
            "body": `title=${title}&description=${description}&image=${image}`
        })
            .then(response => {
                if (!response.ok) {
                    onAlert('error', 'An error has occurred while Updating');
                    console.log("error")
                } else {
                    onAlert('success', 'Post updated successfully');
                    console.log("good")
                }
            })
            .catch(err => {
                console.error('There has been a problem with your fetch operation:', err);
            });

        setId("");
        setTitle("");
        setDescription("");
        setImage("");

        navigate("/admin");

        setFeed(nextCount => nextCount + 1);
    }

    useEffect(() => {
        const fetchPosts = async () => {

            const filters = { limit: 6, page: page };

            await fetch(`${BASE_URL}/post/owned?limit=${filters.limit}&page=${filters.page}`, {
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

        fetchPosts();
    }, [page, updateFeed]);

    const toggleActive = async (postId) => {
        await fetch(`${BASE_URL}/post/toggle/${postId}`, {
            "method": "PATCH",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    onAlert('error', 'An error has occurred while updating post');
                } else {
                    onAlert('success', 'Post updated successfully');
                }
            })
            .catch(err => {
                console.error('There has been a problem with your fetch operation:', err);
            });

        setFeed(nextCount => nextCount + 1);
    }

    const onEditData = (id, title, description, image) => {
        setId(id);
        setTitle(title);
        setDescription(description);
        setImage(image);

        navigate("/admin/edit");
    }

    const onCancelEditData = () => {
        setId("");
        setTitle("");
        setDescription("");
        setImage("");

        navigate("/admin");
    }

    return (
        <section>
            <div className="justify-center items-center min-h-screen mx-8 my-2 ">
                <h2 className='text-5xl '>Admin Dashboard</h2>
                <button onClick={logoutHandler} className='border-2 border-green-600 text-green-600 w-24 h-8 rounded-xl my-3'>Log out</button>
                {<Footer handleDecrement={handleDecrement} handleIncrement={handleIncrement} page={page} pages={pages} />}
                <div>
                    {(location.pathname === '/admin') && (<PostCard onSubmitHandler1={onSubmitHandler1} onChange={onChange} title={title} setTitle={setTitle} description={description} setDescription={setDescription} image={image} setImage={setImage} />)}
                    {(location.pathname === '/admin/edit') && (<EditCard onSubmitHandler2={onSubmitHandler2} onChange={onChange} onCancelEditData={onCancelEditData} id={id} title={title} setTitle={setTitle} description={description} setDescription={setDescription} image={image} setImage={setImage} />)}
                </div>
                {posts.map((value) => (
                    <OwnedCard key={value._id} value={value} toggleActive={toggleActive} onEditData={onEditData} />
                ))}
                <hr />
                {<Footer handleDecrement={handleDecrement} handleIncrement={handleIncrement} page={page} pages={pages} />}
                <hr />

            </div>
        </section>
    )
}