import React, { useRef, useState } from 'react'
import { Container, Button, Row, Col, Image ,Form} from "react-bootstrap";
import { useNavigate } from "react-router";

import work from '../assets/work.png'
import {Multiselect} from 'multiselect-react-dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { doc, setDoc, Timestamp } from "firebase/firestore"; 
import { db } from '../firebase';
const HostProject = () => {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [startDate, setStartDate] = useState();
const [endDate, setEndDate] = useState();
const [category, setCategory] = useState("");
const [skills, setSkills] = useState("");

const data = [
  {skill: 'Adobe Illustrator', id: 1},
  {skill: 'Adobe XD', id: 2},
  {skill: 'Figma', id: 3},
  {skill: 'Canva', id: 4},
  {skill: 'HTML,CSS', id: 5},
  {skill: 'Jvascript', id: 6},
  {skill: 'React', id: 7},
  {skill: 'React Native', id: 8},
  {skill: 'Photoshop', id: 9}
]
const [options] = useState(data);
const shortid = require('shortid');
const navigate = useNavigate();

const projectFormSubmit=()=>{
  let uid = shortid.generate();

  const docData = {
    id: uid,
    title: title,
    description: description,
    endDate: Timestamp.fromDate(endDate),
    startDate: Timestamp.fromDate(startDate),
    category: category,
    skills: skills,
  };
   setDoc(doc(db, "PROJECTS", uid), docData);
   navigate("/home");

  console.log(title, description, startDate, endDate, category, skills);
}

const selectedItems = (selectedItems) =>{   
  let value = [];

  for(var i=0;i<selectedItems.length;i++){
    value.push(selectedItems[i].skill);
 }
 setSkills(value)
 console.log(skills);
}
  return (
    <div className="hostbody">
      <Row>
        <Col
          className='create d-flex justify-content-center flex-column p-4 '
          xs={6}>
          <div>
            <h2 className='host text-center'>Host your <span className='gradient-text host-title'>Projects</span></h2>
         
        <Form>
        <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Control
              type="text"
              placeholder="Project Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
          <Form.Control
           as="textarea"
           rows={3} 
           placeholder="Project Description"
           onChange={(e) => setDescription(e.target.value)}/>           
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">  
          <DatePicker placeholderText='Select Start Date' selected={startDate===""?null:startDate} 
          onChange={(date) =>{new Date(setStartDate(date))}} dateFormat="dd-MM-yyyy"   />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText"> 
          <DatePicker  placeholderText='Select End Date'   selected={endDate===""?null:endDate} 
          onChange={(date) =>{new Date(setEndDate(date))}} dateFormat="dd-MM-yyyy" />
          </Form.Group>
          <Form.Select value={category} onChange={c =>{setCategory(c.target.value)}} className="mb-3" controlId="formBasicText" aria-label="Default select example">
          <option>Category</option>
          <option>Graphic Designing</option>
          <option>Programming</option>
           <option>Gamming</option>
           <option>Music</option>
          <option>Literature</option>
           <option>Art</option>
          <option>Management</option>
           <option>Videography</option>
           <option>Photography</option>
          </Form.Select>

          <div className="d-grid gap-2 my-3">
          <Multiselect closeIcon="cancel" options={options} onSelect={selectedItems} placeholder="Skills Required" displayValue="skill"/>
          </div>
          <div className="d-grid gap-2">
            <Button className="log" type="button" onClick={projectFormSubmit}>
              Add Project 
            </Button>
          </div>
        </Form>
    </div>
        </Col>
        <Col className=' d-flex align-items-center hero-right' xs={6}>
          <img className='hero-img' src={work} />
        </Col>
      </Row>
      </div>
  )
}

export default HostProject
