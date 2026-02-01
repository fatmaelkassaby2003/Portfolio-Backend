import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Mail, MapPin, Download, Github, Linkedin, ExternalLink,
    Code, Server, Database, Smartphone, Layout, Globe,
    ChevronRight, Menu, X, Check, ArrowRight
} from 'lucide-react';
import { DataContext } from '../context/DataContext';

const Hero = () => {
    const { about, contact, cvUrl } = useContext(DataContext);
    // Note: Navbar is handled in App.jsx but styled by CSS targeting #home .navbar
    // To match user CSS hierarchy, we wrap the Hero content in #home and .header-content
    return (
        <section id="home">
            {/* The actual Navbar is in components/Navbar.jsx. 
                The CSS targets #home .navbar, so we might need to adjust Navbar.jsx to be inside a div or just ensure ID matches.
                For now, we implement the header-content part here. */}
            <div className="header-content">
                <motion.div
                    className="content-text"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p><motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >Hello,</motion.span> I am</p>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Fatma <span>Elkassaby</span>
                    </motion.h1>
                    <div className="title">Backend Developer & Laravel Expert</div>

                    <div className="social">
                        <motion.a whileHover={{ y: -5 }} href={contact.github || "https://github.com/fatmaelkassaby2003"} target="_blank"><i><Github size={20} /></i></motion.a>
                        <motion.a whileHover={{ y: -5 }} href={contact.linkedin || "https://www.linkedin.com/in/fatma-elkassaby-05509a2a2"} target="_blank"><i><Linkedin size={20} /></i></motion.a>
                        <motion.a whileHover={{ y: -5 }} href={`mailto:${contact.email || "fatmaelkassaby2003mm@gmail.com"}`}><i><Mail size={20} /></i></motion.a>
                    </div>

                    <div className="hero-buttons" style={{ display: 'flex', gap: '15px', marginTop: '30px', flexWrap: 'wrap' }}>
                        <motion.a
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            href="#portfolio"
                            className="btn-primary"
                        >
                            View Portfolio
                        </motion.a>
                        {cvUrl && (
                            <motion.a
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                href={cvUrl}
                                target="_blank"
                                className="btn-primary"
                                style={{
                                    background: 'transparent',
                                    color: 'var(--primary-color)',
                                    border: '1px solid var(--primary-color)',
                                }}
                            >
                                <Download size={18} /> Download CV
                            </motion.a>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{ textAlign: 'right', position: 'relative' }}
                >
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{ position: 'relative', zIndex: 1 }}
                    >
                        <img
                            src="/avatar.png"
                            alt="Fatma Elkassaby"
                            style={{
                                maxWidth: '440px',
                                height: 'auto',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))',
                                position: 'relative',
                                zIndex: 1,
                            }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const About = () => {
    const { about } = useContext(DataContext);
    return (
        <section id="about" className="page-section">
            <div className="container">
                <div className="section-header">
                    <h2>About My Expertise</h2>
                    <hr />
                    <p>Building the backbone of modern digital experiences through robust and scalable architecture.</p>
                </div>

                <div className="about-wrapper">
                    <motion.div
                        className="about-image-side"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <div className="image-container">
                            <img
                                src="/backend_hero.png"
                                alt="Backend Development"
                            />
                            <div className="experience-badge">
                                <h3>2+</h3>
                                <p>Years of Professional Experience</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="about-info-side"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <div className="about-bio">
                            <h3 className="accent-title">Architecting Scalable Solutions</h3>
                            <p className="bio-text">
                                {about || "I am Fatma Elkassaby, a Junior Backend Developer specialized in Laravel and enterprise-grade API architecture. My focus is on creating secure, high-performance systems that scale seamlessly under heavy load."}
                            </p>
                        </div>

                        <div className="about-stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon"><Layout size={24} /></div>
                                <div className="stat-info">
                                    <h4>Frameworks</h4>
                                    <p>Laravel Expert</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><Code size={24} /></div>
                                <div className="stat-info">
                                    <h4>Programming</h4>
                                    <p>Clean PHP & JS</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><Database size={24} /></div>
                                <div className="stat-info">
                                    <h4>Database</h4>
                                    <p>MySQL & Redis</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><MapPin size={24} /></div>
                                <div className="stat-info">
                                    <h4>Availability</h4>
                                    <p>Remote / Egypt</p>
                                </div>
                            </div>
                        </div>

                        <div className="about-cta">
                            <a href="#contact" className="btn-primary">Let's Discuss Your Project</a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Skills = () => {
    const { skills } = useContext(DataContext);
    const displaySkills = skills.slice(0, 5);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <section id="skills" className="page-section">
            <div className="container">
                <div className="section-header">
                    <h2>Technical Proficiency</h2>
                    <hr />
                    <p>My technical stack focused on building robust, scalable, and high-performance applications.</p>
                </div>

                <motion.div
                    className="skills-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {displaySkills.map((skill) => (
                        <motion.div
                            key={skill.id}
                            className="skill-card"
                            variants={itemVariants}
                        >
                            <div className="skill-icon-wrapper">
                                <img src={skill.icon || "/code.png"} alt={skill.name} />
                            </div>
                            <h4>{skill.name}</h4>
                            <div className="skill-level-bar">
                                <div className="level-fill" style={{ width: '85%' }}></div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="skills-action">
                    <Link to="/skills" className="btn-primary">Explore All Technologies</Link>
                </div>
            </div>
        </section>
    );
};

const Services = () => {
    const { services } = useContext(DataContext);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <section id="services" className="page-section">
            <div className="container">
                <div className="section-header">
                    <h2>My Services</h2>
                    <hr />
                    <p>Professional backend solutions tailored to your needs.</p>
                </div>

                <motion.div
                    className="services-container"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {services.length > 0 ? services.map((service) => (
                        <motion.div
                            key={service.id}
                            className="service-item"
                            variants={itemVariants}
                        >
                            <div className="service-icon">
                                {typeof service.icon === 'string' ? (
                                    <img src={service.icon} alt={service.title} />
                                ) : (
                                    service.icon || <Code />
                                )}
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </motion.div>
                    )) : (
                        ['API Development', 'Database Design', 'Security Architecture'].map((s, i) => (
                            <motion.div key={i} className="service-item" variants={itemVariants}>
                                <div className="service-icon"><Layout /></div>
                                <h3>{s}</h3>
                                <p>Professional backend solutions built with modern architecture and best practices.</p>
                            </motion.div>
                        ))
                    )}
                </motion.div>

                <div className="skills-action">
                    <Link to="/services" className="btn-primary">View All Services</Link>
                </div>
            </div>
        </section>
    );
};

