import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios'
import Menu from './navbar';
import NotificationIcon from "./icon/bellIcon"


const Login: React.FunctionComponent = () => {
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [passShow, setPassShow] = useState<boolean>(true)


    const sendRequest = async (data: object) => {
        let token: AxiosResponse
        token = await axios.post('http://localhost:8080/api/v1/users/login-user', data)
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        document.cookie = `username=${token.data};expires=${tomorrow}`;
        window.location.replace("http://localhost:3000/vocablary");
    }

    return (
        <div className='login' >
            <Menu />
            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type={passShow ? 'password' : 'text'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <span id="shown" onClick={() => setPassShow(!passShow)}>{passShow ? 'SHOW' : 'HIDDEN'}</span>
            <button onClick={() => sendRequest({ email, password })}>SEND</button>
        </div>
    );
};

export default Login;