import React from "react";
import { Card } from "react-bootstrap";
import "./instructor-card.scss";

const InstructorCard = ({ firstName, lastName, title, image }) => {
  return (
    <Card className="instructor-card">
      <div className="image">
        <Card.Img
          variant="top"
          src={`/images/instructors/${image}`}
          alt={title}
          className="img-fluid"
        />
      </div>
      <Card.Title>
        <h4>
          {firstName} {lastName}
        </h4>
        <h6>{title}</h6>
      </Card.Title>
    </Card>
  );
};

export default InstructorCard;
