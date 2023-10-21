import { Link } from 'react-router-dom';
import './Login.css';
import { useFormik } from 'formik';
import { LOGIN } from '../../../Apis';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../../../Context/AuthContext';
import { useState } from 'react';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';

export default function Login(){
    const {isLoggedIn} = useAuth();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
            initialValues: {
            email: '',
            password: '',
            },
            onSubmit: async (values, e) => {
                e.preventDefault();
                try{
                    setIsLoading(true);
                    const res = await axios.post(LOGIN, values);
                    const token = res.data.data.token;
                    const email = res.data.data.email;
                    const role = res.data.data.role;
                    Cookies.set('token', token)
                    Cookies.set('email', email)
                    Cookies.set('role', role)
                    setError(null)
                    setIsLoading(false);
                    window.location.pathname = '/';
                }catch(err){
                    setError(err.response.data.message)
                }
            },
        });

    return(
        isLoggedIn ? 
        <p>You are logged in</p> :
        <div className='login'>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {
                    error && <p className='err'>{error}</p>
                }
                {isLoading ?
                <LoadingSpinner /> :
                <button type="submit">Login</button>
                }
                <p>Don't have an account? <Link to='/signup'>Signup</Link></p>
            </form>
        </div>
    )
}