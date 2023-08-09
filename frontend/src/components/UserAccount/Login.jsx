import { Box, Button, TextField } from '@mui/material';
import logo from './logo.jpeg';
import bharatIntern from './bharatIntern.png';
import './Login.css';
import { useState, useContext } from 'react';
import { API } from '../../service/api';
import { DataContext } from '../../context/dataProvider';
import { useNavigate } from "react-router-dom";

const signUpFormat = {
    name: '',
    username: '',
    password: ''
}

const loginFormat = {
    username: '',
    password: ''
}
const Login = ({ setUser }) => {

    const [account, setAccount] = useState('login');
    const [signup, setSignUp] = useState(signUpFormat);
    const [login, setLogin] = useState(loginFormat);
    const [error, setError] = useState('');

    //Hooks

    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { setUserAccount } = useContext(DataContext);

    const navigateToHome = useNavigate();

    const toggleAccount = () => {
        account === 'signup' ? setAccount('login') : setAccount('signup');
    }

    const onInputEvent = (e) => {
        setSignUp({ ...signup, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }


    const processLogin = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            setError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

            setUserAccount({ username: response.data.username, name: response.data.name });
            setUser(true);
            navigateToHome('/');
        }
        else {
            setError('Invalid username or password' );
        }
    }

    // const validateForm = () => {
    //     const error = {};
    //     // Perform frontend validation checks here
    //     // For example, check if name, username, and password meet the required criteria
    //     if (signup.name.trim() === '') {
    //         error.name = 'Name is required';
    //     }
    //     if (signup.username.trim() === '') {
    //         error.username = 'Username is required';
    //     }
    //     if (signup.password.trim() === '') {
    //         error.password = 'Password is required';
    //     }
    //     setError(error);
    //     return Object.keys(error).length === 0;
    // };

    // const signUp = async () => {

    //     if (signup.name.trim() === '') {
    //         error.name = 'Name is required';
    //     }
    //     else if(signup.username.trim() === '') {
    //         setError('Username is required');
    //     }
    //     else if(signup.password.trim() === '') {
    //         setError('Password is required');
    //     }

    //     if (Object.keys(error).length > 0) {
    //         //setError(error);
    //         return; // Return early if there are validation errors
    //     }

    //         let response = await API.userSignup(signup);
    //         if (response.isSuccess) {
    //            // setError('');
    //             setSignUp(signUpFormat);
    //             setAccount('login');
    //         }
    //         else {
    //             //    console.log("Error aditi");
    //             //setError("something went wrong! Please try again later");
    //         }
    // }


    const signUp = async () => {
        const errors = '';
        if (signup.name.trim() === '') {
            setNameError('Name is required')
        }
        if (signup.username.trim() === '') {
            setUsernameError('Username is required');
        }
        if (signup.password.trim() === '') {
            setPasswordError('Password is required');
        }

        if(signup.password.trim() === '' && signup.username.trim() === '' && signup.name.trim() !== ''){
            setNameError('')
        }
        
        if(signup.password.trim() === '' && signup.name.trim() === '' && signup.username.trim() !== ''){
            setUsernameError('')
        }

        if(signup.password.trim() !== '' && signup.username.trim() === '' && signup.name.trim() === ''){
            setPasswordError('')
        }

        if(signup.password.trim() === '' && signup.username.trim() !== '' && signup.name.trim() !== ''){
            setNameError('');
            setUsernameError('');
        }

        if(signup.password.trim() !== '' && signup.username.trim() === '' && signup.name.trim() !== ''){
            setNameError('');
            setPasswordError('');

        }

        if(signup.password.trim() !== '' && signup.username.trim() !== '' && signup.name.trim() === ''){
            setPasswordError('');
            setPasswordError('');
            
        }


        setError(errors);

        if (Object.keys(errors).length > 0) {
            return; // Return early if there are validation errors
        }

        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            setError({});
            setSignUp(signUpFormat);
            setAccount('login');
        } else {
            setError({ general: 'Something went wrong! Please try again later' });
        }
    };
    

    return (
        <Box className="component">
            <Box>
                <img src={logo} className='login_logo' alt="logo" />
                {
                    account === 'login' ?

                        <Box className="middle">
                            <TextField variant='standard' value={login.username} name="username" onChange={(e) => onInputChange(e)} placeholder='Enter Username' autoComplete='off'/>
                            <TextField variant='standard' value={login.password} name="password" onChange={(e) => onInputChange(e)} placeholder='Enter Password' autoComplete='off'/>

                            {/* {error && <p style={{ color: "red", fontSize: 10 }}>{error}</p>} */}

                            <Button variant='contained' className='login-btn' onClick={() => processLogin()}>Login</Button>
                            <Box className="last">
                                <p style={{ textAlign: 'center', marginTop: '15px' }}>
                                    <span className="line"></span>  <span className='separator-text'>OR </span><span className="line"></span>
                                </p>
                                <Button className='signup-btn' onClick={() => toggleAccount()}>Create an account</Button>
                            </Box>
                        </Box>
                        :
                        <Box className="middle">
                            <TextField variant='standard' placeholder='Enter Name' name="name" onChange={(e) => onInputEvent(e)} autoComplete='off' />
                            {nameError && <p style={{ color: "red", fontSize: 12 }}>{nameError}</p>}
                            <TextField variant='standard' placeholder='Enter Username' name="username" onChange={(e) => onInputEvent(e)} autoComplete='off' />
                            {usernameError && <p style={{ color: "red", fontSize: 12 }}>{usernameError}</p>}
                            <TextField variant='standard' placeholder='Enter Password' name="password" onChange={(e) => onInputEvent(e)} autoComplete='off'/>
                            {passwordError && <p style={{ color: "red", fontSize: 12 }}>{passwordError}</p>}

                            <Button variant='contained' className='login-btn' onClick={() => signUp()}>SignUp</Button>
                            <Box className="last">
                                <p style={{ textAlign: 'center', marginTop: '15px' }}>
                                    <span className="line"></span>  <span className='separator-text'>OR </span><span className="line"></span>
                                </p>
                                <Button className='signup-btn' onClick={() => toggleAccount()}>Back to login</Button>
                            </Box>
                        </Box>

                }
                <img src={bharatIntern} className='company_logo' alt="logo" />
            </Box>
        </Box>
    )
}


export default Login;