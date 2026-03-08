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
          <h1 className="gradient-text">Our Mission – Viksit Bharat AI & Drone Innovation</h1>
        </div>
        
        {/* Mission Image */}
        <div style={{ marginBottom: '3rem' }}>
          <img 
            src="/Our Mission theme photo.jpeg" 
            alt="Our Mission Team" 
            style={{ 
              width: '100%', 
              maxWidth: '900px', 
              borderRadius: '24px', 
              border: '1px solid var(--border-subtle)',
              objectFit: 'cover'
            }} 
          />
        </div>

        {/* Mission Text */}
        <div className="mission-description" style={{ textAlign: 'left', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-muted)' }}>
          <p>
            Our mission at Viksit Bharat AI & Drone Innovation is to empower the next generation of innovators by promoting knowledge and practical skills in Artificial Intelligence, Drone Technology, and emerging technologies. We believe that technology-driven education can play a crucial role in building a self-reliant and technologically advanced India.
          </p>
          <p>
            Through our initiatives, we aim to educate, inspire, and guide students toward understanding modern technologies that are shaping the future. By introducing students to real-world applications of AI, automation, drones, smart agriculture, and innovative engineering solutions, we help them develop problem-solving skills and creative thinking.
          </p>
          <p>
            Our platform focuses on providing awareness, learning resources, and project-based innovation opportunities so that students can transform their ideas into practical solutions. We encourage young minds to explore technology not only as a career path but also as a tool to solve real-world challenges in fields such as agriculture, healthcare, energy, and smart infrastructure.
          </p>
          <p>
            Aligned with the vision of Viksit Bharat, our goal is to nurture a community of skilled students and innovators who will contribute to building a future-ready India powered by technology, innovation, and knowledge.
          </p>
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