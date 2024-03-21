import React, { useState } from 'react';

import './style.css';
import { CgProfile } from "react-icons/cg";
import { useSelector } from 'react-redux';
import Profile from '../Profile/Profile';

export default function Navbar() {
    const user = useSelector(state => state.user);
    const [isProfile, setIsProfile] = useState(false);
    return (
        <div className='navbar'>
            <p className="navbar__title">Chat.online</p>
            {user.email ? <CgProfile onClick={() => setIsProfile(true)} style={{width: "30px", height: "30px", cursor: "pointer"}} /> : <></>}
            <Profile isProfile={isProfile} setIsProfile={setIsProfile} user={user} />
        </div>
    )
}
