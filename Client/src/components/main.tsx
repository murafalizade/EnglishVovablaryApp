import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios'
import jwt from 'jwt-decode'
import dayjs from 'dayjs'
import NotificationIcon from "./icon/bellIcon"
import Menu from './navbar';


const Main: React.FunctionComponent = () => {
    class Days {
        day: number;
        month: number;
        years: number;
        constructor(date: number) {
            const formatdate: string = dayjs(date).format('DD/MM/YYYY')
            this.years = parseInt(formatdate.slice(8))
            this.day = parseInt(formatdate.slice(0, -8))
            this.month = parseInt(formatdate.slice(3, -5))
        }
    }

    const [swords, setWords] = useState<string>('')
    const [twords, setWordst] = useState<string>('')
    const [count, setCount] = useState<number>(10)
    const [user, setUser] = useState<User>({ id: '', username: '', password: '', date: 0, wordChoose: 1, words: [] })
    const [chooce, setChooce] = useState<boolean>(false)

    useEffect(function () {
        var cookie:string = "";
        var token:token ;
        if(document.cookie){
            cookie = document.cookie.slice(9);
            token = jwt(cookie);
        }

        const header = {
            headers: {
                'Header-Token': cookie
            }
        }
        const gets = async () => {
            const users: AxiosResponse = await axios.get(`http://localhost:8080/api/v1/users/${token.id}`, header)
            setUser(users.data)
        }
        gets()

        selectNewWord()
    }, [])
    function selectRandomWord() {
        return Math.floor(Math.random() * (3000 - 0 + 1) + 0);
    }
    useEffect(()=>{
        console.log(user)
        getCurrentDate()
    },[user])

    const capitalize = (s: String) => {
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
    }

    const selectNewWord = async () => {
        if (count > 0) {
            var condition: boolean = true;
            var word: string = ""
            while (condition) {
                const randomWord: number = selectRandomWord()
                const words: AxiosResponse = await axios.get('http://localhost:8080/api/v1/words/all')
                if (words.data[randomWord]!==""){
                    word = capitalize(words.data[randomWord])

                }
                for (let j = 0; j < user.words.length; j++) {
                    if (word === user.words[j]) {
                        continue
                    }
                }
                condition = false;
                // const translate: AxiosResponse = await axios.get(`http://localhost:8080/api/v1/${word}`)
                // console.log(translate.data)
                // setWordst(translate.data)
            }
            setWords(word)
            setCount(count - 1)
        }
    }


    const getCurrentDate = () => {
        const creatDate = new Days(user.date)
        const today = new Days(Date.now())
        console.log(user.date)
        console.log(creatDate, today)
        if (creatDate.years === today.years && (creatDate.month > today.month || creatDate.month === today.month) && creatDate.day < today.day) {
            setChooce(true)
        }
    }
    const SaveNew = async () => {

        if (chooce) {
            const succes = await axios.put(`http://localhost:8080/api/v1/users/${user.id}`, { word: swords })
            setUser(prevState => ({ ...user, wordChoose: user.wordChoose - 1 }))
            alert(succes.data.msg)
        }
    }

    return (
        <div className='word-main'>
            <nav>
                <span className='menu-icon'><NotificationIcon /></span>
            </nav>
            <Menu />
            <h2 className='text-header'>Welcome, {capitalize(user.username)} !</h2>
            <p className='text-pg'>You progress nowadays are  {user.words.length} words</p>
            <div className="progress">
                <div className="progress-value"></div>
            </div>
            <hr />

            {chooce ? 
                <div className="section">
                    <h5>Practise English</h5>
                    <span>You have new words !</span>
                    <div className='learn-model'>
                        {swords === "" ? <p>Loading . . .</p> : (
                            <>
                                <h3>
                                    <p >New Word <br /><span>{swords}</span></p>
                                    <p >Translate Word <br /> <span>{twords}</span></p>
                                </h3>
                                <div>
                                    <button disabled={count > 0 ? false : true} onClick={selectNewWord}>Retry</button>
                                    <button disabled={user.wordChoose > 0 ? false : true} onClick={SaveNew}>Ok</button>
                                </div>
                            </>)
                        }
                    </div>
                </div> : 
                <h3>Please tomorrow again will come back</h3>
            }
        </div>
    );
};

export default Main;