import './Signup.css';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { SIGNUP } from '../../../Apis';
import {useAuth} from '../../../Context/AuthContext.js';
import Cookies from 'js-cookie';
import { useState } from 'react';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';

export default function Signup(){
  const {isLoggedIn} = useAuth();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          password: '',
        },
        onSubmit: async values => {
            try{
                setIsLoading(true);
                const res = await axios.post(SIGNUP, values);
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
                setIsLoading(false);
            }
        },
      });

    return(
        isLoggedIn ? 
        <div className=''>
            <p>as</p>
            <p>as</p>
        </div>
        :
        <div className='signup'>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Your Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
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
                {   isLoading ?
                    <LoadingSpinner /> :
                    <button type="submit">Signup</button>
                }
                <p>already have an account? <Link to='/login'>Login</Link></p>
            </form>
        </div>
    )
}