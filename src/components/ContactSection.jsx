import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="page-section">
            <div className="container">
                <div className="section-header">
                    <h2>Let's Connect</h2>
                    <hr />
                    <p>Have a project in mind? Let's build something amazing together.</p>
                </div>

                <div className="contact-container">
                    <motion.div
                        className="contact-grid"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="contact-info"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                                padding: '2.5rem',
                                borderRadius: '24px',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(10px)',
                                height: '100%'
                            }}>
                                <h3 style={{
                                    fontSize: '1.8rem',
                                    marginBottom: '1rem',
                                    background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>Contact Info</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
                                    Feel free to reach out for collaborations or just a friendly hello!
                                </p>
                                <div className="contact-details">
                                    <motion.div
                                        whileHover={{ x: 8, scale: 1.02 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            padding: '1.2rem',
                                            background: 'rgba(14, 165, 233, 0.08)',
                                            borderRadius: '16px',
                                            marginBottom: '1rem',
                                            border: '1px solid rgba(14, 165, 233, 0.2)',
                                            transition: 'all 0.3s ease',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 8px 16px rgba(14, 165, 233, 0.3)'
                                        }}>
                                            <Mail size={22} color="#fff" />
                                        </div>
                                        <span style={{ color: 'var(--text-main)', fontWeight: '500' }}>
                                            fatmaelkassaby2003mm@gmail.com
                                        </span>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ x: 8, scale: 1.02 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            padding: '1.2rem',
                                            background: 'rgba(139, 92, 246, 0.08)',
                                            borderRadius: '16px',
                                            border: '1px solid rgba(139, 92, 246, 0.2)',
                                            transition: 'all 0.3s ease',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 8px 16px rgba(139, 92, 246, 0.3)'
                                        }}>
                                            <MapPin size={22} color="#fff" />
                                        </div>
                                        <span style={{ color: 'var(--text-main)', fontWeight: '500' }}>Cairo, Egypt</span>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.form
                            className="contact-form"
                            onSubmit={(e) => e.preventDefault()}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            style={{
                                background: 'var(--bg-card)',
                                padding: '2.5rem',
                                borderRadius: '24px',
                                border: '1px solid var(--border-subtle)',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                            }}
                        >
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.25rem',
                                        background: 'var(--bg-dark)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: '12px',
                                        color: 'var(--text-main)',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.25rem',
                                        background: 'var(--bg-dark)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: '12px',
                                        color: 'var(--text-main)',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '2rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>Your Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="How can I help you?"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.25rem',
                                        background: 'var(--bg-dark)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: '12px',
                                        color: 'var(--text-main)',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                        resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
                                ></textarea>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(14, 165, 233, 0.4)' }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '1.1rem',
                                    fontSize: '1.05rem',
                                    fontWeight: '600',
                                    background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    color: '#fff'
                                }}
                            >
                                Send Message
                            </motion.button>
                        </motion.form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
