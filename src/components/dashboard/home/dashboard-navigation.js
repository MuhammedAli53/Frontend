import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import userMenuData from "../../../helpers/data/user-menu.json";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardNavigation = () => {
  const {menu} = useSelector(state => state.auth);
  return (
    <Container>
        <Row className='g-4'>
            {menu.map((item) =>(
                <Col md={4} key={item.title}>
                    <Card>
                        <Card.Body className='text-center'>
                            <Link to={item.link}>{item.title}</Link>
                        </Card.Body>
                    
                    </Card>
                </Col>
            ) )}
        </Row>
    </Container>
  )
}

export default DashboardNavigation;