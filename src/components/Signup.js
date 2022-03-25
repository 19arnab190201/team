import React, { useState ,useEffect} from "react";
import {Multiselect} from 'multiselect-react-dropdown';
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import {db} from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
const Signup = () => {
  const {userData} = useUserAuth();
   const data = [
     {skill: 'Graphic Designing', id: 1},
     {skill: 'Programming', id: 2},
     {skill: 'Music', id: 3},
     {skill: 'Gamming', id: 4},
     {skill: 'Literature', id: 5},
     {skill: 'Art', id: 6},
     {skill: 'Management', id: 7},
     {skill: 'Photography', id: 8},
     {skill: 'Videography', id: 9}
   ]
   const [options] = useState(data);
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [skill, setSkill] = useState([]);
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password).then(cred =>{
         setDoc(doc(db, "USERS", cred.user.uid), {
          name: name,
          uid: cred.user.uid,
          intrests: skill
        });
      });
      console.log(userData)
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
   
  const selectedItems = (selectedItems) =>{   
    let value = [];

    for(var i=0;i<selectedItems.length;i++){
      value.push(selectedItems[i].skill);
   }
   setSkill(value)
   console.log(skill);
  }
  return (
    <>
      <div className="p-4 card-container">
        <h2 className="mb-3 text-center"> SIGN UP</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">                                                               
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {/* skills  */}
          <div className="d-grid gap-2 my-3">
          <Multiselect closeIcon="cancel" options={options} onSelect={selectedItems} placeholder="Select your interests" displayValue="skill"/>
          </div>

          <div className="d-grid gap-2">
            <Button className="log" type="Submit">
              Sign up
            </Button>
          </div>
        </Form>
     
      <div className="p-4  mt-3 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
       </div>
    </>
  );
};

export default Signup;
