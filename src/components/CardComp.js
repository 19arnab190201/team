import React from 'react'
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router";

const CardComp = ({item}) => {
  const navigate = useNavigate();
  return (
    <Card className="team-card">
      
  <Card.Body>
  <span class="badge team-grad mb-3">{item.category}</span>
    <Card.Title className="team-card-title">{item.title}</Card.Title>
    <Card.Text className="text-muted">
      {item.description}
    </Card.Text>
    <div className="skills-container me-2 mb-2">
    {(item.skills).map((skill) =>( <span className="badge rounded-pill team-badge me-2 mb-2">{skill}</span>))}
    </div>
    <button className="btn btn-primary card-btn" onClick={()=>{navigate('/room',{ state:item})}}>Join Project</button>
    {/* <Card.Subtitle className="mb-2 text-muted">{item.endDate.toDate().toDateString()}</Card.Subtitle> */}

  </Card.Body>
</Card>
  ) 
}

export default CardComp