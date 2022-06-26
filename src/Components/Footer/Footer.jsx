const Footer = ({ handleDecrement, handleIncrement, page, pages }) => {
    return (
        <div>
            <button onClick={handleDecrement} className="m-1.5 text-yellow-600  p-1.5 rounded-xl">Previous<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg></button>
            <button onClick={handleIncrement} className="m-1.5 text-yellow-600  p-1.5 rounded-xl">Next<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></button>
            <p className="m-1">{"Page " + (page + 1) + " of " + pages}</p>
        </div>
    );
};

export default Footer;