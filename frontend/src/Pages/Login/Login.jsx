import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import axios from 'axios'
import { AuthContext } from '../../Context/authContext';
import { useContext } from 'react';
import '../../CSS/Login.css'

const Login = () => {

    const { user, dispatch } = useContext(AuthContext);
    console.log(user)

    const navigate = useNavigate()

    const schema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required')
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmitHandler = async (data) => {
        try {
            let result = await axios.post('http://localhost:3000/api/auth/login', data)
            console.log(result.data);
            dispatch({ type: 'login success', payload: result.data })
            alert('Login Success')
            navigate('/')
        } catch (error) {
            if (error.response.data === 'Invalid Credentials') {
                alert('Invalid Credentials')
                console.log(error.response.data)
            }
            else {
                alert('Something went wrong')
                console.log(error)
            }
        }
        reset()
    }

    return (
        <div className='login'>
            <div className="login-card">
                <div className="login-left">
                    <h1>Ready to connect</h1>
                    <p>
                        Are you ready to connect with your friends and family?
                        Then you are at the right place.
                    </p>
                    <span>
                        Dont have an account?
                    </span>
                    <Link to='/register'>
                        <button className='registerbtn'>Sign Up</button>
                    </Link>
                </div>
                <div className="login-right">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <input type="text" placeholder='Username' name='username' {...register('username')} />
                        <p>{errors.username?.message}</p>
                        <input type="password" placeholder='Password' name='password' {...register('password')} />
                        <p>{errors.password?.message}</p>
                        <button type='submit' className='loginbtn'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login