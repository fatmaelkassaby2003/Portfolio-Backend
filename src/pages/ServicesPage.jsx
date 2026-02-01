import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Server, Database, ShieldCheck, Cpu, Search, Filter, ArrowRight, Sparkles, Globe, Layout, Smartphone } from 'lucide-react';

const ServicesPage = () => {
    const { services } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const defaultServices = [
        { id: 'd1', title: 'API development', description: 'Building high-performance REST & GraphQL APIs with Laravel.', icon: <Server size={40} />, category: 'Backend' },
        { id: 'd2', title: 'Database Design', description: 'Optimizing complex MySQL & PostgreSQL database architectures.', icon: <Database size={40} />, category: 'Database' },
        { id: 'd3', title: 'Security Audits', description: 'Ensuring your systems are protected with the latest security standards.', icon: <ShieldCheck size={40} />, category: 'Security' },
        { id: 'd4', title: 'System Architecture', description: 'Designing scalable microservices and monolithic structures.', icon: <Cpu size={40} />, category: 'Architecture' }
    ];

    const allServices = services && services.length > 0 ? services : defaultServices;

    // Get unique categories
    const rawCategories = [...new Set(allServices.map(s => s.category).filter(Boolean))];
    const hasUncategorized = allServices.some(s => !s.category);
    const categories = ['All', ...rawCategories];
    if (hasUncategorized && rawCategories.length > 0) {
        categories.push('General');
    }

    // Filter services
    const filteredServices = allServices.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' ||
            (selectedCategory === 'General' ? !service.category : service.category === selectedCategory);
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
                        <span>Professional Backend Expertise</span>
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
                        Services & Solutions
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-muted)',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: '1.8'
                    }}>
                        Empowering your business with scalable architecture, secure APIs, and high-performance backend systems.
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
                            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>{allServices.length}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Specialties</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#8b5cf6' }}>{categories.length - 1}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Areas of Focus</div>
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
                            placeholder="Find a professional solution..."
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

                {/* Services Grid or Categorized View */}
                <AnimatePresence mode="wait">
                    <div key={selectedCategory + searchTerm}>
                        {selectedCategory === 'All' && rawCategories.length > 0 ? (
                            // Grouped View (Only if categories exist)
                            categories.slice(1).map(category => {
                                const categoryServices = allServices.filter(s =>
                                    (s.category === category || (!s.category && category === 'General')) &&
                                    (s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        s.description?.toLowerCase().includes(searchTerm.toLowerCase()))
                                );

                                if (categoryServices.length === 0) return null;

                                return (
                                    <motion.div
                                        key={category}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ marginBottom: '60px' }}
                                    >
                                        <h2 style={{
                                            fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-main)',
                                            marginBottom: '30px', paddingBottom: '15px', borderBottom: '2px solid var(--border-subtle)',
                                            display: 'flex', alignItems: 'center', gap: '12px', fontFamily: "'Saira', sans-serif"
                                        }}>
                                            <span style={{ width: '4px', height: '30px', background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)', borderRadius: '4px' }} />
                                            {category}
                                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '400' }}>({categoryServices.length})</span>
                                        </h2>

                                        <motion.div
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="services-grid-unified"
                                            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}
                                        >
                                            {categoryServices.map((service) => (
                                                <motion.div key={service.id || Math.random()} variants={itemVariants} className="service-item" whileHover={{ scale: 1.02 }}>
                                                    <div className="service-glow" />
                                                    <div className="service-icon">
                                                        {typeof service.icon === 'string' ? <img src={service.icon} alt={service.title} /> : (service.icon || <Code />)}
                                                    </div>
                                                    <h3>{service.title || 'Service'}</h3>
                                                    <p>{service.description || 'Professional solution provider.'}</p>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            // Flat Grid View (For 'General', single categories, or when no raw categories exist)
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}
                            >
                                {filteredServices.length > 0 ? (
                                    filteredServices.map((service) => (
                                        <motion.div key={service.id || Math.random()} variants={itemVariants} className="service-item" whileHover={{ scale: 1.02 }}>
                                            <div className="service-glow" />
                                            <div className="service-icon">
                                                {typeof service.icon === 'string' ? <img src={service.icon} alt={service.title} /> : (service.icon || <Code />)}
                                            </div>
                                            <h3>{service.title || 'Service'}</h3>
                                            <p>{service.description || 'Professional solution provider.'}</p>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
                                        <Search size={64} style={{ margin: '0 auto 20px', opacity: 0.3 }} />
                                        <h3 style={{ color: 'var(--text-main)', marginBottom: '12px' }}>No services found</h3>
                                        <p>Try adjusting your search or filter keywords</p>
                                    </motion.div>
                                )}
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
                        marginTop: '80px',
                        padding: '60px 30px',
                        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                        borderRadius: '24px',
                        border: '1px solid var(--border-subtle)'
                    }}
                >
                    <h2 style={{ fontSize: '2.4rem', fontWeight: '700', marginBottom: '16px', color: 'var(--text-main)', fontFamily: "'Saira', sans-serif" }}>
                        Interested in Collaboration?
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto 32px' }}>
                        I'm always open to discussing new projects, creative ideas or original strategies to boost your digital presence.
                    </p>
                    <a href="/#contact" className="btn-primary" style={{ padding: '16px 40px', fontSize: '16px' }}>
                        Contact Me Directly
                        <ArrowRight size={20} />
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default ServicesPage;
