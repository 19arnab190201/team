import React from "react";
import {useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppNavbar = () => {
  const navigate = useNavigate();

  const loginpage = async (e) => {
    navigate("/login");   
};
  return (
    <div className='t-container'>
      <Navbar collapseOnSelect expand='lg' bg='transparent' variant='light'>
        <Navbar.Brand href='#home' className='mt-1 pt-1 logo'>
          <img src={logo} width='30' height='40' alt='React Bootstrap logo' />
          Teammates
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='d-flex  justify-content-end w-100 nav-items'>
         
            <Button className='button' onClick={loginpage}>Login</Button>{" "}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
