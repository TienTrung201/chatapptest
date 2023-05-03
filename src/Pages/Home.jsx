import { useNavigate } from 'react-router-dom';
import ChatRoom from '../Components/ChatRoom';
import SideBar from '../Components/SideBar';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';

function Home({user,roomInfo,setRoomInfo}) {
    const navigate = useNavigate();
    useEffect(() => {
        if (user.uid === '') {
            navigate('/login');
        }
    }, [navigate, user]);


    return (
        <Container style={{ height:"500px"}} className="d-flex vw-100">
            <div style={{ flex: 2 }} className="h-100 ">
                <SideBar setRoomInfo={setRoomInfo} user={user}/>
            </div>
            <div style={{ flex: 5 }} className="h-100">
                <ChatRoom user={user} roomInfo={roomInfo}/>
            </div>
        </Container>
    );
}
export default Home;
