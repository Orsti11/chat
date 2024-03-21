import Message from '../Message/Message';

export default function MessagesList({ messages, user }) {
    return (
        <>
            {messages.map(({ id, name, message, date }) =>
                <Message
                    key={id}
                    id={id}
                    message={message}
                    name={name}
                    date={new Date(date)}
                    user={user}
                />)}
        </>
    )
}
