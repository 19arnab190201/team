import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import CardComp from "./CardComp";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
const Home = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { logOut, userData } = useUserAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.uid) {
      const unsub = onSnapshot(doc(db, "USERS", userData.uid), (doc) => {
        setUserDetails(doc.data());
        unsub();
      });
    }
  }, [userData]);

  useEffect(() => {
    if (userDetails) {
      console.log(userDetails.intrests);
      if (userDetails.intrests) {
        setProjects([]);
        for (let index = 0; index < userDetails.intrests.length; index++) {
          const q = query(
            collection(db, "PROJECTS"),
            where("category", "==", userDetails.intrests[index])
          );
          const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((pro) => {
              console.log("PRO: ", pro.doc.data());
              setProjects((prev) => [...prev, pro.doc.data()]);
            });
          });
        }
        setLoading(false);
      }
    }
  }, [userDetails]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  if (userDetails && !loading) {
    return (
      <>
        <div className='d-flex justify-content-between flex-wrap header-team'>
          <div className='px-4 pt-3 logo'>
            <img src={logo} width='45' height='60' alt='React Bootstrap logo' />
            Teammates
          </div>

          <div className='p-4 gap-2 '>
            <Button
              className='proj me-3'
              onClick={() => navigate("/hostproject")}>
              Host Project
            </Button>
            <Button className='log logout me-3' onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>

        <div className='mt-5 ms-4 pt-1 greetings'></div>
        <div className='interest-container  d-flex '>
          <h2 className='intrests'>Based On Your Interests :</h2>
          {userDetails.intrests.map((interest) => (
            <span class='badge team-grad-outline mx-3 mb-2'>{interest}</span>
          ))}
        </div>
        <div className='container team-card-container'>
          {projects.map((item) => (
            <CardComp key={item.id} item={item} />
          ))}
        </div>
      </>
    );
  } else {
    return <>Loading...</>;
  }
};

export default Home;
