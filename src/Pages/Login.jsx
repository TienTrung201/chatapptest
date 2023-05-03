import Button from 'react-bootstrap/Button';
import { Col, Container, ModalTitle } from 'react-bootstrap';
function Login() {
    return (
        <Container style={{ height: '200px' }} className="d-flex justify-content-center align-items-center ">
            <Col>
                <ModalTitle className="mb-3">Đăng nhập vào chatApp</ModalTitle>
                <Button variant="outline-success">Đăng nhập bằng google</Button>
            </Col>
        </Container>
    );
} 
export default Login;
