import React, { useState, useEffect, useRef } from 'react'
import { Container, Button, Row, Col, Image ,Form} from "react-bootstrap";
import {useLocation} from 'react-router-dom'
import { db, auth } from '../firebase'
import SendMessage from './SendMessage.js'
import { doc, onSnapshot, collection,query, orderBy} from "firebase/firestore";
const Room = () => {
    const {state} = useLocation();
    console.log(state.id);

    const scroll = useRef()
    const [messages, setMessages] = useState([])
    useEffect(() => {

        const unsub = onSnapshot(doc(db, "messages", state.id), (snapshot) => {
            if(snapshot.data()){
                console.log(123,Object.values(snapshot.data()))
                setMessages(Object.values(snapshot.data()))
            }
        });

        // db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
        //     setMessages(snapshot.docs.map(doc => doc.data()))
        // })
    }, [])
    return (
        <>
        <div className='chat-box'>
           
               <div className="head">
               <h2>{state.title}</h2> 
            </div>
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <img src={photoURL} alt="" />
                            <p className="msg-text">{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage id={state.id} scroll={scroll} />
            <div ref={scroll}></div>
        </div>
        <div className="proj-details">

        </div>
</>
          
    )
}
export default Room