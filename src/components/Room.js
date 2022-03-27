import React, { useState, useEffect, useRef } from "react";
import { Container, Button, Row, Col, Image, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { db, auth } from "../firebase";
import SendMessage from "./SendMessage.js";
import { BsArrowLeft, BsFillCameraVideoFill } from "react-icons/bs";
import { useNavigate } from "react-router";

import { doc, onSnapshot } from "firebase/firestore";

const Room = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log(state);

  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "messages", state.id), (snapshot) => {
      if (snapshot.data()) {
        const sortedMessages = Object.values(snapshot.data()).sort(
          (a, b) => a.createdAt - b.createdAt
        );
        setMessages(sortedMessages);
      }
    });

    // db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
    //     setMessages(snapshot.docs.map(doc => doc.data()))
    // })
  }, []);
  let date = new Date(state.startDate.seconds * 1000).toDateString();
  const el = document.getElementById("chat-feed");
  if (el) {
    el.scrollTop = el.scrollHeight;
  }
  function useChatScroll(dep) {
    var ref = React.useRef();
    React.useEffect(
      function () {
        if (ref.current) {
          ref.current.scrollTop = ref.current.scrollHeight;
        }
      },
      [dep]
    );
    return ref;
  }
  const ref = useChatScroll(messages);

  return (
    <>
      <div className='parent'>
        <div className='div1 '>
          <h4 className='topic'>Project Details</h4>
          <h5 className='right'>Project Title :</h5>
          <p>{state.title}</p>
          <h5 className='right'>Project Description :</h5>
          <p>{state.description}</p>
          <h5 className='right'>Project Start Date :</h5>
          <p>{date}</p>
          <h5 className='right'>Skills Required :</h5>
          <p>
            {state.skills.map((skill) => (
              <span className='badge rounded-pill border border-light px-3 py-2 me-2 mb-2'>
                {skill}
              </span>
            ))}
          </p>
          <div className='load'>
            <a className='download' href={state.fileurl} target='_blank'>
              Download Project Files
            </a>
          </div>
        </div>

        <div className='div2'>
          <SendMessage id={state.id} scroll={scroll} />
          <div ref={scroll}></div>
        </div>

        <div ref={ref} id='chat-feed' className='div3'>
          {" "}
          {console.log(messages)}
          {messages.map(({ id, text, uid, displayName }) => (
            <div>
              <p
                className={`msg ${
                  uid === auth.currentUser.uid
                    ? "username user-right"
                    : "username user-left"
                }`}>
                {displayName}
              </p>
              <br />
              <div
                key={id}
                className={`msg ${
                  uid === auth.currentUser.uid ? "sent" : "received"
                }`}>
                <p className='msg-text'>{text}</p>
              </div>
            </div>
          ))}{" "}
        </div>
        <div className='div4'>
          <span style={{ color: "white" }}>
            <button onClick={() => navigate("/home")} className='icon-btn'>
              <BsArrowLeft />
            </button>
          </span>
          <h4 className='heading'>Project Virtual Room</h4>
          <button
            className='icon-btn video-call'
            onClick={() =>
              window.open("https://meet.google.com/new", "_blank")
            }>
            <BsFillCameraVideoFill />
          </button>
        </div>
      </div>
    </>
  );
};
export default Room;
