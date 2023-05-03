import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';

function ListUserChat({ user ,setRoomInfo}) {
    //user được truyền từ component sideBar
    const [listChats, setListChats] = useState([]);
    //danh sách phòng chat
    //get API : ở firebase onSnapshot  là lấy dữ liệu thời gian thực
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userRoomChats', user.uid), (doc) => {
                setListChats(Object.entries(doc.data()).sort((a, b) => b[1].createdAt - a[1].createdAt));
            });
            return () => {
                unsub();
            };
        };
        if (user.uid) {
            getChats();
        }
    }, [user]);

    const handleSelectRoomChat = (userSelect, currentUser) => {
        const combinedId =
            userSelect[1].userInfo.uid > currentUser.uid
                ? userSelect[1].userInfo.uid + currentUser.uid
                : currentUser.uid + userSelect[1].userInfo.uid;
        const data = {
            chatId: combinedId,
            displayName: userSelect[1].userInfo.displayName,
            photoURL: userSelect[1].userInfo.photoURL,
        };
        setRoomInfo(data);
    };

    return (
        <ul>
            {listChats.map((userChat) => {
                return (
                    <Row onClick={()=>{handleSelectRoomChat(userChat,user)}} key={userChat[0]} style={{ cursor: 'pointer' }} className="align-items-center cursor-pointer">
                        <Col xs={4} md={4}>
                            <Image style={{ width: '40px' }} src={userChat[1].userInfo.photoURL} roundedCircle />
                        </Col>
                        <Col xs={8} md={8}>
                            <p>{userChat[1].userInfo.displayName} </p>
                        </Col>
                    </Row>
                );
            })}
        </ul>
    );
}

export default ListUserChat;

