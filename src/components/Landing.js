import React from "react";
import {useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import Hero from "../components/Hero";
const Landing = () => {
  const { user } = useUserAuth();

  const navigate = useNavigate();
  if (user) {
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
