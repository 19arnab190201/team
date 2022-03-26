import React, { useState } from 'react'
import { db, auth } from '../firebase'
import firebase from 'firebase/compat/app';
import {Button ,Row,Col} from 'react-bootstrap'
import {doc, setDoc  ,serverTimestamp  } from "firebase/firestore"; 

function SendMessage({ scroll,id }) {
    const [msg, setMsg] = useState('')
// text: msg, uid, createdAt: serverTimestamp()
    async function sendMessage(e) {
        setMsg('')

        e.preventDefault()
        const { uid} = auth.currentUser;
        var shortid = (require('shortid')).generate();
        console.log("shortid : " + shortid);
        var data = {[shortid]:{text: msg, uid: uid, createdAt: serverTimestamp()}};
        console.log("DATA : ", data);
        await setDoc(doc(db, "messages",id ), {
            [shortid]:{text: msg, uid: uid, createdAt: serverTimestamp()}                       
          },{ merge: true });
          

        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div className="sendMsg">  
            <form onSubmit={sendMessage}>
            <Row>
    <Col xs={12} md={10}>
    <input style={{ width: '100%'}}  placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
    </Col>
    <Col xs={8} md={2}>
    <Button style={{ width: '100%'}} type="submit">Send</Button>
    </Col>
  </Row>
            </form>
        </div>
    )
}

export default SendMessage