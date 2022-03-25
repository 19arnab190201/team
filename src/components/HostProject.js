import React, { useRef, useState } from 'react'
import { Container, Button, Row, Col, Image ,Form} from "react-bootstrap";
import work from '../assets/work.png'
import {Multiselect} from 'multiselect-react-dropdown';

const HostProject = () => {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
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

const selectedItems = (selectedItems) =>{   
  let value = [];

  for(var i=0;i<selectedItems.length;i++){
    value.push(selectedItems[i].skill);
 }
 setSkills(value)
 console.log(skills);
}
  return (
    <div>
      <Row>
        <Col
          className='create d-flex justify-content-center  flex-column p-4 '
          xs={6}>
          <div>
            <h2 className='text-center'>Host your <span className='gradient-text'>Projects</span></h2>
         {/* <form >
          <label>Project Title :</label>
          <input type="text"  required />
           <label>Project Description :</label>
          <textarea required ></textarea>
          <div className='oneline '>
            
          <input className='me-2' type="text" placeholder='Select the start Date' required />
           
          <input type="text" placeholder="Select the end Date" required />
          </div>
          
           <label>No. of Team members required :</label>
           <select name="selectList" id="selectList">
        <option value="option 1">2</option>
        <option value="option 2">3</option>
       <option value="option 2">4</option>
            <option value="option 2">5</option>
        <option value="option 2">6</option>
        <option value="option 2">More than 6 less than 20</option>
        <option value="option 2">Any number</option>


           </select>
           <label>Category :</label>
          <select name="selectList" id="selectList">
          <option value="option 1">Graphic Designing</option>
          <option value="option 2">Programming</option>
           <option value="option 3">Gamming</option>
           <option value="option 4">Music</option>
          <option value="option 5">Literature</option>
           <option value="option 6">Art</option>
          <option value="option 7">Management</option>
           <option value="option 8">Videography</option>
           <option value="option 9">Photography</option>

           </select>

           <label>Skills required :</label>
           <select name="selectList" id="selectList">
           <option value="option 1">Option 1</option>
           <option value="option 2">Option 2</option>
           </select>
         
         <button className='log'>Add Project</button>
         

        </form> */}
        <Form>
        <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Control
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
          <Form.Control
           as="textarea"
           rows={3} 
           placeholder="Description"
           onChange={(e) => setDescription(e.target.value)}/>           
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">                                                               
            <Form.Control
              type="text"
              placeholder="Start Date" value={  document.write(new Date().toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'}))}
              onChange={(e) => setStartDate(e.target.value)}
          
 />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">                                                               
            <Form.Control
              type="text"
              placeholder="End Date"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
          <Form.Select className="mb-3" controlId="formBasicText" aria-label="Default select example">
          <option>Category</option>
          <option value="option 1">Graphic Designing</option>
          <option value="option 2">Programming</option>
           <option value="option 3">Gamming</option>
           <option value="option 4">Music</option>
          <option value="option 5">Literature</option>
           <option value="option 6">Art</option>
          <option value="option 7">Management</option>
           <option value="option 8">Videography</option>
           <option value="option 9">Photography</option>
          </Form.Select>

          <div className="d-grid gap-2 my-3">
          <Multiselect closeIcon="cancel" options={options} onSelect={selectedItems} placeholder="Skills Required" displayValue="skill"/>
          </div>
          <div className="d-grid gap-2">
            <Button className="log" type="Submit">
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