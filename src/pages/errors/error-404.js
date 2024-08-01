import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap';
import "./error.scss"

const Error404Page = () => {
  return (
    <Container className='error-page d-flex justify-content-center align-items-center'>
      <Row>
        <Col>
        <Image alt='Not found' src='/images/error/404.jpeg' />
        </Col>
      </Row>
    </Container>
  )
}

export default Error404Page