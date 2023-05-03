import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //npm i react-router-dom
import Login from './Pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import { useState } from 'react';
function App() {
  const [user, setUser] = useState({ displayName: '', email: '', uid: '', photoURL: '' });
  const [roomInfo, setRoomInfo] = useState({ chatId: '', displayName: '', photoURL: '' });

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/Login" element={<Login setUser={setUser}/>}></Route>
                    <Route path="/" element={<Home user={user} roomInfo={roomInfo} setRoomInfo={setRoomInfo} />}></Route>
                </Routes>
            </div>
        </Router>
    );
}
export default App;
