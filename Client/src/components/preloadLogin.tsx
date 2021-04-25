import React from 'react';
import BackIcon from './icon/backIcon';

const PreloadLogin: React.FunctionComponent = () => {

    return (
        <div className='pre-login' >
            <h1>REGISTER</h1>
            <span>
                <a href="/">
                    <BackIcon />
                </a>
            </span>
            <a href="/signup" className="button-link"><button>Sign Up</button></a>
            <a href="/login" className="button-link"><button>Log In</button></a>
        </div>
    );
};

export default PreloadLogin;