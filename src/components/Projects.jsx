import React from "react";
import { projects } from "./projectsData";
import ScrollReveal from "./ScrollReveal";
import StaggerContainer from "./StaggerContainer";

const Projects = () => {
    return (
        <section className="projects" id="projects">
            <ScrollReveal direction="up" delay={0.2}>
                <div className="section-header">
                    <ScrollReveal direction="up" delay={0.1}>
                        <h2 className="section-title">Our Projects & Initiatives</h2>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.2}>
                        <p className="subtext">
                            Empowering institutions and communities across Ghana through
                            technology, connectivity, and professional development.
                        </p>
                    </ScrollReveal>
                </div>
            </ScrollReveal>

            <StaggerContainer staggerDelay={0.22}>
                <div className="project-grid">
                    {projects.map((project) => (
                        <div key={project.id} className="project-card">
                            <div className="image">
                                <img src={project.image} alt={project.title} />
                            </div>

                            <div className="content">
                                <h3>{project.title}</h3>
                                <p>{project.summary}</p>

                            {/* button commented out temporarily */}
                                {/* {project.applyLink && (
                                    <a href={project.applyLink} className="btn apply-btn">
                                        Apply Now
                                    </a>
                                )} */}
                            </div>
                        </div>
                    ))}
                </div>
            </StaggerContainer>
        </section>
    );
};

export default Projects;