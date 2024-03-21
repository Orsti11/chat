import { useState } from 'react';
import axios from 'axios';

import './style.css';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';


export default function Register() {
    const { setUser } = useActions();

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = async (e) => {
        e.preventDefault();
        await axios.get(`http://localhost:5000/users?email=${email}`).then(res => {
            const resServer = res.data[0] || [];
            if (resServer.length !== 0) {
                if (resServer.password === password) {
                    setUser({ id: resServer.id, email: resServer.email });
                    navigate("/chat")
                } else setError("Password error!")
            }
            else setError('Пользователь не найден!')
        })
    }

    const register = async (e) => {
        e.preventDefault();
        await axios.get(`http://localhost:5000/users?email=${email}`).then(res => {
            const resServer = res.data[0] || [];
            if (resServer.length === 0 && email !== '' && password.length > 4) {
                try {
                    axios.post('http://localhost:5000/users/', {
                        email: email, password: password,
                    })
                    setUser({ email: email });
                    navigate("/chat");
                } catch {
                    setError('Ошибка запроса!');
                }
            } else setError("Пользователь с такой почтой уже существует или введены некорректные данные!")
        })
    }


    return (
        <div className='login'>
            <h2 className="title-component login__title">
                Мой аккаунт
            </h2>
            <div className="login__switch">
                <div className='login__switch-cover login__switch-left' style={isLogin ? { marginLeft: "0" } : { marginLeft: "calc(50% - 10px)" }}></div>
                <button onClick={() => setIsLogin(true)} className="login__switch-button">Вход</button>
                <button onClick={() => setIsLogin(false)} className="login__switch-button">Регистрация</button>
            </div>

            <form className='login__form'>
                <input onChange={e => setEmail(e.target.value)} value={email} type="text" className="login__input login__email" placeholder='Емэил...' />
                <input onChange={e => setPassword(e.target.value)} value={password} name="password" type="password" className="login__input login__password" placeholder='Пароль...' />
                <button onClick={(e) => isLogin ? login(e) : register(e)} className='button--black'>{isLogin ? "Вход" : "Регистрация"}</button>
            </form>
            {<p>{error}</p>}
        </div>
    )
}
