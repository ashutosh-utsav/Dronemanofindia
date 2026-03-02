import { useEffect, useState } from 'react';
import pb from '../api/pocketbase';
import type { TeamMember, SuccessStory } from '../types'; 
import Card from '../components/ui/Card'; 
import './About.css';
import './Events.css'; 

export default function About() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [teamRecords, storyRecords] = await Promise.all([
          pb.collection('team_members').getFullList<TeamMember>({ sort: '+created' }),
          pb.collection('success_stories').getFullList<SuccessStory>({ sort: '-created' })
        ]);
        
        setTeam(teamRecords);
        setStories(storyRecords);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="about-container">
      {/* 1. MISSION */}
      <section id="mission" className="page-wrapper" style={{ textAlign: 'center' }}>
        <div className="section-header">
          <h1 className="gradient-text">Our Mission</h1>
          <p className="centered-subtitle">Pioneering the future of drone technology through research and indigenous innovation.</p>
        </div>
        <div className="mission-description">
          <p>We are dedicated to building a self-reliant drone ecosystem in India, focusing on high-performance hardware and intelligent flight systems.</p>
        </div>
      </section>

      {/* 2. THE TEAM */}
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
              // Built-in foolproof PocketBase URL generator
              const photoUrl = member.photo ? pb.files.getUrl(member, member.photo) : '';
              
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

      {/* 3. OUR IMPACT */}
      <section id="impact" className="page-wrapper" style={{ textAlign: 'center' }}>
        <div className="section-header">
          <h2 className="gradient-text">Our Impact</h2>
          <p className="centered-subtitle">Empowering the next generation of leaders and innovators.</p>
        </div>

        {stories.length > 0 && (
          <div className="card-grid" style={{ marginTop: '3rem', textAlign: 'left' }}>
            {stories.map((story) => {
              // Built-in foolproof PocketBase URL generator
              // *IMPORTANT*: If your column is named 'photo' instead of 'image', change this!
              const imageUrl = story.image ? pb.files.getUrl(story, story.image) : '';

              return (
                <Card 
                  key={story.id}
                  id={story.id}
                  title={story.title}
                  subtitle={`Featuring: ${story.name}`}
                  imageUrl={imageUrl}
                  linkPrefix="impact" 
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}