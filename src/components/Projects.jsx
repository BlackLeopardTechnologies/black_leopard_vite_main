import React from "react";
import { projects } from "./projectsData";

const Projects = () => {
    return (
        <section className="projects" id="projects">

            <div className="section-header">
                <h2 className="section-title">Our Projects & Initiatives</h2>
                <p className="subtext">
                    Empowering institutions and communities across Ghana through
                    technology, connectivity, and professional development.
                </p>
            </div>

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

        </section>
    );
};

export default Projects;