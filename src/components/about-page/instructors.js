import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import instructors from "../../helpers/data/instructors.json";
import InstructorCard from "./instructor-card";
import "./instructors.scss";

const Instructors = () => {
  return (
    <Container className="instructors">
      <Row className="g-5">
        <Col lg={6}>
          <h2>Our Most Experienced Instructors</h2>
        </Col>
        {instructors.map((instructor) => (
          <Col lg={3} md={4} sm={6} key={instructor.id}>
            <InstructorCard {...instructor} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Instructors;
