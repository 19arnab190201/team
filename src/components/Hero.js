import React from "react";
import AppNavbar from "../components/AppNavbar";
import { Container, Button, Row, Col, Image } from "react-bootstrap";

import team from "../assets/team.svg";
import blob from "../assets/blob.svg";
import triangle from "../assets/triangle.svg";
const Hero = () => {
  return (
    <div>
      <AppNavbar />
      <Row>
        <Col
          className='hero-text d-flex justify-content-center align-items-start flex-column ps-5'
          xs={6}>
          <div>
            Find the perfect <span className='gradient-text'>Teammate </span>for
            your project
          </div>
        </Col>
        <Col className=' d-flex align-items-center hero-right' xs={6}>
          <img className='hero-img' src={team} />
        </Col>
      </Row>
      <img src={blob} className='blob' alt='' />
      <img src={triangle} className='triangle' alt='' />
       <img src={triangle} className='triangle1' alt='' />
    </div>
  );
};

export default Hero;
