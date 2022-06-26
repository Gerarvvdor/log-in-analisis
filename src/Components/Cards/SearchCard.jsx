const EditCard = ({onCancelSearch, onSubmitHandler1, onChange, word, setWord}) => {
    return (
        <>
            <main>
                <h3 className="text-2xl">Search Post by title</h3>
                <form onSubmit={onSubmitHandler1}>
                    <input className="text-2xl"
                        type='text'
                        required
                        placeholder='e.g. title'
                        minLength="8"
                        maxLength="12"
                        onChange={(e) => onChange(e, setWord)}
                        value={word}
                    />

                    <button type="submit" className="m-2"><svg class="text-blue-600 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                    <button onClick={() => onCancelSearch()} className="m-2"><svg class="text-red-600 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>
                </form>
            </main>
        </>
    );
};

export default EditCard;