const PostCard = ({ onSubmitHandler1, onChange, title, setTitle, description, setDescription, image, setImage }) => {

    return (
        <>
            <main className="p-4 ">
                <h3 className="text-2xl	">Upload Post</h3>
                <form onSubmit={onSubmitHandler1}>
                    <input className="m-1	bg-transparent  text-black border-2 border-green-500 rounded-xl text-center "
                        type='text'
                        required
                        placeholder='e.g. title'
                        minLength="8"
                        maxLength="12"
                        onChange={(e) => onChange(e, setTitle)}
                        value={title}
                    />

                    <input className="m-1	bg-transparent  text-black	border-2 border-green-500 rounded-xl text-center "
                        type='text'
                        required
                        placeholder='e.g. description'
                        minLength="8"
                        onChange={(e) => onChange(e, setDescription)}
                        value={description}
                    />

                    <input className="m-1	bg-transparent  text-black	border-2 border-green-500 rounded-xl text-center "
                        type="url"
                        required
                        placeholder="e.g image"
                        onChange={(e) => onChange(e, setImage)}
                        value={image}
                    />
                    <button className="border-blue-500 border-2 rounded-xl p-1" type="submit">Publish</button>
                </form>
            </main>
        </>
    );
};

export default PostCard;