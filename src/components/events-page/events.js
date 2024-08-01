import React from "react";
import events from "../../helpers/data/events.json";
import { Col, Container, Row } from "react-bootstrap";
import EventCard from "./event-card";

const Events = () => {
  return (
    <Container>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-5">
        {events.map((event) => (
          <Col key={event.id}>
            <EventCard {...event} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Events;
