import React, { useRef, useState } from "react";
import { Container, Button, Row, Col, Image, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import work from "../assets/work.png";
import { Multiselect } from "multiselect-react-dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const HostProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState("");
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);
  const uploadFiles = (file, id, data) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `${id}/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          const dataRef = doc(db, "PROJECTS", id);
          setDoc(
            dataRef,
            {
              id: data.id,
              title: data.title,
              description: data.description,
              endDate: data.endDate,
              startDate: data.startDate,
              category: data.category,
              skills: data.skills,
              fileurl: downloadURL,
            },
            { merge: true }
          );
        });
        navigate("/home");
      }
    );
  };

  const data = [
    { skill: "Adobe Illustrator", id: 1 },
    { skill: "Adobe XD", id: 2 },
    { skill: "Figma", id: 3 },
    { skill: "Canva", id: 4 },
    { skill: "HTML,CSS", id: 5 },
    { skill: "Javascript", id: 6 },
    { skill: "React", id: 7 },
    { skill: "React Native", id: 8 },
    { skill: "Photoshop", id: 9 },
    { skill: "Open To All", id: 10 },
  ];
  const [options] = useState(data);
  const shortid = require("shortid");
  const navigate = useNavigate();

  const projectFormSubmit = () => {
    if (
      !title ||
      !description ||
      !startDate ||
      !endDate ||
      !category ||
      !skills ||
      !file
    ) {
      alert("Please Fill All The Fields");
      return;
    }
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

    uploadFiles(file, uid, docData);
    console.log(title, description, startDate, endDate, category, skills);
  };
  const selectedItems = (selectedItems) => {
    let value = [];

    for (var i = 0; i < selectedItems.length; i++) {
      value.push(selectedItems[i].skill);
    }
    setSkills(value);
    console.log(skills);
  };
  return (
    <div className='hostbody'>
      <Row>
        <Col
          className='create d-flex justify-content-center flex-column py-3'
          xs={6}>
          <div>
            <h2 className='host text-center'>
              Host your{" "}
              <span className='gradient-text host-title'>Projects</span>
            </h2>

            <Form>
              <Form.Group className='mb-3 ' controlId='formBasicText'>
                <Form.Control
                  type='text'
                  placeholder='Project Title'
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Control
                  as='textarea'
                  rows={2}
                  placeholder='Project Description'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <div className='d-flex justify-content-around my-3'>
                <Form.Group className='' controlId='formBasicText'>
                  <DatePicker
                    className='date'
                    placeholderText='Select Start Date'
                    selected={startDate === "" ? null : startDate}
                    onChange={(date) => {
                      new Date(setStartDate(date));
                    }}
                    dateFormat='dd-MM-yyyy'
                  />
                </Form.Group>
                <Form.Group className='mb-1 ' controlId='formBasicText'>
                  <DatePicker
                    className='date'
                    placeholderText='Select End Date'
                    selected={endDate === "" ? null : endDate}
                    onChange={(date) => {
                      new Date(setEndDate(date));
                    }}
                    dateFormat='dd-MM-yyyy'
                  />
                </Form.Group>
              </div>

              <Form.Select
                value={category}
                onChange={(c) => {
                  setCategory(c.target.value);
                }}
                className='mb-1 form-control '
                controlId='formBasicText'
                aria-label='Default select example'>
                <option>Category</option>
                <option>Graphic Designing</option>
                <option>Programming</option>
                <option>Gamming</option>  <option>Music</option>
                <option>Literature</option>  <option>Art</option>
                <option>Management</option>  <option>Videography</option> {" "}
                <option>Photography</option>
              </Form.Select>

              <div className='d-grid gap-2 my-3 '>
                <Multiselect
                  className='bg-white'
                  closeIcon='cancel'
                  options={options}
                  onSelect={selectedItems}
                  placeholder='Skills Required'
                  displayValue='skill'
                />
              </div>
              <div className='d-flex justify-content-center align-items-center gap-2 my-3'>
                <input
                  className='bg-white up-file '
                  type='file'
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </div>

              <div className='d-grid gap-2'>
                <Button
                  className='log'
                  type='button'
                  onClick={projectFormSubmit}>
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
  );
};

export default HostProject;
