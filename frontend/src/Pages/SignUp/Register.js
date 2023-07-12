import { useEffect, useState } from "react";
import "../../CSS/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios'
// import { apiDomain } from '../../utils/utils'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loading from "../Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../redux/authAction";

import { toast } from "react-toastify";

const SignUp = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  // const [inputs, setInputs] = useState({
  //     username: '',
  //     email: '',
  //     fullname: '',
  //     password: '',
  //     cpassword: ''
  // })

  // const [error, setError] = useState(null)

  // const handleChange = (e) => {
  //     setInputs((prev) => {
  //         return {
  //             ...prev,
  //             [e.target.name]: e.target.value
  //         }
  //     })
  // }

  // // const handleRegister = async (e) => {
  // //     e.preventDefault()
  // //     if (inputs.password === inputs.cpassword) {
  // //         const res = await fetch('http://localhost:3000/api/auth/register', {
  // //             method: 'POST',
  // //             headers: {
  // //                 'Content-Type': 'application/json'
  // //             },
  // //             body: JSON.stringify({ username: inputs.username, email: inputs.email, fullname: inputs.fullname, password: inputs.password })
  // //         })
  // //         const data = await res.json()
  // //         console.log(data)
  // //         if (data.success) {
  // //             alert('Registered Successfully')
  // //             setInputs({
  // //                 username: '',
  // //                 email: '',
  // //                 fullname: '',
  // //                 password: '',
  // //                 cpassword: ''
  // //             })
  // //         }
  // //         else {
  // //             alert(data.message)
  // //         }
  // //     }
  // //     else {
  // //         alert('Password and Confirm Password should be same')
  // //     }
  // // }

  // const handleRegister = async (e) => {
  //     e.preventDefault()

  //     try {
  //         await axios.post("http://localhost:3000/api/auth/register", inputs)

  //     } catch (error) {
  //         setError(error.response.data.message)

  //     }
  // }

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email().required("Email is required"),
    fullname: yup.string().required("Fullname is required"),
    password: yup
      .string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    cpassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("cpassword"), null], 'Must match "password" field value'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (auth.userInfo) {
      navigate("/");
    }
    if (auth.error) {
      toast.error(auth.error, {
        position: toast.POSITION.TOP_CENTER,
        autoclose: 1000,
      });
    }
    if (auth.success) {
      toast.success(auth.success, {
        position: toast.POSITION.TOP_CENTER,
        autoclose: 1000,
      });
      reset();
      navigate("/login");
    }
  }, [auth.userInfo, navigate, auth.success]);
  const onSubmitHandler = async (data) => {
    setLoading(true);
    // try {
    //     let result1 = await axios.post(`${apiDomain}/api/auth/register`, data);
    //     console.log(result1.data);
    //     toast.success("Congratulations! Please Login to continue", {
    //         position: toast.POSITION.TOP_CENTER,
    //         autoclose: 1000
    //     });
    //     setLoading(false);
    //     reset();
    //     navigate('/login');
    // } catch (error) {
    //     if (error.response && error.response.data && error.response.data.error === "User already exists") {
    //         toast.error("User already exists", {
    //             position: toast.POSITION.TOP_CENTER,
    //             autoclose: 1000
    //         });
    //         setLoading(false);
    //     }
    //     reset();
    // }s
    dispatch(registerUser(data));
  };

  return (
    <div className="signup">
      {loading ? <Loading /> : null}
      <div className="signup-card">
        <div className="signup-left">
          <h1>Ready to connect</h1>
          <p>
            Are you ready to connect with your friends and family? Then you are
            at the right place.
          </p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button className="loginbtn">Login</button>
          </Link>
        </div>
        <div className="signup-right">
          <h1>Register</h1>
          <form action="" onSubmit={handleSubmit(onSubmitHandler)}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              required
              {...register("username")}
            />
            <p className="error">{errors.username?.message}</p>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              required
              {...register("email")}
            />
            <p className="error">{errors.email?.message}</p>
            <input
              type="text"
              placeholder="FullName"
              name="fullname"
              id="fullname"
              required
              {...register("fullname")}
            />
            <p className="error">{errors.fullname?.message}</p>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              required
              {...register("password")}
            />
            <p className="error">{errors.password?.message}</p>
            <input
              type="password"
              placeholder="Confirm Password"
              name="cpassword"
              id="cpassword"
              required
              {...register("cpassword")}
            />
            <p className="error">{errors.cpassword?.message}</p>
            <button className="registerbtn" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
