import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap';
import "./error.scss"

const Error401Page = () => {
  return (
    <Container className='error-page d-flex justify-content-center align-items-center'>
    <Row>
      <Col>
      <Image alt='Unauthorized' src='/images/error/401.png' />
      </Col>
    </Row>
  </Container>
  )
}

export default Error401Page