// /* eslint-disable react/no-unescaped-entities */

// import { Link, useNavigate } from 'react-router-dom'

// const Login = () => {

//     const navigate = useNavigate()

//     const { login } = useContext(AuthContext);
//     const [inputs, setInputs] = useState({
//         username: "",
//         password: "",
//     });
//     const [err, setErr] = useState(null);

//     const handleChange = (e) => {
//         setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             await login(inputs);
//             navigate('/')

//         } catch (err) {
//             setErr(err.response.data)

//         }

//     }

//     return (
// <div className='login'>
//     <div className="login-card">
//         <div className="login-left">
//             <h1>Ready to connect</h1>
//             <p>
//                 Are you ready to connect with your friends and family?
//                 Then you are at the right place.
//             </p>
//             <span>
//                 Don't have an account?
//             </span>
//             <Link to='/register'>
//                 <button className='registerbtn'>Sign Up</button>
//             </Link>
//         </div>
//         <div className="login-right">
//             <h1>Login</h1>
//             <form>
//                 <input type="text" placeholder='Username' name='username' onChange={handleChange} />
//                 <input type="password" placeholder='Password' name='password' onChange={handleChange} />
//                 {err && err}
//                 <button onClick={handleLogin} className='loginbtn'>Login</button>
//             </form>
//         </div>
//     </div>
// </div>
//     );
// }

// export default Login;
