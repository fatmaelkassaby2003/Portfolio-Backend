import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { Plus, Trash2, Edit3, LogOut, LayoutGrid, List } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { projects, deleteProject, addProject, skills, deleteSkill, addSkill } = useContext(DataContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('projects');

    // Form States
    const [newProject, setNewProject] = useState({ title: '', description: '', tech: '', link: '', image: '' });
    const [newSkill, setNewSkill] = useState({ name: '', category: 'Language' });

    useEffect(() => {
        if (localStorage.getItem('isAdmin') !== 'true') {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/login');
    };

    const onAddProject = (e) => {
        e.preventDefault();
        addProject({
            ...newProject,
            tech: newProject.tech.split(',').map(t => t.trim()),
            image: newProject.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80'
        });
        setNewProject({ title: '', description: '', tech: '', link: '', image: '' });
    };

    const onAddSkill = (e) => {
        e.preventDefault();
        addSkill(newSkill);
        setNewSkill({ name: '', category: 'Language' });
    };

    return (
        <div style={{ paddingTop: '8rem', minHeight: '100vh', paddingBottom: '4rem' }} className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem' }}>Admin <span className="gradient-text">Dashboard</span></h1>
                    <p style={{ color: 'var(--text-dim)' }}>Manage your portfolio content</p>
                </div>
                <button className="btn-outline" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <LogOut size={18} /> Logout
                </button>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                <button
                    onClick={() => setActiveTab('projects')}
                    style={{
                        background: 'none', border: 'none', color: activeTab === 'projects' ? 'var(--primary)' : 'var(--text-dim)',
                        cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                >
                    <LayoutGrid size={18} /> Projects
                </button>
                <button
                    onClick={() => setActiveTab('skills')}
                    style={{
                        background: 'none', border: 'none', color: activeTab === 'skills' ? 'var(--primary)' : 'var(--text-dim)',
                        cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                >
                    <List size={18} /> Skills
                </button>
            </div>

            {activeTab === 'projects' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
                    {/* Add Project Form */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px', height: 'fit-content' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Plus size={20} /> Add Project
                        </h3>
                        <form onSubmit={onAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                className="btn-outline" style={{ textAlign: 'left', cursor: 'text' }}
                                placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} required
                            />
                            <textarea
                                className="btn-outline" style={{ textAlign: 'left', cursor: 'text', minHeight: '100px', resize: 'vertical' }}
                                placeholder="Description" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} required
                            />
                            <input
                                className="btn-outline" style={{ textAlign: 'left', cursor: 'text' }}
                                placeholder="Tech Stack (comma separated)" value={newProject.tech} onChange={e => setNewProject({ ...newProject, tech: e.target.value })} required
                            />
                            <input
                                className="btn-outline" style={{ textAlign: 'left', cursor: 'text' }}
                                placeholder="GitHub Link" value={newProject.link} onChange={e => setNewProject({ ...newProject, link: e.target.value })} required
                            />
                            <input
                                className="btn-outline" style={{ textAlign: 'left', cursor: 'text' }}
                                placeholder="Image URL (optional)" value={newProject.image} onChange={e => setNewProject({ ...newProject, image: e.target.value })}
                            />
                            <button type="submit" className="btn-primary">Create Project</button>
                        </form>
                    </div>

                    {/* Projects List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {projects.map(p => (
                            <div key={p.id} className="glass" style={{ padding: '1.5rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.2rem' }}>{p.title}</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{p.tech.join(', ')}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => deleteProject(p.id)} style={{ padding: '0.5rem', background: 'rgba(255, 68, 68, 0.1)', border: '1px solid #ff4444', borderRadius: '8px', color: '#ff4444', cursor: 'pointer' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
                    {/* Add Skill Form */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px', height: 'fit-content' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Plus size={20} /> Add Skill
                        </h3>
                        <form onSubmit={onAddSkill} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                className="btn-outline" style={{ textAlign: 'left', cursor: 'text' }}
                                placeholder="Skill Name" value={newSkill.name} onChange={e => setNewSkill({ ...newSkill, name: e.target.value })} required
                            />
                            <select
                                className="btn-outline"
                                style={{ textAlign: 'left', appearance: 'none', background: 'var(--surface)' }}
                                value={newSkill.category} onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
                            >
                                <option value="Language">Language</option>
                                <option value="Framework">Framework</option>
                                <option value="Database">Database</option>
                                <option value="Tools">Tools</option>
                            </select>
                            <button type="submit" className="btn-primary">Add Skill</button>
                        </form>
                    </div>

                    {/* Skills Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                        {skills.map(s => (
                            <div key={s.id} className="glass" style={{ padding: '1rem', borderRadius: '12px', textAlign: 'center', position: 'relative' }}>
                                <div style={{ fontWeight: 'bold' }}>{s.name}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{s.category}</div>
                                <button
                                    onClick={() => deleteSkill(s.id)}
                                    style={{
                                        position: 'absolute', top: '-5px', right: '-5px',
                                        background: '#ff4444', border: 'none', borderRadius: '50%',
                                        width: '20px', height: '20px', color: '#fff', cursor: 'pointer',
                                        fontSize: '10px'
                                    }}
                                >✕</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
