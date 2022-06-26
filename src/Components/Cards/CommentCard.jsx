const EditCard = ({onCancelComment, onSubmitHandler2, onChange, comment, setComment}) => {
    return (
        <>
            <main>
                <h3 className="text-2xl">Comment post</h3>
                <form onSubmit={onSubmitHandler2}>
                    <input className="p-1"
                        type='text'
                        required
                        placeholder='e.g. title'
                        minLength="8"
                        onChange={(e) => onChange(e, setComment)}
                        value={comment}
                    />

                    <button className="border-2 border-blue-600 text-blue-600 rounded-xl mx-1 p-1" type="submit">Comment</button>
                    <button className="border-2 border-red-600 text-red-600 rounded-xl mx-1 p-1" onClick={() => onCancelComment()}>Cancel</button>
                </form>
            </main>
        </>
    );
};

export default EditCard;