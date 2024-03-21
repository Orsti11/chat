import { useEffect, useState } from 'react';

import './style.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import MessagesList from '../MessagesList/MessagesList';
import Filters from '../Filters/Filters';

export default function Chat() {
    const user = useSelector(state => state.user);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isFilters, setIsFilters] = useState(false);

    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');

    const handleClick = async () => {
        await axios.post('http://localhost:5000/chat/', {
            name: user.email, 
            message: message,
            date: new Date()
        })
        setMessage('');
    }

    const filtersMessages = () => {
        return isFilters ?
            messages.filter(({ date }) => new Date(date) > dateStart && new Date(date) < dateEnd)
            : messages;
    }

    useEffect(() => {
        requestServer();
    }, [])

    const requestServer = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/chat');
            setMessages(data);
            await requestServer();
        } catch (e) {
            setTimeout(() => { requestServer() }, 500);
        }
    }

    return (
        <div className='chat' >
            <Filters isFilters={isFilters} setIsFilters={setIsFilters} setDateEnd={setDateEnd} setDateStart={setDateStart} />
            <div className="chat__messages">
                <MessagesList
                    messages={filtersMessages()}
                    user={user}
                />
            </div>
            <div className="chat__form">
                <input className='message__input' onChange={(e) => setMessage(e.target.value)} value={message} type="text" placeholder='Введите сообщение...' />
                <button onClick={() => handleClick()} className='message__button'>Отправить</button>
            </div>
        </div>
    )
}
