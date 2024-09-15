import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { VscAccount } from "react-icons/vsc";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
 // const [isVisiblelogin, setIsVisiblelogin] = useState(false);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  function Dropdown(props) {
    return (
      <div>
        {props.isVisible ? (
          <ul className="dropdown">
            <li className="links listitem"><Link to={"/profile"} onClick={() => setShow(!show)}>
              My profile
            </Link></li>
            <li className="links listitem" >
            <Link to={"/"} 
            onClick={handleLogout}>
              LOGOUT
              </Link>
            </li>
            
           
          </ul>
        ) : null}
      </div>
    );
  }



  

 

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            
            <Link to={"/doctors"} onClick={() => setShow(!show)}>
              Our Doctors
            </Link>
          </div>
          {isAuthenticated ? (
            <div>
            <VscAccount size={40} onClick={() =>setShow(!show)} />
            <Dropdown isVisible={show} />
            
            </div>
          ) : (
            
            <button className="loginBtn btn" onClick={goToLogin}>
            LOGIN </button>
            
              
            
            
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
