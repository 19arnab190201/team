import React,{useState,useEffect} from "react";
import logo from '../assets/logo.png';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import CardComp from "./CardComp";
import { doc, onSnapshot, collection,query, where} from "firebase/firestore";
import {db} from '../firebase'
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
      unsub()  
  });
}
  }, [userData]);
  
  useEffect(() => {
    if (userDetails) {
      console.log(userDetails.intrests);
      if(userDetails.intrests){
        setProjects([]);
        for (let index = 0; index < userDetails.intrests.length; index++)
        {
          const q = query(collection(db, "PROJECTS"), where("category", "==", userDetails.intrests[index]));
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

 

 let curDate = new Date();
 curDate = curDate.getHours();
let greeting = '';
if(curDate >=1 && curDate < 12){
  greeting = 'Good Morning'
}else if(curDate >=12 && curDate < 16){
  greeting = 'Good Afternoon'
}else if(curDate >=16 && curDate < 21){
  greeting = 'Good Evening'
}else{
  greeting = 'Good Night'
}

  
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  if(userDetails && !loading){
    return (
      <>
      <div className="d-flex justify-content-between flex-wrap">
        <div className='p-4 logo'>
            <img src={logo} width='30' height='40' alt='React Bootstrap logo' />
          Teammates
        </div>
       
        <div className="p-4 gap-2 ">
          <Button className="proj me-3" onClick={()=>navigate("/hostproject")}>
            Host Project
          </Button>
          <Button className="log logout me-3" onClick={handleLogout}>
            Log out
          </Button>
        </div>
        </div>
        <div className="ms-4 pt-1 greetings">
          <h2 >{greeting}, <span className="gradient-text">{userDetails.name} </span> </h2>
        </div>
        <div className="interest-container  d-flex ">
          {(userDetails.intrests).map((interest) => (<span className="interest-text me-5">{interest}</span>))}
        </div>
        <div className="container team-card-container"> 
          {projects.map((item) =>( <CardComp key={item.id} item={item}/>))}
        </div>       
      </>
    );
  }
  else{
    return <>Loading...</>
  }
};

export default Home;
