import React,{useEffect,useState} from 'react';
import jwt from 'jwt-decode'
import axios, { AxiosResponse} from 'axios'
import shortid from 'shortid';
import Menu from './navbar';

const Profile = () => {
    const [user, setUser] = useState<User>({ id: '', username: '', password: '', date: 0, wordChoose: 1, words: [] })
    const [token, setToken] = useState<string>(document.cookie?document.cookie.slice(9):"")
    useEffect(()=>{
        const tokenobj: token = jwt(token)
        const header = {
            headers: {
                'Header-Token': token
            }
        }
        const gets = async () => {
            const users: AxiosResponse = await axios.get(`http://localhost:8080/api/v1/users/${tokenobj.id}`, header)
            setUser(users.data)
        }
        gets()
    },[])



    const logout = ()=>{
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.replace("http://localhost:3000/");
    }
    console.log(user.words)
    return (
        <div className="proflle">
            <Menu />
            <div className="avatar-logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIgi7y9carOBpLe3wb6OuDstveQEB9grv_RQ&usqp=CAU" alt="profile" />
            <h2>{user.username}</h2>
            </div>
            <div className="your-word">
                <h3>My Words</h3>
                {user.words===[]?<p>You haven't any words</p>:
                    <ul>
                        {user.words.map(word => (
                            <li className="list-item" key={shortid.generate()}>
                                {word}
                            </li>))}
                    </ul>
                }
            </div>
            <button onClick = {()=>logout()}>Log Out</button>
        </div>
    );
};

export default Profile;