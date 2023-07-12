import '../../CSS/SignUp.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import { toast } from 'react-toastify'
const SignUp = () => {

    const navigate = useNavigate();

    const schema = yup.object().shape({
        username: yup.string().required('Username is required'),
        email: yup.string().email('Email is invalid').required('Email is required'),
        fullname: yup.string().required('Fullname is required'),
        password: yup
            .string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[0-9]/, 'Password must contain a number.')
            .matches(/[A-Z]/, 'Password must contain an uppercase letter.')
            .matches(/[a-z]/, 'Password must contain a lowercase letter.')
            .matches(/[^\w]/, 'Password must contain a special character.')
            .required('Password is required'),
        cpassword: yup
            .string()
            .required('Confirm Password is required')
            .oneOf([yup.ref('password'), null], 'Passwords must match')

    })
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmitHandler = async (data) => {
        try {
            let result = await axios.post('http://localhost:3000/api/auth/register', data)
            console.log(result.data);
            toast.success("Congratulation! Please Login to your account to proceed", {
                position: toast.POSITION.TOP_CENTER,
                autoclose: 1000
            });
            navigate('/login')
        } catch (error) {
            if (error.response.data === 'User already exists') {
                toast.error("User already exists", {
                    position: toast.POSITION.TOP_CENTER,
                    autoclose: 1000
                });
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
        <div className='signup'>
            <div className="signup-card">
                <div className="signup-left">
                    <h1>Ready to connect</h1>
                    <p>
                        Are you ready to connect with your friends and family?
                        Then you are at the right place.
                    </p>
                    <span>
                        Already have an account?
                    </span>
                    <Link to='/login'>
                        <button className='loginbtn'>Login</button>
                    </Link>
                </div>
                <div className="signup-right">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <input
                            type="text"
                            placeholder='Username'
                            name="username"
                            id="username"
                            {...register('username')}
                        />
                        <p>{errors.username?.message}</p>
                        <input
                            type="email"
                            placeholder='Email'
                            name="email"
                            id='email'
                            {...register('email')}
                        />
                        <p>{errors.email?.message}</p>
                        <input
                            type="text"
                            placeholder='FullName'
                            name="fullname"
                            id="fullname"
                            {...register('fullname')}
                        />
                        <p>{errors.fullname?.message}</p>
                        <input
                            type="password"
                            placeholder='Password'
                            name="password"
                            id="password"
                            {...register('password')}
                        />
                        <p>{errors.password?.message}</p>
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            name="cpassword"
                            id="cpassword"
                            {...register('cpassword')}
                        />
                        <p>{errors.cpassword?.message}</p>
                        <button className='registerbtn'>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp


// const SignUp = () => {
//     const [inputs, setInputs] = useState({
//         username: "",
//         email: "",
//         password: "",
//         name: "",
//     });
//     const [err, setErr] = useState(null);

//     const handleChange = (e) => {
//         setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleRegister = async (e) => {
//         e.preventDefault();

//         try {
//             await axios.post("http://localhost:3000/api/auth/register", inputs);
//         } catch (err) {
//             setErr(err.response.data);
//         }
//     };