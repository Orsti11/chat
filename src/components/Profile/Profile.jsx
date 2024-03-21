import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';

import './style.css';

import { IoCloseCircleSharp } from "react-icons/io5";

export default function Profile({isProfile, setIsProfile, user}) {
    const navigate = useNavigate();
    const { setUser } = useActions();

    const exit = () => {
        setUser({id: null, email: null})
        setIsProfile(false);
        navigate("/register");
    }

    return (
        <div className='profile' style={{display: isProfile ? "block" : "none"}}>
            <IoCloseCircleSharp onClick={() => setIsProfile(false)} style={{position: "absolute", top: "5px", right: "5px"}} />
            <h3 className="profile__title">Мой профиль</h3>
            <p className="profile__email">{user.email}</p>
            <button onClick={() => exit()} className="button--black profile__button">Выйти</button>
        </div>
    )
}
