const CommentCard = ({value}) => {
    return (
        <div className="block container mx-auto my-10">
            <p className="text-3xl">User: {value.user.username}</p>
            <p className="text-xl mx-10 border-b-4 border-green-500">User: {value.description}</p>
            <hr />
        </div>
    );
};

export default CommentCard;