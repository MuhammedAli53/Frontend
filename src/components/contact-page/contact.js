import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Map from './map'
import ContactForm from './contact-form'
import GetInTouch from './get-in-touch'
import "./contact.scss";

const Contact = () => {
  return (
    <div className="contact">
        <Container>
            <Card>
                <Card.Body>
                    <Row className="g-5">
                        <Col lg={7}>
                            <ContactForm/>
                        </Col>
                        <Col lg={5}>
                            <GetInTouch/>
                        </Col> 
                    </Row>
                </Card.Body>
            </Card>

        </Container>

        <Map/>

    </div>
  )
}

export default Contact