import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useUserContext } from '../../contexts/UserContext';

export default function Login({ onAlert }) {
    const { login, token } = useUserContext();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const onChange = (e, save) => {
        save(e.target.value);
    }



    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const logged = await login(username, password);

        setError(!logged);
        setUsername("");
        setPassword("");

        if (!token && error) {
            onAlert('error', 'An error has occurred at login')
        }
    }

    if (token && !error) {
        onAlert('success', 'Signed in successfully')
        return <Navigate replace to="/redirect" />
    }

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <main className="relative  leading-none	p-3.5 rounded-xl border-2 border-blue-400">
                <form onSubmit={onSubmitHandler}>
                    <h2 className="flex justify-center items-center p-3.5 text-5xl	">POSTS PW2021 API - GP16</h2>

                    <input className="m-3.5 min-w-max h-8 rounded-xl bg-transparent	border-2 border-blue-400 pd-3.5 text-center "
                        type='text'
                        required
                        value={username}
                        placeholder='e.g. username'
                        onChange={(e) => onChange(e, setUsername)}
                    />

                    <input className="m-3.5 min-w-max h-8 rounded-xl bg-transparent	border-2 border-blue-400 pd-3.5  text-center "
                        type="password"
                        required
                        placeholder="e.g password"
                        onChange={(e) => onChange(e, setPassword)}
                        value={password}
                    />
                        <button className="text-white mx-3.5 bg-green-600 w-24 h-8 rounded-xl	">Login</button>
    
                    </form>
                </main>
                </div>
    );
}