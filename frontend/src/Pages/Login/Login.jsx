import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import axios from 'axios'
import { AuthContext } from '../../Context/authContext';
import { useContext, useState } from 'react';
import '../../CSS/Login.css'
import Loading from '../Loading/Loading'
import { toast } from 'react-toastify'

const Login = () => {
    const [loading, setLoading] = useState(false)

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate()

    const schema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required')
    })

    // const { register, handleSubmit, formState: { errors }, reset } = useForm({
    //     resolver: yupResolver(schema)
    // })
    const { register, handleSubmit, formState: reset } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmitHandler = async (data) => {
        setLoading(true)
        try {
            let result = await axios.post('http://localhost:3000/api/auth/login', data, {
                withCredentials: true,
            });
            dispatch({ type: 'login success', payload: result.data })
            toast.success("Congratulations! Lets Talk!!!", {
                position: toast.POSITION.TOP_CENTER,
                autoclose: 1000
            });
            setLoading(false)
            navigate('/')
        } catch (error) {
            if (error.response.data === 'Invalid Credentials') {
                toast.error("An error occured while logging you!!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoclose: 1000
                });
                setLoading(false);
                console.log(error.response.data)
            }
            else {
                alert('Something went wrong')
                setLoading(false)
                console.log(error)
            }
        }
        reset()
    }

    return (
        <div className='login'>
            {loading && <Loading />}
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
                        {/* <p>{errors.username?.message}</p> */}
                        <input type="password" placeholder='Password' name='password' {...register('password')} />
                        {/* <p>{errors.password?.message}</p> */}
                        <button type='submit' className='loginbtn'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login