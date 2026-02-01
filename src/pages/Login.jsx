import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
            navigate('/dashboard');
        } else {
            setError('Invalid password. Try "admin123"');
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at center, var(--surface), var(--background))'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass"
                style={{
                    padding: '3rem',
                    borderRadius: '24px',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center'
                }}
            >
                <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'var(--surface)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: 'var(--primary)',
                    border: '1px solid var(--border)'
                }}>
                    <Lock size={30} />
                </div>
                <h2 style={{ marginBottom: '0.5rem' }}>Admin Access</h2>
                <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                    Please enter the password to manage your portfolio content.
                </p>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3rem',
                                background: 'var(--background)',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                color: '#fff',
                                fontSize: '1rem'
                            }}
                        />
                        <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                    </div>
                    {error && <p style={{ color: '#ff4444', fontSize: '0.8rem' }}>{error}</p>}
                    <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                        Log In
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