const Projects = () => {
    const { projects } = useContext(DataContext);
    const displayProjects = projects.slice(0, 6);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <section id="portfolio" className="page-section">
            <div className="container">
                <div className="section-header">
                    <h2>My Portfolio</h2>
                    <hr />
                    <p>A showcase of my recent projects and implementations.</p>
                </div>

                <motion.div
                    className="portfolio-container"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {displayProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            className="portfolio-item"
                            variants={itemVariants}
                        >
                            <div className="project-img-wrapper">
                                <img
                                    src={project.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80'}
                                    alt={project.title}
                                    className="project-img"
                                />
                                <div className="project-overlay">
                                    {project.github_url && (
                                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="overlay-link" title="Source Code">
                                            <Github size={20} />
                                        </a>
                                    )}
                                    {project.live_url && (
                                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="overlay-link" title="Live Demo">
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="project-details">
                                <span className="project-category">{project.category || 'Development'}</span>
                                <h3>{project.title}</h3>
                                <p>{project.description || "A professional implementation focusing on scalability and performance."}</p>

                                {project.tech_stack && (
                                    <div className="tech-stack">
                                        {(Array.isArray(project.tech_stack) ? project.tech_stack : project.tech_stack.split(',')).map((tech, index) => (
                                            <span key={index} className="tech-tag">{tech.trim()}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="skills-action">
                    <Link to="/projects" className="btn-primary">View All Projects <ArrowRight size={18} /></Link>
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    return (
        <section id="contact">
            <div className="container">
                <div className="section-header">
                    <h2>Let's Connect</h2>
                    <hr />
                    <p>Have a project in mind? Let's build something amazing together.</p>
                </div>

                <div className="contact-container">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <h3>Contact Info</h3>
                            <p>Feel free to reach out for collaborations or just a friendly hello!</p>
                            <div className="contact-details">
                                <div className="detail-item">
                                    <div className="detail-icon">
                                        <Mail size={20} />
                                    </div>
                                    <span>fatmaelkassaby2003mm@gmail.com</span>
                                </div>
                                <div className="detail-item">
                                    <div className="detail-icon">
                                        <MapPin size={20} />
                                    </div>
                                    <span>Cairo, Egypt</span>
                                </div>
                            </div>
                        </div>

                        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" placeholder="John Doe" />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="john@example.com" />
                            </div>
                            <div className="form-group">
                                <label>Your Message</label>
                                <textarea rows="4" placeholder="How can I help you?"></textarea>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary"
                                style={{ width: '100%' }}
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Home = () => {
    return (
        <main>
            <Hero />
            <About />
            <Skills />
            <Services />
            <Projects />
            <Contact />
        </main>
    );
};

export default Home;
