import { Link } from "react-router-dom";

const AllCard = ({ value, onLike, onFavorite, onComment}) => {
    const url = `/user/comments/${value._id}`;

    return (
            <div>
                <hr />
                    <div >
                        <div className="bg-green-300 rounded-t-xl max-w-full	">
                            <p className="text-6xl ml-3 my-2">{value.title}</p>
                            <p className="text-xl ml-3 my-2">{value.description}</p>
                        </div>
                    
                    <a href={value.image} target="_blank" rel="noreferrer">
                        <img className="mx-auto" src={value.image} alt={value.title + " picture"} width="400" />
                    </a>
                        <div className="bg-blue-400 rounded-b-xl max-w-full	">
                            <button onClick={() => onLike(value._id)} className="m-1 ml-3"><svg class="text-red-600 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg></button>
                            <button onClick={() => onComment(value)} className="m-1"><svg class="text-blac w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg></button>
                            <button onClick={() => onFavorite(value._id)} className="m-1"><svg class=" text-yellow-500 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg></button>
                                
                            <p className="text-xl mx-3">Likes: {value.likes.length}</p>
                            <p className="text-xl mx-3"><Link to={url}>Comments:</Link> {value.comments.length}</p>
                        </div>
                    </div>
            </div>
        );
};

export default AllCard;