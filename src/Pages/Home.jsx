import ChatRoom from '../Components/ChatRoom';
import SideBar from '../Components/SideBar';
import { Container } from 'react-bootstrap';

function Home() {
    return (
        <Container style={{ height:"500px"}} className="d-flex vw-100">
            <div style={{ flex: 2 }} className="h-100 ">
                <SideBar />
            </div>
            <div style={{ flex: 5 }} className="h-100">
                <ChatRoom />
            </div>
        </Container>
    );
}
export default Home;
