import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DataContext } from '../context/DataContext';
import { Search, Filter, ArrowRight, Code, Sparkles } from 'lucide-react';

const SkillsPage = () => {
    const { skills } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Get unique categories
    const categories = ['All', ...new Set(skills.map(skill => skill.category).filter(Boolean))];

    // Filter skills
    const filteredSkills = skills.filter(skill => {
        const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
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
                        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
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
                            background: 'linear-gradient(135deg, #0284c7 0%, #8b5cf6 100%)',
                            padding: '12px 28px',
                            borderRadius: '50px',
                            marginBottom: '24px',
                            fontSize: '14px',
                            fontWeight: '600',
                            boxShadow: '0 8px 24px rgba(14, 165, 233, 0.3)'
                        }}
                    >
                        <Sparkles size={18} />
                        <span>Full Technology Stack</span>
                    </motion.div>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: '700',
                        background: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 25%, #8b5cf6 50%, #ffffff 80%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '20px',
                        fontFamily: "'Saira', sans-serif"
                    }}>
                        My Technical Arsenal
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-muted)',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: '1.8'
                    }}>
                        Explore the complete range of technologies and frameworks I master to build exceptional digital experiences.
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
                            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>{skills.length}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Technologies</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#8b5cf6' }}>{categories.length - 1}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Categories</div>
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
                            placeholder="Search technologies..."
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
                                        ? 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)'
                                        : 'var(--bg-dark)',
                                    color: selectedCategory === category ? '#fff' : 'var(--text-muted)',
                                    border: '1px solid ' + (selectedCategory === category ? 'transparent' : 'var(--border-subtle)'),
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    boxShadow: selectedCategory === category ? '0 4px 12px rgba(14, 165, 233, 0.3)' : 'none'
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Skills by Category Sections */}
                <AnimatePresence mode="wait">
                    <div key={selectedCategory + searchTerm}>
                        {selectedCategory === 'All' ? (
                            // Display all categories in separate sections
                            categories.slice(1).map(category => {
                                const categorySkills = skills.filter(skill =>
                                    skill.category === category &&
                                    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
                                );

                                if (categorySkills.length === 0) return null;

                                return (
                                    <motion.div
                                        key={category}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ marginBottom: '60px' }}
                                    >
                                        {/* Category Header */}
                                        <h2 style={{
                                            fontSize: '1.8rem',
                                            fontWeight: '700',
                                            color: 'var(--text-main)',
                                            marginBottom: '30px',
                                            paddingBottom: '15px',
                                            borderBottom: '2px solid var(--border-subtle)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px'
                                        }}>
                                            <span style={{
                                                width: '4px',
                                                height: '30px',
                                                background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                                                borderRadius: '4px'
                                            }} />
                                            {category}
                                            <span style={{
                                                fontSize: '0.9rem',
                                                color: 'var(--text-muted)',
                                                fontWeight: '400'
                                            }}>
                                                ({categorySkills.length})
                                            </span>
                                        </h2>

                                        {/* Skills Grid - 4 per row */}
                                        <motion.div
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(4, 1fr)',
                                                gap: '2rem'
                                            }}
                                        >
                                            {categorySkills.map((skill) => (
                                                <motion.div
                                                    key={skill.id}
                                                    variants={itemVariants}
                                                    className="skill-card"
                                                    whileHover={{
                                                        scale: 1.05,
                                                        boxShadow: '0 20px 40px rgba(14, 165, 233, 0.3)'
                                                    }}
                                                    style={{ position: 'relative', overflow: 'hidden' }}
                                                >
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '-50%',
                                                        right: '-50%',
                                                        width: '200%',
                                                        height: '200%',
                                                        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)',
                                                        opacity: 0,
                                                        transition: 'opacity 0.3s'
                                                    }} className="skill-glow" />

                                                    <div className="skill-icon-wrapper">
                                                        <img src={skill.icon || '/code.png'} alt={skill.name} />
                                                    </div>
                                                    <h4>{skill.name}</h4>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            // Display single category
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{ marginBottom: '60px' }}
                            >
                                <h2 style={{
                                    fontSize: '1.8rem',
                                    fontWeight: '700',
                                    color: 'var(--text-main)',
                                    marginBottom: '30px',
                                    paddingBottom: '15px',
                                    borderBottom: '2px solid var(--border-subtle)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <span style={{
                                        width: '4px',
                                        height: '30px',
                                        background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                                        borderRadius: '4px'
                                    }} />
                                    {selectedCategory}
                                    <span style={{
                                        fontSize: '0.9rem',
                                        color: 'var(--text-muted)',
                                        fontWeight: '400'
                                    }}>
                                        ({filteredSkills.length})
                                    </span>
                                </h2>

                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(4, 1fr)',
                                        gap: '2rem'
                                    }}
                                >
                                    {filteredSkills.length > 0 ? (
                                        filteredSkills.map((skill) => (
                                            <motion.div
                                                key={skill.id}
                                                variants={itemVariants}
                                                className="skill-card"
                                                whileHover={{
                                                    scale: 1.05,
                                                    boxShadow: '0 20px 40px rgba(14, 165, 233, 0.3)'
                                                }}
                                                style={{ position: 'relative', overflow: 'hidden' }}
                                            >
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '-50%',
                                                    right: '-50%',
                                                    width: '200%',
                                                    height: '200%',
                                                    background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)',
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s'
                                                }} className="skill-glow" />

                                                <div className="skill-icon-wrapper">
                                                    <img src={skill.icon || '/code.png'} alt={skill.name} />
                                                </div>
                                                <h4>{skill.name}</h4>
                                            </motion.div>
                                        ))
                                    ) : (
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
                                            <Code size={64} style={{ margin: '0 auto 20px', opacity: 0.3 }} />
                                            <h3 style={{ color: 'var(--text-main)', marginBottom: '12px' }}>No skills found</h3>
                                            <p>Try adjusting your search or filter criteria</p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </motion.div>
                        )}
                    </div>
                </AnimatePresence>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        textAlign: 'center',
                        padding: '60px 30px',
                        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                        borderRadius: '20px',
                        border: '1px solid var(--border-subtle)'
                    }}
                >
                    <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--text-main)' }}>
                        Ready to Build Something Amazing?
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '1.1rem' }}>
                        Let's collaborate and bring your project to life with cutting-edge technology.
                    </p>
                    <a href="/#contact" className="btn-primary" style={{ display: 'inline-flex', gap: '8px' }}>
                        Get In Touch
                        <ArrowRight size={20} />
                    </a>
                </motion.div>
            </div>

            <style>{`
                .skill-card:hover .skill-glow {
                    opacity: 1;
                }
                
                @media (max-width: 1200px) {
                    .skills-grid,
                    div[style*="grid-template-columns: repeat(4, 1fr)"] {
                        grid-template-columns: repeat(3, 1fr) !important;
                    }
                }
                
                @media (max-width: 992px) {
                    .skills-grid,
                    div[style*="grid-template-columns: repeat(4, 1fr)"] {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                
                @media (max-width: 576px) {
                    .skills-grid,
                    div[style*="grid-template-columns: repeat(4, 1fr)"] {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default SkillsPage;
