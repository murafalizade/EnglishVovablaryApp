import React, { useEffect, useState } from 'react';
import './app.scss';
import Main from './components/main';
import PreloadLogin from './components/preloadLogin';
import Signup from './components/register';
import Login from './components/login';
import jwt from 'jwt-decode'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import Profile from './components/profile';
const App: React.FunctionComponent = () => {
    const [url, setUrl] = useState<String>("/")
    useEffect(() => {
        if (document.cookie) {
            const ids: token = jwt(document.cookie.slice(9))
            setUrl(ids.id)
        }
    }, [])


    return (
        <Router>
            <div className='body'>
                <Switch>
                    <Route path='/' exact>
                        <div className='main'>
                            <h1>
                                Your<br />
                                <span>Personal<br /></span>
                                Vocablary
                            </h1>
                            <p>
                                A simple but very usefull application for you.
                                A small dictionary will help you learn English
                                language !
                            </p>

                            <Link to={!document.cookie ? '/register' : "/vocablary"} ><button > Start </button></Link>

                        </div>
                    </Route>
                    {
                        !document.cookie ?
                            <>
                                <Route path='/register'>
                                    <PreloadLogin />
                                </Route>
                                <Route path='/signup'>
                                    <Signup />
                                </Route>
                                <Route path='/login'>
                                    <Login />
                                </Route>
                            </>
                            :
                            <>
                                <Route path='/vocablary'>
                                    <Main />
                                </Route>
                                <Route path={`/profile/${url}`}>
                                    <Profile />
                                </Route>
                            </>
                    }
                </Switch>
            </div>
        </Router>
    )

}
export default App;
