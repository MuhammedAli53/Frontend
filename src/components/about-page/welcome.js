import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import "./welcome.scss";
 
const Welcome = () => {
  return (
    <div className="welcome">
        <Container>
            <Row className="g-5">
                <Col md={6}>
                    <Image src="/images/about/welcome.png" className="img-fluid"/>
                </Col>
                <Col md={6}>
                    <h2 className="mb-3">Welcome to the most preferred IT School</h2>
                    <p className="mb-3">Through a combination of lectures, readings, discussions, students will gain a solid foundation in educational psychology.</p>

                    <ul>
                        <li>Cutting-edge curriculum for the latest IT trends and technologies.</li>
                        <li>Expert instructors passionate about sharing their knowledge.</li>
                        <li>Hands-on training and real-world projects for practical experience.</li>
                        <li>Earn industry-recognized certifications for enhanced employability.</li>
                    </ul>
                </Col>
            </Row>
        </Container>

    </div>
  )
}

export default Welcome