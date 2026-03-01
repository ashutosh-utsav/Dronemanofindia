import { useEffect, useState } from 'react';
import pb from '../api/pocketbase';
import type { TeamMember } from '../types';
import './About.css';

export default function About() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const records = await pb.collection('team_members').getFullList<TeamMember>({
          sort: '+created',
        });
        setTeam(records);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team:", error);
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  return (
    <div className="about-container">
      {/* MISSION SECTION */}
      <section id="mission" className="page-wrapper" style={{ textAlign: 'center' }}>
        <div className="section-header">
          <h1 className="gradient-text">Our Mission</h1>
          <p className="centered-subtitle">Pioneering the future of drone technology through research and indigenous innovation.</p>
        </div>
        <div className="mission-description">
          <p>We are dedicated to building a self-reliant drone ecosystem in India, focusing on high-performance hardware and intelligent flight systems.</p>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="page-wrapper centered-section" style={{ background: 'var(--bg-surface)', borderRadius: '40px', margin: '4rem auto' }}>
        <div className="section-header" style={{ textAlign: 'center' }}>
          <h2 className="gradient-text">The Team</h2>
          <p className="centered-subtitle">The visionaries behind the Drone Man of India initiative.</p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading innovators...</p>
        ) : (
          <div className="team-grid">
            {team.map((member) => {
              const photoUrl = member.photo 
                ? `https://render-droneman-1.onrender.com/api/files/${member.collectionId}/${member.id}/${member.photo}`
                : '';
              return (
                <div key={member.id} className="team-card">
                  <div className="team-photo-container">
                    {photoUrl && <img src={photoUrl} alt={member.name} className="team-photo" />}
                  </div>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* IMPACT SECTION */}
      <section id="impact" className="page-wrapper" style={{ textAlign: 'center' }}>
        <div className="section-header">
          <h2 className="gradient-text">Our Impact</h2>
          <p className="centered-subtitle">Measurable progress in India's aerospace landscape.</p>
        </div>
        <div className="focus-grid" style={{ marginTop: '4rem' }}>
          <div className="focus-card">
            <div className="focus-icon">🚀</div>
            <h3>50+ Projects</h3>
            <p>Successfully deployed indigenous drone solutions across various sectors.</p>
          </div>
          <div className="focus-card">
            <div className="focus-icon">🎓</div>
            <h3>1000+ Students</h3>
            <p>Empowered through specialized workshops and training programs.</p>
          </div>
          <div className="focus-card">
            <div className="focus-icon">🏆</div>
            <h3>12 Patents</h3>
            <p>Developing unique intellectual property in flight control systems.</p>
          </div>
        </div>
      </section>
    </div>
  );
}