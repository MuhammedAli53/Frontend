import React from "react";
import "./slider.scss";
import { Carousel, Image } from "react-bootstrap";
import slides from "../../../helpers/data/slider.json";


const Slider = () => {
  return (
    <Carousel fade className="slider">
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <Image src={`/images/slider/${slide.image}`} className="img-fluid" />
          <Carousel.Caption>
            <h3>{slide.title}</h3>
            <p>{slide.desc}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
