import React from 'react'
import "./upcoming-events.scss";
import { Container } from 'react-bootstrap';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import events from "../../helpers/data/events.json";
import EventCard from './event-card';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const UpcomingEvents = () => {

    const upcomingEvents = events.filter( (event) => new Date(event.date) > new Date())


  return (
    <div className="upcoming-events">
        <Container>
            <h2>
                <div className="prev"><FiChevronLeft/></div>
                <div>Upcoming Events</div>
                <div className="next"><FiChevronRight/></div>
            </h2>


            <Swiper
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                navigation={{
                    prevEl: '.prev',
                    nextEl: '.next'
                }} 
                
                breakpoints={{
                    576:{
                        slidesPerView: 2
                    },
                    992:{
                        slidesPerView: 3
                    },
                    1400:{
                        slidesPerView: 4
                    }
                }}
                >
                
                {upcomingEvents.map( (event)=> <SwiperSlide key={event.id}>
                    <EventCard {...event} />
                </SwiperSlide> )}

            </Swiper>
            

        </Container>

    </div>
  )
}

export default UpcomingEvents