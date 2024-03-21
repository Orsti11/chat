import axios from 'axios';
import { useState } from 'react';

import { MdDeleteForever } from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

import './style.css';

export default function Message({ id, message, name, date, user }) {
    const isMe = (name === user.email);
    const [isChange, setIsChange] = useState(false);
    const [changeMessage, setChangeMessage] = useState(message);

    const myMessage = {
        backgroundColor: "black",
        marginLeft: "auto",
        border: "none",
        color: "white"
    }
    const otherMessage = {
        backgroundColor: "white",
        marginLeft: "0",
        border: "1px solid black",
        color: "black"
    }

    const deleteMessage = async () => {
        await axios({
            method: 'DELETE',
            url: 'http://localhost:5000/chat/' + id
        });
    }

    const change = () => {
        axios.put('http://localhost:5000/chat/' + id, {
            id: id,
            name: name,
            message: changeMessage,
            date: date
        })
        setIsChange(false);
    }

    return (
        <div className='message' style={isMe ? myMessage : otherMessage}>
            {isMe ?
                <div className='message__options'>
                    <div onClick={() => setIsChange(true)} style={{ cursor: "pointer", color: "grey" }}>изменить</div>
                    <MdDeleteForever onClick={() => deleteMessage()} style={{ cursor: "pointer", color: "grey" }} />
                </div>
                :
                <></>
            }

            {isChange ?
                <div className='change__window'>
                    <textarea onChange={(e) => setChangeMessage(e.target.value)} className='change__input' value={changeMessage} />
                    <IoCloseCircleSharp
                        onClick={() => setIsChange(false)}
                        style={{ cursor: "pointer", color: "grey", position: 'absolute', bottom: "2px", left: "5px" }}
                    />
                    <FaCheck
                    onClick={() => change()}
                        style={{ cursor: "pointer", color: "grey", position: 'absolute', bottom: "2px", right: "5px" }}
                    />
                </div>
                : <></>
            }
            <div className='message__header'>
                <p className="message__name">{name}</p>
                <p className="message__date">
                    {`${date.getUTCDate() + 1}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}</p>
            </div>
            <p className="message__text">{message}</p>
        </div>
    )
}
