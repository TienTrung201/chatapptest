import { Col, Image } from 'react-bootstrap';
function SideBar() {
    return (
        <div style={{ background: '#B9EDDD' }} className="h-100">
    {/* Đây là nơi hiển thị thông tin người dùng đăng nhập */}
            <div style={{ background: '#63b978', height: '50px' }} className="d-flex align-items-center">
                <Col xs={6} md={4}>
                    <Image style={{ width: '40px' }}
               src="" roundedCircle />
                </Col>
                <Col xs={6} md={4}>
                    <p>tên</p>
                </Col>
                <Col xs={6} md={4}>
                    <button style={{ background: '#E3F2C1', fontSize:'12px' }} className="text-size-11 border-0">
                        Đăng xuất
                    </button>
                </Col>
            </div>
    {/* Đây là nơi hiển thị thông tin người dùng đăng nhập */}
            {/* Đây là danh sách các cuộc trò chuyện*/}
            {/* Đây là danh sách các cuộc trò chuyện*/}
            Sidebar
        </div>
    );
}
export default SideBar;
