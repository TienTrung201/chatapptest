import { signOut } from "firebase/auth";
import { Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import InputSearchUser from "./InputSearchUser";
import ListUserChat from "./ListUserChat";
function SideBar({ user ,setRoomInfo}) {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
      window.location.reload();
    });
  };
  return (
    <div style={{ background: "#B9EDDD" }} className="h-100">
      {/* Đây là nơi hiển thị thông tin người dùng đăng nhập */}
      <div
        style={{ background: "#63b978", height: "50px" }}
        className="d-flex align-items-center"
      >
        <Col xs={6} md={4}>
          <Image style={{ width: "40px" }} src={user.photoURL} roundedCircle />
        </Col>
        <Col xs={6} md={4}>
          <p>{user.displayName}</p>
        </Col>
        <Col xs={6} md={4}>
          <button
            onClick={handleLogout}
            style={{ background: "#E3F2C1", fontSize: "12px" }}
            className="text-size-11 border-0"
          >
            Đăng xuất
          </button>
        </Col>
      </div>
      {/* Đây là nơi hiển thị thông tin người dùng đăng nhập */}
      <InputSearchUser user={user} />
      {/* Đây là danh sách các cuộc trò chuyện*/}
      <ListUserChat setRoomInfo={setRoomInfo} user={user}/>
      {/* Đây là danh sách các cuộc trò chuyện*/}
      Sidebar
    </div>
  );
}
export default SideBar;
