const EditCard = ({ onSubmitHandler2, onChange, onCancelEditData, title, setTitle, description, setDescription, image, setImage }) => {
    return (
        <>
            <main>
                <h3 className="text-4xl">Edit Post</h3>
                <form onSubmit={onSubmitHandler2}>
                    <input className="m-1	bg-transparent  text-black	border-2 border-green-500 rounded-xl text-center"
                        type='text'
                        required
                        placeholder='e.g. title'
                        minLength="8"
                        maxLength="12"
                        onChange={(e) => onChange(e, setTitle)}
                        value={title}
                    />

                    <input className="m-1	bg-transparent  text-black	border-2 border-green-500 rounded-xl text-center"
                        type='text'
                        required
                        placeholder='e.g. description'
                        minLength="8"
                        onChange={(e) => onChange(e, setDescription)}
                        value={description}
                    />

                    <input className="m-1	bg-transparent  text-black	border-2 border-green-500 rounded-xl text-center"
                        type="url"
                        required
                        placeholder="e.g image"
                        onChange={(e) => onChange(e, setImage)}
                        value={image}
                    />
                    <button type="submit" className="text-white mx-1.5 bg-green-600 w-24 h-8 rounded-xl" >Edit</button>
                    <button onClick={() => onCancelEditData()} className="text-white mx-1.5 bg-red-600 w-24 h-8 rounded-xl	">Cancel</button>
                </form>
            </main>
        </>
    );
};

export default EditCard;