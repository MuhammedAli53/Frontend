import React from 'react'
import "./featured-courses.scss";
import { Col, Container, Row } from 'react-bootstrap';
import courses from "../../../helpers/data/courses.json";
import CourseCard from '../../courses-page/course-card';

const FeaturedCourses = () => {

    const featuredCourses = courses.filter( (course) => course.featured )

  return (
    <div className="featured-courses">
        <h2>Featured Courses</h2>

        <Container>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-5">
                {featuredCourses.map( (course)=> <Col key={course.id}>
                        <CourseCard {...course}  />
                    </Col> )}
            </Row>
        </Container>


    </div>
  )
}

export default FeaturedCourses