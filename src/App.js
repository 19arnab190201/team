import { Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Landing from "./components/Landing";
import ProtectedRoute from "./components/ProtectedRoute";
import HostProject from "./components/HostProject.js";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Room from "./components/Room";
import VC from "./components/VC";

function App() {
  return (
    <Row>
      <Col>
        <UserAuthContextProvider>
          <Routes>
            <Route
              path='/home'
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/hostproject' element={<HostProject />} />
            <Route path='/room' element={<Room />} />
            <Route path='/vc' element={<VC />} />
          </Routes>
        </UserAuthContextProvider>
      </Col>
    </Row>
  );
}

export default App;
