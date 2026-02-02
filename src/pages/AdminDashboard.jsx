import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';
import { DataContext } from '../context/DataContext';
import {
    Plus, Trash2, Edit, Save, X, LogOut,
    Briefcase, Code, Settings, User, Layout,
    CheckCircle2, AlertCircle, Loader2,
    ChevronRight, LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
    const { refreshData } = useContext(DataContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [actionLoading, setActionLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [uploadingCv, setUploadingCv] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [counts, setCounts] = useState({ projects: 0, skills: 0, services: 0 });
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    useEffect(() => {
        if (user && activeTab === 'overview') {
            fetchCounts();
        }
    }, [user, activeTab]);

    const fetchCounts = async () => {
        try {
            const [p, s, v] = await Promise.all([
                supabase.from('projects').select('*', { count: 'exact', head: true }),
                supabase.from('skills').select('*', { count: 'exact', head: true }),
                supabase.from('services').select('*', { count: 'exact', head: true }),
            ]);
            setCounts({
                projects: p.count || 0,
                skills: s.count || 0,
                services: v.count || 0,
            });
        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    };

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
            setLoading(false);
        };
        checkUser();
    }, []);

    useEffect(() => {
        if (user && activeTab !== 'overview' && activeTab !== 'profiles') {
            fetchData();
        } else if (user && activeTab === 'profiles') {
            fetchProfile();
        }
    }, [user, activeTab]);

    const fetchData = async () => {
        if (!activeTab || activeTab === 'overview' || activeTab === 'profiles') return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from(activeTab)
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            setData(data || []);
        } catch (error) {
            showStatus('error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .limit(1)
                .single();
            if (error && error.code !== 'PGRST116') throw error;
            setData(data ? [data] : []);
            if (data) setFormData(data);
        } catch (error) {
            showStatus('error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const showStatus = (type, message) => {
        setStatus({ type, message });
        setTimeout(() => setStatus(null), 4000);
    };

    const startEditing = (item = null) => {
        if (item) {
            setFormData(item);
            setEditingItem(item.id);
        } else {
            setFormData({});
            setEditingItem('new');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            if (activeTab === 'profiles') {
                const { error } = await supabase.from('profiles').upsert({
                    ...formData,
                    id: user.id
                });
                if (error) throw error;
                showStatus('success', 'Profile updated successfully! ✨');
                fetchProfile();
            } else {
                // Clean data based on table schema
                let cleanData = { ...formData };
                if (activeTab === 'skills' || activeTab === 'services') {
                    delete cleanData.image_url; // skills/services tables only have 'icon'
                } else if (activeTab === 'projects') {
                    delete cleanData.icon; // projects table only has 'image_url'
                }

                if (editingItem === 'new') {
                    const { error } = await supabase.from(activeTab).insert([cleanData]);
                    if (error) throw error;
                    showStatus('success', 'Item created successfully! 🎉');
                } else {
                    const { error } = await supabase.from(activeTab).update(cleanData).eq('id', editingItem);
                    if (error) throw error;
                    showStatus('success', 'Item updated successfully! ✅');
                }
                fetchData();
            }
            setEditingItem(null);
            refreshData();
        } catch (error) {
            showStatus('error', error.message);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        setActionLoading(true);
        try {
            const { error } = await supabase.from(activeTab).delete().eq('id', id);
            if (error) throw error;
            showStatus('success', 'Item deleted successfully! 🗑️');
            fetchData();
            refreshData();
        } catch (error) {
            showStatus('error', error.message);
        } finally {
            setActionLoading(false);
        }
    };

    const handleCvUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadingCv(true);
        try {
            const fileName = `cv-${user.id}-${Date.now()}.pdf`;
            const { error: uploadError } = await supabase.storage.from('cv').upload(fileName, file);
            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage.from('cv').getPublicUrl(fileName);
            const newFormData = { ...formData, cv_url: publicUrl };
            setFormData(newFormData);

            if (activeTab === 'profiles') {
                const { error: saveError } = await supabase.from('profiles').upsert({
                    ...newFormData,
                    id: user.id
                });
                if (saveError) throw saveError;
                showStatus('success', 'CV uploaded and saved! ✨');
                refreshData();
            } else {
                showStatus('success', 'CV uploaded! Click Save to finalize.');
            }
        } catch (error) {
            showStatus('error', 'Upload failed: ' + error.message);
        } finally {
            setUploadingCv(false);
        }
    };

    const handleImageUpload = async (e, bucket = 'skills') => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadingImage(true);
        try {
            const fileName = `${activeTab}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
            const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file);
            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);

            // Use correct column name based on table and remove the other
            if (activeTab === 'skills' || activeTab === 'services') {
                const { image_url, ...rest } = formData; // Remove image_url if exists
                setFormData({ ...rest, icon: publicUrl });
            } else {
                const { icon, ...rest } = formData; // Remove icon if exists
                setFormData({ ...rest, image_url: publicUrl });
            }

            showStatus('success', 'Image uploaded! Click Save to finalize. 🖼️');
        } catch (error) {
            showStatus('error', 'Upload failed: ' + error.message);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.reload();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
        if (error) {
            showStatus('error', error.message);
            setActionLoading(false);
        }
    };

    if (loading && !user) {
        return (
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
                <Loader2 className="animate-spin" size={50} color="#fff" />
            </div>
        );
    }

    if (!user) {
        return (
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                        background: '#fff', padding: '60px 50px', borderRadius: '24px',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.3)', maxWidth: '450px', width: '100%'
                    }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{
                            width: '80px', height: '80px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 20px', boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
                        }}>
                            <Settings size={40} color="#fff" />
                        </div>
                        <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#1e293b', marginBottom: '8px' }}>Admin Login</h1>
                        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Access your portfolio dashboard</p>
                    </div>
                    {status && (
                        <div style={{
                            padding: '15px', borderRadius: '12px', marginBottom: '25px',
                            background: status.type === 'error' ? '#fee2e2' : '#d1fae5',
                            color: status.type === 'error' ? '#991b1b' : '#065f46',
                            border: `1px solid ${status.type === 'error' ? '#fecaca' : '#a7f3d0'}`,
                            fontSize: '0.9rem', fontWeight: '600'
                        }}>
                            {status.message}
                        </div>
                    )}
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '700', color: '#475569' }}>Email Address</label>
                            <input
                                type="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                style={{
                                    width: '100%', padding: '14px 16px', borderRadius: '12px',
                                    border: '2px solid #e2e8f0', background: '#f8fafc', outline: 'none',
                                    transition: '0.3s', fontSize: '1rem'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '700', color: '#475569' }}>Password</label>
                            <input
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                style={{
                                    width: '100%', padding: '14px 16px', borderRadius: '12px',
                                    border: '2px solid #e2e8f0', background: '#f8fafc', outline: 'none',
                                    transition: '0.3s', fontSize: '1rem'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={actionLoading}
                            style={{
                                width: '100%', padding: '16px', borderRadius: '12px', border: 'none',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: '#fff', fontSize: '1rem', fontWeight: '800', cursor: 'pointer',
                                boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)', transition: '0.3s'
                            }}
                        >
                            {actionLoading ? <Loader2 className="animate-spin" style={{ margin: '0 auto' }} /> : 'Sign In to Dashboard'}
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    const stats = [
        { label: 'Total Projects', count: counts.projects, icon: Briefcase, color: '#3b82f6' },
        { label: 'Skills Added', count: counts.skills, icon: Code, color: '#10b981' },
        { label: 'Active Services', count: counts.services, icon: Settings, color: '#764ba2' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
            {/* Blue Professional Sidebar */}
            <div style={{
                width: '280px', background: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)',
                position: 'fixed', height: '100vh', zIndex: 1000,
                display: 'flex', flexDirection: 'column', boxShadow: '4px 0 20px rgba(0,0,0,0.1)'
            }}>
                <div style={{ padding: '30px 25px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '50px', height: '50px', background: 'rgba(255,255,255,0.15)',
                            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <LayoutDashboard size={26} color="#fff" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.3rem', fontWeight: '900', margin: 0, color: '#fff', letterSpacing: '0.5px' }}>ADMIN</h2>
                            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', fontWeight: '600', textTransform: 'uppercase' }}>Control Panel</span>
                        </div>
                    </div>
                </div>

                <div style={{ flex: 1, padding: '25px 15px', display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' }}>
                    {[
                        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
                        { id: 'projects', label: 'Projects', icon: Briefcase },
                        { id: 'skills', label: 'Skills', icon: Code },
                        { id: 'services', label: 'Services', icon: Settings },
                        { id: 'profiles', label: 'Profile', icon: User },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setEditingItem(null); }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '14px',
                                padding: '13px 18px', borderRadius: '10px', border: 'none',
                                background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                                color: '#fff', cursor: 'pointer', textAlign: 'left',
                                fontWeight: activeTab === tab.id ? '700' : '600',
                                fontSize: '0.95rem', transition: '0.2s',
                                backdropFilter: activeTab === tab.id ? 'blur(10px)' : 'none'
                            }}
                            onMouseEnter={(e) => { if (activeTab !== tab.id) e.target.style.background = 'rgba(255,255,255,0.1)'; }}
                            onMouseLeave={(e) => { if (activeTab !== tab.id) e.target.style.background = 'transparent'; }}
                        >
                            <tab.icon size={19} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div style={{ padding: '25px 15px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                            background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5',
                            border: '1px solid rgba(239, 68, 68, 0.3)', padding: '13px 16px', borderRadius: '10px',
                            cursor: 'pointer', fontWeight: '700', transition: '0.3s', fontSize: '0.9rem',
                            justifyContent: 'center'
                        }}
                        onMouseEnter={(e) => { e.target.style.background = 'rgba(239, 68, 68, 0.25)'; }}
                        onMouseLeave={(e) => { e.target.style.background = 'rgba(239, 68, 68, 0.15)'; }}
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, marginLeft: '280px', minHeight: '100vh' }}>
                {/* Top Header */}
                <header style={{
                    background: '#fff', padding: '20px 40px', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center',
                    borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 99
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '0.9rem' }}>
                        <LayoutDashboard size={16} />
                        <span>Admin</span>
                        <ChevronRight size={13} />
                        <span style={{ color: '#1e3a8a', fontWeight: '700', textTransform: 'capitalize' }}>{activeTab}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ textAlign: 'right', marginRight: '5px' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1e293b' }}>Admin User</div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{user?.email}</div>
                        </div>
                        <div style={{
                            width: '42px', height: '42px', borderRadius: '10px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontWeight: '900', fontSize: '1rem'
                        }}>
                            A
                        </div>
                    </div>
                </header>

                <main style={{ padding: '40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '35px' }}>
                        <div>
                            <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#1e293b', margin: '0 0 8px 0', textTransform: 'capitalize' }}>
                                {activeTab === 'overview' ? '📊 Dashboard Overview' : `${activeTab} Management`}
                            </h1>
                            <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>Manage your portfolio data efficiently.</p>
                        </div>
                        {activeTab !== 'profiles' && activeTab !== 'overview' && !editingItem && (
                            <button
                                onClick={() => startEditing()}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px',
                                    borderRadius: '10px', border: 'none',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: '#fff', cursor: 'pointer', fontWeight: '700',
                                    boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)', fontSize: '0.9rem'
                                }}
                            >
                                <Plus size={18} /> Add New
                            </button>
                        )}
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' ? (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}
                            >
                                {stats.map((stat, i) => (
                                    <div key={i} style={{
                                        background: '#fff', padding: '28px', borderRadius: '16px',
                                        border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                        display: 'flex', alignItems: 'center', gap: '18px'
                                    }}>
                                        <div style={{
                                            width: '58px', height: '58px', borderRadius: '14px',
                                            background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <stat.icon size={26} color={stat.color} strokeWidth={2} />
                                        </div>
                                        <div>
                                            <div style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>{stat.label}</div>
                                            <div style={{ fontSize: '1.9rem', fontWeight: '900', color: '#1e293b' }}>{stat.count}</div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        ) : editingItem ? (
                            <motion.form
                                key="form"
                                onSubmit={handleSave}
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
                                    <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#1e293b', margin: 0 }}>
                                        {editingItem === 'new' ? '➕ Add  New Item' : '✏️ Edit Information'}
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={() => setEditingItem(null)}
                                        style={{
                                            border: 'none', background: '#f1f5f9', width: '38px', height: '38px',
                                            borderRadius: '8px', cursor: 'pointer', color: '#64748b',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                                    {activeTab === 'projects' && (
                                        <>
                                            <div className="form-group"><label>Project Title</label><input value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} required /></div>
                                            <div className="form-group"><label>Category</label><input value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })} /></div>
                                            <div className="form-group"><label>Live URL</label><input value={formData.live_url || ''} onChange={e => setFormData({ ...formData, live_url: e.target.value })} /></div>
                                            <div className="form-group"><label>Github URL</label><input value={formData.github_url || ''} onChange={e => setFormData({ ...formData, github_url: e.target.value })} /></div>
                                            <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                                <label>Project Cover Image</label>
                                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '2px dashed #e2e8f0' }}>
                                                    {formData.image_url && <img src={formData.image_url} alt="Preview" style={{ width: '80px', height: '45px', objectFit: 'cover', borderRadius: '8px' }} />}
                                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'portfolio')} style={{ flex: 1 }} disabled={uploadingImage} />
                                                    {uploadingImage && <Loader2 className="animate-spin" size={20} color="#667eea" />}
                                                </div>
                                            </div>
                                            <div className="form-group" style={{ gridColumn: 'span 2' }}><label>Description</label><textarea value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} rows="4" /></div>
                                        </>
                                    )}
                                    {activeTab === 'skills' && (
                                        <>
                                            <div className="form-group"><label>Skill Name</label><input value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} required /></div>
                                            <div className="form-group"><label>Category</label><input value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })} /></div>
                                            <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                                <label>Skill Icon / Image</label>
                                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '2px dashed #e2e8f0' }}>
                                                    {formData.icon && <img src={formData.icon} alt="Preview" style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '8px' }} />}
                                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'skills')} style={{ flex: 1 }} disabled={uploadingImage} />
                                                    {uploadingImage && <Loader2 className="animate-spin" size={20} color="#667eea" />}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {activeTab === 'services' && (
                                        <>
                                            <div className="form-group"><label>Service Title</label><input value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} required /></div>
                                            <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                                <label>Service Icon / Image</label>
                                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '2px dashed #e2e8f0' }}>
                                                    {formData.icon && <img src={formData.icon} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '8px' }} />}
                                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'services')} style={{ flex: 1 }} disabled={uploadingImage} />
                                                    {uploadingImage && <Loader2 className="animate-spin" size={20} color="#667eea" />}
                                                </div>
                                            </div>
                                            <div className="form-group" style={{ gridColumn: 'span 2' }}><label>Description</label><textarea value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} rows="4" /></div>
                                        </>
                                    )}
                                    {activeTab === 'profiles' && (
                                        <>
                                            <div className="form-group"><label>Full Name</label><input value={formData.full_name || ''} onChange={e => setFormData({ ...formData, full_name: e.target.value })} /></div>
                                            <div className="form-group"><label>Professional Title</label><input value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} /></div>
                                            <div className="form-group" style={{ gridColumn: 'span 2' }}><label>About Content</label><textarea value={formData.about || ''} onChange={e => setFormData({ ...formData, about: e.target.value })} rows="5" /></div>
                                            <div className="form-group"><label>Email</label><input value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
                                            <div className="form-group"><label>Location</label><input value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} /></div>
                                            <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                                <label>Curriculum Vitae (PDF)</label>
                                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '2px dashed #e2e8f0' }}>
                                                    <input type="file" accept=".pdf" onChange={handleCvUpload} style={{ flex: 1 }} disabled={uploadingCv} />
                                                    {uploadingCv && <Loader2 className="animate-spin" size={20} color="#667eea" />}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div style={{ marginTop: '40px', display: 'flex', gap: '12px' }}>
                                    <button
                                        type="submit"
                                        disabled={actionLoading}
                                        style={{
                                            padding: '14px 35px', borderRadius: '10px', border: 'none',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: '#fff', cursor: 'pointer', fontWeight: '700',
                                            boxShadow: '0 6px 12px rgba(102, 126, 234, 0.3)', display: 'flex',
                                            alignItems: 'center', gap: '8px', fontSize: '0.95rem'
                                        }}
                                    >
                                        {actionLoading ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Save Changes</>}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditingItem(null)}
                                        style={{
                                            padding: '14px 30px', borderRadius: '10px',
                                            border: '2px solid #e2e8f0', background: '#fff',
                                            cursor: 'pointer', fontWeight: '700', color: '#64748b', fontSize: '0.95rem'
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.form>
                        ) : activeTab === 'profiles' ? (
                            <motion.div
                                key="profile-view"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ background: '#fff', padding: '70px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}
                            >
                                <div style={{
                                    width: '110px', height: '110px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 25px', boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                                }}>
                                    <User size={55} color="#fff" strokeWidth={2} />
                                </div>
                                <h2 style={{ fontSize: '1.9rem', fontWeight: '900', color: '#1e293b', marginBottom: '8px' }}>
                                    {formData.full_name || 'Your Name'}
                                </h2>
                                <p style={{ color: '#64748b', fontSize: '1.05rem', marginBottom: '35px' }}>
                                    {formData.title || 'Professional Title'}
                                </p>
                                <button
                                    onClick={() => startEditing(data[0])}
                                    style={{
                                        padding: '15px 40px', borderRadius: '10px', border: 'none',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: '#fff', cursor: 'pointer', fontWeight: '700',
                                        boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
                                        display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1rem'
                                    }}
                                >
                                    <Edit size={18} /> Edit Profile
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="table"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}
                            >
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ background: '#f9fafb', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                                            <th style={{ padding: '18px 28px', color: '#6b7280', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Preview</th>
                                            <th style={{ padding: '18px 28px', color: '#6b7280', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Details</th>
                                            <th style={{ padding: '18px 28px', color: '#6b7280', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</th>
                                            <th style={{ padding: '18px 28px', color: '#6b7280', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map(item => (
                                            <tr key={item.id} className="admin-table-row" style={{ borderBottom: '1px solid #f3f4f6', transition: '0.2s' }}>
                                                <td style={{ padding: '22px 28px' }}>
                                                    <div style={{
                                                        width: '45px', height: '45px', background: '#f1f5f9',
                                                        borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        overflow: 'hidden', border: '1px solid #e2e8f0'
                                                    }}>
                                                        {(item.icon || item.image_url) ? (
                                                            <img src={item.icon || item.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                        ) : (
                                                            <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>NO IMG</div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '22px 28px' }}>
                                                    <div style={{ fontWeight: '800', color: '#1e293b', fontSize: '1rem' }}>{item.title || item.name}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '4px' }}>{item.id}</div>
                                                </td>
                                                <td style={{ padding: '22px 28px' }}>
                                                    <span style={{
                                                        padding: '5px 12px', background: '#ede9fe',
                                                        color: '#7c3aed', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800'
                                                    }}>
                                                        {item.category || 'General'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '22px 28px', textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                        <button
                                                            onClick={() => startEditing(item)}
                                                            className="icon-btn"
                                                            style={{
                                                                width: '36px', height: '36px', borderRadius: '8px',
                                                                border: '1px solid #e5e7eb', background: '#fff',
                                                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                            }}
                                                        >
                                                            <Edit size={15} color="#6b7280" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(item.id)}
                                                            className="icon-btn delete"
                                                            style={{
                                                                width: '36px', height: '36px', borderRadius: '8px',
                                                                border: '1px solid #fecaca', background: '#fff',
                                                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                            }}
                                                        >
                                                            <Trash2 size={15} color="#ef4444" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {data.length === 0 && (
                                    <div style={{ padding: '80px', textAlign: 'center', color: '#9ca3af' }}>
                                        <AlertCircle size={45} style={{ margin: '0 auto 18px', opacity: 0.5 }} />
                                        <p style={{ fontSize: '1.05rem', fontWeight: '600' }}>No data found in this section.</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {status && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    style={{
                        position: 'fixed', bottom: '35px', right: '35px', padding: '18px 32px', borderRadius: '14px',
                        background: status.type === 'error' ? '#ef4444' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff', boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        display: 'flex', alignItems: 'center', gap: '14px', zIndex: 2000, fontWeight: '700'
                    }}
                >
                    {status.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                    {status.message}
                </motion.div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
                .form-group { display: flex; flex-direction: column; gap: 8px; }
                .form-group label { font-size: 0.75rem; font-weight: 800; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
                .form-group input, .form-group textarea {
                    padding: 13px 16px; border-radius: 10px; border: 2px solid #e5e7eb; background: #f9fafb;
                    outline: none; transition: 0.3s; font-size: 0.95rem; color: #1e293b; font-weight: 500;
                }
                .form-group input:focus, .form-group textarea:focus {
                    border-color: #667eea; background: #fff; box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }
                .admin-table-row:hover { background: #f9fafb; }
                .icon-btn:hover { border-color: #667eea !important; background: #f0f4ff !important; }
                .icon-btn.delete:hover { background: #fef2f2 !important; border-color: #ef4444 !important; }
                .animate-spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}} />
        </div>
    );
};

export default AdminDashboard;
