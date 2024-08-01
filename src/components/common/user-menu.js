import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Nav, Offcanvas } from "react-bootstrap";
import { AiFillLock, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "./user-menu.scss";
import { logout } from "../../store/slices/auth-slice";
import { removeFromLocalStorage } from "../../helpers/functions/encrypted-storage";
import { swalConfirm } from "../../helpers/functions/swal";

const UserMenu = () => {
  const { isUserLogin, user, menu } = useSelector((state) => state.auth);/* state auth yapısı store/index.js den geliyo. */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleClose = () => setShowMenu(false);
  const handleOpen = () => setShowMenu(true);

  const handleMenuClick = (link) => {
    navigate(link);
    handleClose();
  };
  const handleLogout = async () => { 
    const resp = await swalConfirm("Are you sure to logout", "");
    if(!resp.isConfirmed) return;
    /* burası bizim logout methodumuz. şimdi logout yapmamız lazım burda. tokeni silmemiz lazım. bunun için dispatch e ihtiyacımız var. */
    dispatch(logout())/* slices/auth-slice içerisine logout fonksiyonu yazdık zaten, onu çağıracağız. */
    removeFromLocalStorage("token"); /* sonrasında da tokeni silicez. */
    navigate("/");/* sonrasında da navigate ile homepage e yönlendirecek. */
   }

  return (
    <>
      <div className="user-menu">
        {isUserLogin ? (/* eğer kullanıcı login olduysa bir offcanvas yapısı koy, dashboard menu yapıları olsun içinde.  */
          <>
            <Button variant="primary" size="sm" onClick={handleOpen}>
              {user.name} {user?.surname} <AiOutlineMenu />
            </Button>
            <Offcanvas show={showMenu} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="flex-column">
                  <Nav.Link  onClick={() => handleMenuClick("/dashboard")}>
                    Dashboard
                  </Nav.Link>
                  {menu.map((item) => (
                    <Nav.Link
                      key={item.title}
                      onClick={() => handleMenuClick(item.link)}
                     
                    >
                      {item.title}
                    </Nav.Link>
                  ))}
                  <Nav.Link  onClick={handleLogout}>
                    Logout
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Offcanvas>
          </>
        ) : (/* login olmadıysa bu yapı */
          <Link to="/login">
            <AiFillLock /> Login
          </Link>
        )}
      </div>
    </>
  );
};
export default UserMenu;