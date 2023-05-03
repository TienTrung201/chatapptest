import Button from 'react-bootstrap/Button';
import { Col, Container, ModalTitle } from 'react-bootstrap';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setDoc, doc } from 'firebase/firestore';
const googleLogin= new GoogleAuthProvider();
function Login({setUser}) {
    const handleLoginGoogle = () => {
        signInWithPopup(auth, googleLogin)
            .then((result) => {
                const { user, _tokenResponse } = result;
                console.log('Đăng nhập', { user });
                if (_tokenResponse.isNewUser) {
                    try {
                        setDoc(doc(db, 'users', user.uid), {
                            displayName: user.displayName,
                            email: user.email,
                            photoURL: user.photoURL,
                            uid: user.uid,
                            providerId: _tokenResponse.providerId,
                            });
    //'userRoomChats' là danh sách các phòng chat của user tương ứng
                            setDoc(doc(db, 'userRoomChats', user.uid), {});
    
                    } catch (e) {
                        console.log(e);
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const navigate=useNavigate()
    useEffect(() => {
        const unsubscibed = auth.onAuthStateChanged((user) => {
            if (user) {
                const providerId = user.providerData[0].providerId;

                const { displayName, email, uid, photoURL } = user;
                console.log('Update state user', user);
                setUser({
                    displayName,
                    email,
                    uid,
                    photoURL,
                    providerId,
                });
          //Đăng nhập thành công nhảy vào trang home
                navigate('/');
                return;
            } else {
                setUser({ displayName: '', email: '', uid: '', photoURL: '' });
 //Đăng nhập không thành công quay lại trang /login
                navigate('/login');
                console.log({ user });
            }

            return () => {
                unsubscibed();
            };
        });
    }, [navigate, setUser]);


    return (
        <Container style={{ height: '200px' }} className="d-flex justify-content-center align-items-center ">
            <Col>
                <ModalTitle className="mb-3">Đăng nhập vào chatApp</ModalTitle>
                <Button onClick={handleLoginGoogle} variant="outline-success">Đăng nhập bằng google</Button>
            </Col>
        </Container>
    );
} 
export default Login;
