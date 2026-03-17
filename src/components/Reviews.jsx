import React from "react";
import { reviews } from "./reviewsData";
// Import Swiper React components
import { Pagination, Autoplay, Navigation } from 'swiper/modules'; // Import required Swiper modules
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components

const Review = () => {
    return (
        <section className="reviews" id="reviews">
            <div className="reviews-header">
                <h2 className="section-title"><span>Client's Reviews</span></h2>
            </div>
            
            {/* Swiper component */}
            <Swiper
                modules={[Pagination, Autoplay, Navigation]}
                pagination={{ clickable: true }}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                spaceBetween={30}
                slidesPerView={4}
                className="reviews-slider"
                breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    450: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                  }}
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review.id} className="swiper-slide box">
                        <img src={review.image} alt="reviewer" />
                        <h3>{review.name}</h3>
                        <p>{review.reviewText}</p>
                        <div className="stars">
                            {[...Array(5)].map((_, index) => (
                                <i
                                    key={index}
                                    className={`fas fa-star${index < Math.floor(review.stars) ? '' : index < review.stars ? '-half-alt' : '-empty'}`}
                                ></i>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Review;