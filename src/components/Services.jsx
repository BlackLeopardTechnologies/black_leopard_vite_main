import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Services.css";
import servicesData from "./servicesData";
import ScrollReveal from "./ScrollReveal";

const Services = () => {


  return (
    <section className="services" id="services">
      <ScrollReveal direction="up" delay={0.2}>
        <div className="services-header">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="section-title">Our Services</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="services-intro">
              BlackLeopard Technologies offers comprehensive service pillars designed to meet the complete technology needs of modern businesses.
            </p>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.4}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="services-swiper"
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {servicesData.map((service, index) => (
            <SwiperSlide key={service.id}>
              <ScrollReveal direction="up" delay={index * 0.1}>
                <div className="service-card">
                  <div className="service-image-wrapper">
                    <img src={service.image} alt={service.title} className="service-image" />
                  </div>

                  <div className="service-content">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.short}</p>
                    <ul className="feature-list">
                      {service.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </SwiperSlide>
          ))}
        </Swiper>
      </ScrollReveal>
    </section>
  );
};

export default Services;
