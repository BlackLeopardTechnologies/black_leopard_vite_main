import React, { useState, useEffect } from "react";
import homeBackgroundSlides from "../Database/homeBackgroundSlides";

const Home = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = homeBackgroundSlides.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(interval);
    }, [totalSlides]);

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    const goPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    return (
        <section className="home" id="home">

            {/* Render all slides */}
            {homeBackgroundSlides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`home-bg ${index === currentIndex ? "active" : ""}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                ></div>
            ))}

            <button className="home-nav-btn home-nav-btn--prev" onClick={goPrev}>
                <span></span><span></span>
            </button>

            <div className="home-overlay">
                <h2 className="home-overlay-text" dangerouslySetInnerHTML={{ __html: homeBackgroundSlides[currentIndex].text }}></h2>
            </div>

            <button className="home-nav-btn home-nav-btn--next" onClick={goNext}>
                <span></span><span></span>
            </button>

        </section>
    );
};

export default Home;