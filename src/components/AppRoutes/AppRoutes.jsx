import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Chat from '../Chat/Chat'
import Register from '../Register/Register';
import { useSelector } from 'react-redux';

export default function AppRoutes() {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (!user.email) navigate('/register');
    }, [])

    return (
        <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/chat' element={<Chat />} />
        </Routes>
    )
}
