import { useState } from 'react'
import '../../CSS/SignUp.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {

    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        fullname: '',
        password: '',
        cpassword: ''
    })

    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setInputs((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    // const handleRegister = async (e) => {
    //     e.preventDefault()
    //     if (inputs.password === inputs.cpassword) {
    //         const res = await fetch('http://localhost:3000/api/auth/register', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ username: inputs.username, email: inputs.email, fullname: inputs.fullname, password: inputs.password })
    //         })
    //         const data = await res.json()
    //         console.log(data)
    //         if (data.success) {
    //             alert('Registered Successfully')
    //             setInputs({
    //                 username: '',
    //                 email: '',
    //                 fullname: '',
    //                 password: '',
    //                 cpassword: ''
    //             })
    //         }
    //         else {
    //             alert(data.message)
    //         }
    //     }
    //     else {
    //         alert('Password and Confirm Password should be same')
    //     }
    // }

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            await axios.post("http://localhost:3000/api/auth/register", inputs)

        } catch (error) {
            setError(error.response.data.message)

        }
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
                    <form>
                        <input type="text" placeholder='Username' name="username" onChange={handleChange} />
                        <input type="email" placeholder='Email' name="email" onChange={handleChange} />
                        <input type="text" placeholder='FullName' name="fullname" onChange={handleChange} />
                        <input type="password" placeholder='Password' name="password" onChange={handleChange} />
                        <input type="password" placeholder='Confirm Password' name="cpassword" onChange={handleChange} />

                        <button className='registerbtn' onClick={handleRegister}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;