import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";

function InputSearchUser({ user }) {
  //user đưuọc truyền từ component  sideBar
  const [nameSearch, setNameSearch] = useState("");
  const [userSearch, setUserSearch] = useState(null);
  //nameSearch: tên user để tìm kiếm
  //userSearch: user được tìm thấy khi tìm kiếm
  //Hàm tìm kiếm người dùng trong Db
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", nameSearch)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setUserSearch(doc.data());
      });
    } catch (e) {
      console.error(e);
    }
  };
  const handleSelect = async () => {
    //kiểm tra phòng chat đã tồn tại chưa
    const combinedId =
      userSearch.uid > user.uid
        ? userSearch.uid + user.uid
        : user.uid + userSearch.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // nếu 2 người dùng chưa kết nối với nhau thì tạo phòng chat
        // console.log('die');
        await setDoc(doc(db, "chats", combinedId), { message: [] });
        // thêm phòng chat mới cho người dùng
        await updateDoc(doc(db, "userRoomChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: userSearch.uid,
            displayName: userSearch.displayName,
            photoURL: userSearch.photoURL,
          },
          [combinedId + ".createdAt"]: serverTimestamp(),
        });
      }
      // thêm cho người dùng còn lại
      await updateDoc(doc(db, "userRoomChats", userSearch.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".createdAt"]: serverTimestamp(),
      });
      setUserSearch(null); //set null để ẩn người dùng vừa search
      setNameSearch(""); // set input rỗng
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Col>
        <InputGroup size="sm" className="mb-3">
          <Button
            onClick={() => {
              handleSearch();
            }}
            id="inputGroup-sizing-sm"
          >
            Tìm kiếm
          </Button>
          <Form.Control
            style={{ outline: "none" }}
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            value={nameSearch}
            onChange={(e) => {
              setNameSearch(e.target.value);
            }}
          />
        </InputGroup>
      </Col>
      {/* Nếu tìm thấy người dùng thì mới hiển thị ra */}
      {userSearch !== null ? (
        <Row
            onClick={handleSelect}
          style={{ cursor: "pointer" }}
          className="align-items-center cursor-pointer"
        >
          <Col xs={4} md={4}>
            <Image
              style={{ width: "40px" }}
              src={userSearch.photoURL}
              roundedCircle
            />
          </Col>
          <Col xs={8} md={8}>
            <p>{userSearch.displayName} </p>
          </Col>
        </Row>
      ) : (
        false
      )}
    </div>
  );
}
export default InputSearchUser;
