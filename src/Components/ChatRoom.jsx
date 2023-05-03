import { db } from '../firebase';
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
function ChatRoom({ roomInfo, user }) {
    const [messages, setMessage] = useState([]);
    const [text, setText] = useState('');
    //handle send message
    const handleChangeInput = (e) => {
        setText(e.target.value);
    };
    const handleSendMessage = async () => {
        await updateDoc(doc(db, 'chats', roomInfo.chatId), {
            message: arrayUnion({
                id: uuid(),
                text,
                senderPhotoURL: user.photoURL,
            }),
        });
    };
    //handle send message

    // getAPI message từ chatID
    useEffect(() => {
        const getMessages = () => {
            const unsub = onSnapshot(doc(db, 'chats', roomInfo.chatId), (doc) => {
                if (doc.exists()) {
                    console.log(Object.entries(doc.data()));
                    setMessage(Object.entries(doc.data())[0][1]);
                }
                return () => {
                    unsub();
                };
            });
        };

        if (roomInfo.chatId !== '') {
            getMessages();
        }
    }, [roomInfo]);
    return (
        <div className="h-100 " style={{ background: '#F5F3C1' }}>
            {/* thông tin người dùng chat */}
            <div style={{ background: '#E3F2C1' }} className="align-items-center d-flex cursor-pointer p-2">
                <Image style={{ width: '40px' }} src={roomInfo.photoURL} roundedCircle />

                <p style={{ textAlign: 'left' }}>{roomInfo.displayName} </p>
            </div>
            {/* thông tin người dùng chat */}
            {/* tin nhắn chat */}
            <div className="p-4" style={{ height: '400px', overflowY: 'hidden' }}>
                {messages.map((message) => {
                    return (
                        <div key={message.id} className="d-flex">
                            <Image
                                className="p-1 mr-2"
                                style={{ width: '40px' }}
                                src={message.senderPhotoURL}
                                roundedCircle
                            />
                            <p className="bg-white d-inline-block rounded p-2">{message.text}</p>
                        </div>
                    );
                })}
            </div>
            {/* tin nhắn chat */}
            {/* Input nhập tin nhắn */}
            <div className="d-flex align-items-center ">
                <div style={{ flex: 6 }}>
                    <input onChange={handleChangeInput} style={{ width: '100%' }} value={text} />
                </div>
                <div style={{ flex: 1 }}>
                    <Button onClick={handleSendMessage}>Gửi</Button>
                </div>
            </div>
            {/* Input nhập tin nhắn */}
        </div>
    );
}

export default ChatRoom;
