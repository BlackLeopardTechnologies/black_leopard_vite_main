import React from "react";
import "./About.css";

const About = () => {
  const coreValues = [
    {
      title: "Excellence",
      description: "We maintain the highest standards in service delivery, ensuring quality, reliability, and performance in every project we undertake. From consultation to implementation and support, excellence is our benchmark.",
      image: "/images/excel1.jpg",
    },
    {
      title: "Integrity",
      description: "We conduct business with honesty, transparency, and ethical practices. We build trust through consistent, dependable service delivery and uphold the highest professional standards in all our interactions.",
      image: "/images/integrity1.webp",
    },
    {
      title: "Customer-Centricity",
      description: "Our clients' success is our priority. We listen, understand, and tailor our solutions to meet specific business needs and objectives. We don't just provide services; we build partnerships that drive mutual success.",
      image: "/images/customerService1.jpg",
    },
    {
      title: "Reliability",
      description: "We understand that businesses depend on consistent technology performance. Whether it's accounting accuracy, network stability, or software functionality, we deliver solutions you can count on, backed by responsive support.",
      image: "/images/reliability.jpg",
    },
    {
      title: "Continuous Learning",
      description: "We invest in our team's development and stay current with technological advancements to provide the most effective and modern solutions. In a rapidly evolving tech landscape, we never stop learning and improving.",
      image: "/images/learning1.jpg",
    },
    {
      title: "Empowerment",
      description: "We believe in empowering our clients through knowledge transfer, training, and support. We don't just implement solutions; we ensure our clients understand and can maximize the value of their technology investments.",
      image: "/images/empowerment1.jpg",
    },
  ];

  return (
    <section className="about" id="about">
      <div className="about-overview">
        <div className="about-text">
          <h2 className="section-title section-title-left">Who We Are</h2>

          <br /> <br/>
          <p className="highlight-text">

            Black Leopard Technologies is a registered Ghanaian technology solutions provider headquartered in Koforidua.
          </p>
          <p>
            We deliver end-to-end technology services for businesses, institutions, and individuals. Our focus is digital enablement through
            reliable implementation and client-centered support.
          </p>
          <p>
            From accounting systems to network and software solutions, we help clients modernize operations and improve service delivery.
          </p>
        </div>
        <div className="about-image">
          <img src="/images/worldmap.jpg" alt="Global technology reach" />
        </div>
      </div>

      <div className="vision-mission-section">
        <div className="section-header">
          <h2 className="section-title">Our Vision & Mission</h2>
        </div>
        <div className="vision-mission-container">
          <article className="vision-card">
            <h3>Vision Statement</h3>
            <p>
              To be a leading technology partner across Africa, enabling organizations with dependable and future-ready digital solutions.
            </p>
          </article>
          <article className="mission-card">
            <h3>Mission Statement</h3>
            <p>
              We provide practical technology services that improve productivity, strengthen security, and drive sustainable growth.
            </p>
          </article>
        </div>
      </div>

      <div className="core-values-section">
        <div className="section-header">
          <h2 className="section-title">Our Core Values</h2>
        </div>
        <div className="values-grid">
          {coreValues.map((value) => (
            <article key={value.title} className="value-card">
              <div className="value-image-wrapper">
                <img src={value.image} alt={value.title} className="value-image" />
                <div className="image-overlay-dark"></div>
              </div>
              <div className="value-content">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;