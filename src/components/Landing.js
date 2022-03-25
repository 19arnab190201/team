import React from "react";
import {useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import Hero from "../components/Hero";
const Landing = () => {
  const { userData } = useUserAuth();

  const navigate = useNavigate();
  if (userData) {
    navigate("/home"); ;
  }
  const loginpage = async (e) => {
      navigate("/login");   
  };

  return (
    <div className='App'>
      <Hero />
       {/* <Button variant="primary" onClick={loginpage}>
              Log In
            </Button> */}
    </div>
  );
}

export default Landing;
