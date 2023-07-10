import { useContext } from 'react';
import '../../CSS/Login.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/authContext';

const Login = () => {

    const {login} = useContext(AuthContext);

    const handleLogin = () =>{
        login();
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
                    Don't have an account?
                </span>
                <Link to='/register'>
                <button className='registerbtn'>Sign Up</button>
                </Link>
            </div>
            <div className="login-right">
                <h1>Login</h1>
                <form>
                    <input type="text" placeholder='Username' />
                    <input type="password" placeholder='Password' />
                    <button onClick={handleLogin} className='loginbtn'>Login</button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default Login;