import React,{useState,useEffect} from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

import { doc, onSnapshot } from "firebase/firestore";
import {db} from '../firebase'
const Home = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { logOut, userData, getProjects } = useUserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.uid) {
      const unsub = onSnapshot(doc(db, "USERS", userData.uid), (doc) => {
      setUserDetails(doc.data());
      unsub()  
  });
}
  }, [userData]);

 
    if(userDetails){
      getProjects(userDetails.intrests);
    }


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
  console.log(userDetails);
  if(userDetails){
    return (
      <>
      <div className="d-flex justify-content-between">
        <h2 className="p-4">{greeting}, {userDetails.name}</h2>
        <div className="p-4 gap-2 ">
         
          <Button className="proj me-3" onClick={()=>navigate("/hostproject")}>
            Host Project
          </Button>
          <Button className="log logout me-3" onClick={handleLogout}>
            Log out
          </Button>
        </div>
        </div>
        <div className="container">
          {userDetails.intrests.map((intrest) => (  <div className="intrest">{intrest}</div>))}
        </div>
        {/* <div id="root" className="p-4  mt-3 text-center">
          Hello Welcome <br />
          {userData && userData.email}
        </div> */}
        
      </>
    );
  }
  else{
    return <>Loading...</>
  }
};

export default Home;
