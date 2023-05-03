import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //npm i react-router-dom
import Login from './Pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/Login" element={<Login />}></Route>
                    <Route path="/" element={<Home />}></Route>
                </Routes>
            </div>
        </Router>
    );
}
export default App;
