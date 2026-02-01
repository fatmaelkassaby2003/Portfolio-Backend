import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Search, Filter, Sparkles, ArrowRight, Github, ExternalLink, Code2, Layers, Cpu, Globe } from 'lucide-react';

const ProjectsPage = () => {
    const { projects } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Default projects if API fails or empty
    const defaultProjects = [
        { id: 'p1', title: 'E-Commerce Backend', description: 'Advanced microservices architecture for a scalable retail platform.', image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80', category: 'Full Stack', tech_stack: ['Laravel', 'Redis', 'Docker'], live_url: '#', github_url: '#' },
        { id: 'p2', title: 'Security Portal', description: 'Enterprise-grade authentication and authorization system.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80', category: 'Security', tech_stack: ['PHP', 'JWT', 'MySQL'], live_url: '#', github_url: '#' },
    ];

    const allProjects = projects && projects.length > 0 ? projects : defaultProjects;

    // Get unique categories
    const rawCategories = [...new Set(allProjects.map(p => p.category).filter(Boolean))];
    const categories = ['All', ...rawCategories];

    // Filter projects
    const filteredProjects = allProjects.filter(project => {
        const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.tech_stack?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="container">
                {/* Hero Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        textAlign: 'center',
                        marginBottom: '60px',
                        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                        borderRadius: '24px',
                        padding: '60px 30px',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
                            padding: '12px 28px',
                            borderRadius: '50px',
                            marginBottom: '24px',
                            fontSize: '14px',
                            fontWeight: '600',
                            boxShadow: '0 8px 24px rgba(6, 182, 212, 0.3)'
                        }}
                    >
                        <Sparkles size={18} />
                        <span>Engineering Portfolio</span>
                    </motion.div>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: '700',
                        background: 'linear-gradient(135deg, #22d3ee 0%, #0ea5e9 25%, #8b5cf6 50%, #ffffff 80%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '20px',
                        fontFamily: "'Saira', sans-serif"
                    }}>
                        All Projects
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-muted)',
                        maxWidth: '700px',
                        margin: '0 auto',
                        lineHeight: '1.8'
                    }}>
                        Explore a showcase of enterprise-level backend solutions, full-stack applications, and specialized engineering contributions.
                    </p>

                    {/* Stats */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '40px',
                        marginTop: '40px',
                        flexWrap: 'wrap'
                    }}>
                        <div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#06b6d4' }}>{allProjects.length}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Projects Developed</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#8b5cf6' }}>{rawCategories.length}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Tech Domains</div>
                        </div>
                    </div>
                </motion.div>

                {/* Search & Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        display: 'flex',
                        gap: '20px',
                        marginBottom: '50px',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        background: 'var(--bg-card)',
                        padding: '24px',
                        borderRadius: '16px',
                        border: '1px solid var(--border-subtle)'
                    }}
                >
                    {/* Search */}
                    <div style={{ flex: '1', minWidth: '280px', position: 'relative' }}>
                        <Search size={20} style={{
                            position: 'absolute',
                            left: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)'
                        }} />
                        <input
                            type="text"
                            placeholder="Search by title, tech stack, or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '14px 14px 14px 48px',
                                background: 'var(--bg-dark)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: '12px',
                                color: 'var(--text-main)',
                                fontSize: '15px',
                                transition: 'all 0.3s'
                            }}
                        />
                    </div>

                    {/* Category Filter */}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Filter size={18} style={{ color: 'var(--text-muted)' }} />
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                style={{
                                    padding: '10px 20px',
                                    background: selectedCategory === category
                                        ? 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)'
                                        : 'var(--bg-dark)',
                                    color: selectedCategory === category ? '#fff' : 'var(--text-muted)',
                                    border: '1px solid ' + (selectedCategory === category ? 'transparent' : 'var(--border-subtle)'),
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    boxShadow: selectedCategory === category ? '0 4px 12px rgba(6, 182, 212, 0.3)' : 'none'
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory + searchTerm}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="portfolio-container"
                        style={{ marginTop: '0' }}
                    >
                        {filteredProjects.length > 0 ? filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                className="portfolio-item"
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                            >
                                <div className="project-img-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
                                    <img
                                        src={project.image || project.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80'}
                                        alt={project.title}
                                        style={{ width: '100%', height: '240px', objectFit: 'cover', transition: '0.5s' }}
                                    />
                                    <div className="project-overlay" style={{
                                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                        background: 'rgba(10, 25, 47, 0.85)', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', gap: '20px', opacity: 0, transition: '0.3s'
                                    }}>
                                        {project.github_url && (
                                            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="overlay-link" title="Source Code">
                                                <Github size={22} />
                                            </a>
                                        )}
                                        {project.live_url && (
                                            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="overlay-link" title="Live Demo">
                                                <ExternalLink size={22} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="project-details" style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <span className="project-category" style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.8rem', display: 'block' }}>
                                        {project.category || 'Development'}
                                    </span>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '12px', marginTop: '0' }}>{project.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px', opacity: 0.8 }}>
                                        {project.description || "A professional implementation focusing on scalability, clean code, and modern backend architecture."}
                                    </p>

                                    <div style={{ marginTop: 'auto' }}>
                                        {project.tech_stack && (
                                            <div className="tech-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                                                {(Array.isArray(project.tech_stack) ? project.tech_stack : project.tech_stack.split(',')).map((tech, idx) => (
                                                    <span key={idx} className="tech-tag" style={{
                                                        fontSize: '0.75rem', padding: '4px 12px', background: 'rgba(255, 255, 255, 0.05)',
                                                        borderRadius: '6px', color: 'var(--text-muted)', fontWeight: '600', border: '1px solid rgba(255, 255, 255, 0.1)'
                                                    }}>
                                                        {tech.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                                            <a href={project.live_url || project.github_url || '#'} className="project-link" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                                                Details <ChevronRight size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <style>{`
                                    .portfolio-item:hover .project-overlay {
                                        opacity: 1 !important;
                                    }
                                    .portfolio-item:hover .project-img-wrapper img {
                                        transform: scale(1.1);
                                    }
                                    .overlay-link {
                                        width: 45px;
                                        height: 45px;
                                        background: var(--primary-color);
                                        color: #fff;
                                        border-radius: 50%;
                                        display: flex;
                                        alignItems: center;
                                        justify-content: center;
                                        transition: 0.3s;
                                    }
                                    .overlay-link:hover {
                                        transform: translateY(-5px);
                                        background: #fff;
                                        color: var(--primary-color);
                                    }
                                `}</style>
                            </motion.div>
                        )) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    gridColumn: '1 / -1',
                                    textAlign: 'center',
                                    padding: '80px 20px',
                                    color: 'var(--text-muted)'
                                }}
                            >
                                <Search size={64} style={{ margin: '0 auto 20px', opacity: 0.3 }} />
                                <h3 style={{ color: 'var(--text-main)', marginBottom: '12px' }}>No projects found</h3>
                                <p>Try adjusting your search terms or filters</p>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        textAlign: 'center',
                        marginTop: '100px',
                        padding: '80px 40px',
                        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                        borderRadius: '30px',
                        border: '1px solid var(--border-subtle)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', background: 'var(--primary-color)', opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%' }} />
                    <h2 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '20px', color: 'var(--text-main)', fontFamily: "'Saira', sans-serif" }}>
                        Have a Vision?
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 40px', lineHeight: '1.8' }}>
                        I transform complex requirements into elegant, high-performance digital solutions. Let's discuss how I can bring value to your next big project.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/#contact" className="btn-primary" style={{ padding: '18px 45px', fontSize: '17px' }}>
                            Start a Project <ArrowRight size={20} />
                        </a>
                        <a href="/#services" style={{
                            padding: '18px 45px', fontSize: '17px', borderRadius: '12px', border: '1px solid var(--border-subtle)',
                            background: 'transparent', color: '#fff', fontWeight: '700', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '10px'
                        }} onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.target.style.background = 'transparent'}>
                            View Services
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectsPage;
