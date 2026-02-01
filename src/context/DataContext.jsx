import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [services, setServices] = useState([]);
  const [about, setAbout] = useState('');
  const [contact, setContact] = useState({
    email: '',
    location: '',
    github: '',
    linkedin: ''
  });
  const [cvUrl, setCvUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const { data: projectsData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      const { data: skillsData } = await supabase.from('skills').select('*').order('created_at', { ascending: true });
      const { data: servicesData } = await supabase.from('services').select('*').order('created_at', { ascending: true });
      const { data: profileData } = await supabase.from('profiles').select('*').single();

      setProjects(projectsData || []);
      setSkills(skillsData || []);
      setServices(servicesData || []);

      if (profileData) {
        setAbout(profileData.about || '');
        setContact({
          email: profileData.email || '',
          location: profileData.location || '',
          github: profileData.github_url || '',
          linkedin: profileData.linkedin_url || ''
        });
        setCvUrl(profileData.cv_url || null);
      } else {
        // Log for debugging but don't break the app
        console.warn('Profile data not found in Supabase.');
      }
    } catch (error) {
      console.error('Error fetching data from Supabase:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider value={{
      projects,
      skills,
      services,
      about,
      contact,
      cvUrl,
      loading,
      refreshData: fetchPortfolioData
    }}>
      {children}
    </DataContext.Provider>
  );
};
