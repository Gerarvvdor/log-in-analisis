import { Link } from "react-router-dom";

const OwnedCard = ({ value, toggleActive, onEditData }) => {
    const url = `/admin/comments/${value._id}`;

    return (
        <div className='grid items-center justify-center p-8'>
            <div>
                <hr  />
                    <div className="bg-green-300 rounded-t-xl">
                        <p className="text-6xl ml-3 my-2">{value.title}</p>
                        <p className="text-xl ml-3 my-2">{value.description}</p>
                    </div>
                <a href={value.image} target="_blank" rel="noreferrer">
                    <img className="mx-auto" src={value.image} alt={value.title + " picture"} width="400"  />
                </a>
                    <div className="bg-blue-400 rounded-b-xl">
                        <p className="text-xl mx-3">Active: {value.active ? "True" : "False"}</p>
                        <p className="text-xl mx-3">Likes: {value.likes.length}</p>
                        <p className="text-xl mx-3"><Link to={url}>Comments:</Link> {value.comments.length}</p>
                        <button onClick={() => onEditData(value._id, value.title, value.description, value.image)} className="border-2 border-black rounded-2xl mx-2 my-2 p-2">Edit post</button>
                        <button onClick={() => toggleActive(value._id)} className="border-2 border-black rounded-2xl mx-2 my-2 p-2">Toggle Active</button>
                    </div>
            </div>
        </div>
    );
};

export default OwnedCard;