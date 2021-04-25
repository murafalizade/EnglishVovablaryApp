import React, { useState, useEffect} from "react";
import { css } from "@emotion/css";
import { Link } from 'react-router-dom';
import MenuIcon from "./icon/menuIcon";
import BackIcon from "./icon/backIcon";
import jwt from 'jwt-decode';

const easeSlow = css`
  transition: all 450ms ease-in-out;
`;

const menuBtn = css`
  position: absolute;
  z-index: 3;
  left: 560px;
  top:5px;
  padding: 10px;
  cursor: pointer;
  ${easeSlow};
  @media (max-width: 768px) {
    left:0;
  }
  &.closer {
    transform: rotate(360deg);
  }
`;

const btnLine = css`
  width: 28px;
  height: 4px;
  margin: 0 0 5px 0;
  background-color: #000;
  ${easeSlow};
  &.closer {
    background-color: #fff;  
    &:nth-child(1) {
      transform: rotate(45deg) translate(4px, 0px);
      width: 20px;
    }
    &:nth-child(2) {
      transform: translateX(-8px);
    }
    &:nth-child(3) {
      transform: rotate(-45deg) translate(4px, 0px);
      width: 20px;
    }
  }
`;

const menuOverlay = css`
  z-index: 2;
  position: fixed;
  top: 0;
  left: 326px;
  border-radius:20px;
  background-color: white;
  height:641px;
  width: 220px;
  transform: translateX(0%);
  transition: all 500ms ease-in-out;
  @media (max-width: 768px) {
   left:-220px;
  }

  &.show {
    background-color: #000;
    transform: translateX(100%); 
  }
  nav {
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    a,li {
      font-size:30px;
      margin:15px;
      height: 30px;
      list-style:none;
      text-decoration: none;
      color: #fff;
      cursor: pointer;
      transition: all 150ms ease-in-out;
      &:hover {
        color: #F28EBA;
      } 
    }
  }
`;
  interface Props{
      open?:boolean
  }

const Menu=({open}:Props)=> {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [url, setUrl] = useState<String>("")
    useEffect(() => {
      if(document.cookie){
        const ids: token = jwt(document.cookie.slice(9))
        setUrl(ids.id)
      }
    }, [])

    const toggleMenu = () =>{
        setIsMenuOpen(!isMenuOpen)
    }
        return (
            <React.Fragment >
                <div id='overlay'></div>
                <div
                    className={`${menuBtn} ${isMenuOpen ? "closer" : null}`}
                    onClick={toggleMenu}
                >
                <span style={!isMenuOpen?{display:"block"}:{display:"none"}}><MenuIcon /></span>
                <span style={isMenuOpen ? { display: "block" } : { display: "none" }}><BackIcon /></span>
                    {/* <div className={`${btnLine} ${isMenuOpen ? "closer" : null}`} />
                    <div className={`${btnLine} ${isMenuOpen ? "closer" : null}`} />
                    <div className={`${btnLine} ${isMenuOpen ? "closer" : null}`} /> */}
                </div>
                <div className={`${menuOverlay} ${isMenuOpen ? "show" : null}`}>
                    <nav style={{ zIndex: -2 }}>
                        <Link to="/" onClick={toggleMenu}><li >Home</li></Link>
                        <Link to="/vocablary" onClick={toggleMenu}><li >Vocablary</li></Link>
                        {document.cookie?<Link to={`/profile/${url}`} onClick={toggleMenu}><li>Profile</li></Link>:
                          <div style={{display:"flex"}}>
                              <Link to='/login' onClick={toggleMenu}><li>Login</li></Link>
                              <Link to='/signup' onClick={toggleMenu}><li>Signup</li></Link>
                          </div>
                        }
                         <ul style={{ marginTop: "300px", display: "flex" }}>
                            <li>
                                <a href="https://www.facebook.com/people/Murad-Aliyev/100005770751769" rel="noopener noreferrer" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" className="logo" fill="#EB4C54" width="24" height="24" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg></a>
                            </li>
                            <li>
                                <a href="https://github.com/murafalizade" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" className="logo" width="24" height="24" fill="#EB4C54" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg></a>
                            </li>
                            <li>
                                <a href="mailto:murafalizade@gmail.com?"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#EB4C54" className="logo" fillRule="evenodd" clipRule="evenodd"><path d="M22.288 21h-20.576c-.945 0-1.712-.767-1.712-1.712v-13.576c0-.945.767-1.712 1.712-1.712h20.576c.945 0 1.712.767 1.712 1.712v13.576c0 .945-.767 1.712-1.712 1.712zm-10.288-6.086l-9.342-6.483-.02 11.569h18.684v-11.569l-9.322 6.483zm8.869-9.914h-17.789l8.92 6.229s6.252-4.406 8.869-6.229z" /></svg></a>
                            </li>
                        </ul> 
                    </nav>
                </div>
            </React.Fragment>
        );
}

export default Menu;