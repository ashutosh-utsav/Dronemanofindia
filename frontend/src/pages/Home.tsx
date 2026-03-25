import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pb from '../api/pocketbase';
import type { DroneEvent } from '../types';
import Card from '../components/ui/Card';
import './Home.css';
import './Events.css'; 

import JourneyTimeline from '../components/ui/JourneyTimeline';

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState<DroneEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedEvents() {
      try {
        const records = await pb.collection('events').getList<DroneEvent>(1, 3, {
          sort: '-created',
        });
        setFeaturedEvents(records.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured events:", error);
        setLoading(false);
      }
    }
    fetchFeaturedEvents();
  }, []);

  return (
    <div>
      {/* 1. Cinematic Hero Banner */}
      <section className="hero-section">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video-bg"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* A light overlay to soften the video */}
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="gradient-text"></h1>
          <p className="hero-subtitle">
            
          </p>
        </div>

        {/* CTA Buttons — At the bottom of the video */}
        <div className="hero-buttons">
          <Link to="/about" className="btn-primary">Explore Our Mission</Link>
          <Link to="/contact" className="btn-secondary">Join the Ecosystem</Link>
        </div>
      </section>

      {/* 2. Sleek Focus Areas Grid */}
      <section className="focus-section">
        <div className="section-header">
          <h2>Core Domains</h2>
          <p>The strategic pillars driving our technological advancement.</p>
        </div>
        <div className="focus-grid">
          <div className="focus-card">
            <div className="focus-icon">⎈</div>
            <h3>Drone Research</h3>
            <p>Advancing the boundaries of aerial robotics, swarm intelligence, and autonomous systems for enterprise applications.</p>
          </div>
          <div className="focus-card">
            <div className="focus-icon">⚡</div>
            <h3>Tech Innovation</h3>
            <p>Developing cutting-edge indigenous payloads, advanced telemetry, and flight controllers to power the next generation.</p>
          </div>
          <div className="focus-card">
            <div className="focus-icon">⌘</div>
            <h3>Training & Skilling</h3>
            <p>Equipping the aerospace workforce of tomorrow with comprehensive drone piloting, maintenance, and engineering skills.</p>
          </div>
          <div className="focus-card">
            <div className="focus-icon">🌐</div>
            <h3>Policy & Community</h3>
            <p>Bridging the gap between hardware manufacturers and regulatory bodies to establish progressive aviation frameworks.</p>
          </div>

          <div className="focus-card">
            <div className="focus-icon">🔬</div>
            <h3>Applied Research & Prototyping</h3>
            <p>Transforming innovative concepts into real-world drone solutions through rapid prototyping, testing, and iterative engineering.</p>
          </div>

          <div className="focus-card">
            <div className="focus-icon">🛰️</div>
            <h3>Autonomous Systems & AI</h3>
            <p>Integrating artificial intelligence, computer vision, and autonomous navigation to build smarter and more efficient aerial platforms.</p>
          </div>

        </div>
      </section>

      <JourneyTimeline />

      {/* 3. Featured Events */}
      <section className="featured-events-wrapper">
        <div className="section-header">
          <h2>Featured Events</h2>
          <p>Join the community shaping the future of flight.</p>
        </div>
        
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading network data...</p>
        ) : (
          <div className="card-grid">
            {featuredEvents.map((event) => {
              const imageUrl = event.image 
                ? `https://cms.dronemanofindia.com/api/files/${event.collectionId}/${event.id}/${event.image}`
                : '';

              return (
                <Card 
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  subtitle={event.location}
                  date={event.date}
                  imageUrl={imageUrl}
                  linkPrefix="events"
                />
              );
            })}
          </div>
        )}
        
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link to="/events" className="btn-secondary" style={{ padding: '0.8rem 3rem' }}>View Full Calendar</Link>
        </div>
      </section>

      {/* 4. Prominent Areas of Focus (Heavy & Bold) */}
      <section className="focus-section" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="section-header">
          <h2 className="gradient-text" style={{ fontSize: '2.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            Prominent Areas of Focus
          </h2>
        </div>
        
        <div className="focus-grid">
          <div className="focus-card" style={{ padding: '3rem 2.5rem' }}>
            <div className="focus-icon">🛡️</div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Sovereign Innovation
            </h3>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-accent)', marginBottom: '1.5rem' }}>
              Strategic Indigenization & Make in India
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Breaking global dependencies by engineering world-class UAV (Unmanned Aerial Vehicle) systems designed, developed, and manufactured on Indian soil.
            </p>
          </div>

          <div className="focus-card" style={{ padding: '3rem 2.5rem' }}>
            <div className="focus-icon">🌾</div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Precision Agriculture
            </h3>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-accent)', marginBottom: '1.5rem' }}>
              Revolutionizing the Agrarian Economy
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Empowering the Indian farmer with data-driven drone technology to enhance crop yields, optimize resource management, and ensure national food security.
            </p>
          </div>

          <div className="focus-card" style={{ padding: '3rem 2.5rem' }}>
            <div className="focus-icon">🚁</div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Tactical Disaster Response
            </h3>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-accent)', marginBottom: '1.5rem' }}>
              Autonomous Search, Rescue & Relief
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Deploying cutting-edge aerial intelligence to navigate the unreachable, saving lives during natural calamities through rapid-response drone deployment.
            </p>
          </div>

          <div className="focus-card" style={{ padding: '3rem 2.5rem' }}>
            <div className="focus-icon">⚙️</div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              National Semiconductor <br/>& Tech Advancement
            </h3>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-accent)', marginBottom: '1.5rem' }}>
              Building the Future Tech-Ecosystem
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Driving the evolution of drone hardware and software to position India as the global "Drone Hub" by 2030.
            </p>
          </div>

          <div className="focus-card" style={{ padding: '3rem 2.5rem' }}>
            <div className="focus-icon">🎓</div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Human Capital Empowerment
            </h3>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-accent)', marginBottom: '1.5rem' }}>
              Scaling Skill Bharat Missions
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Architecting specialized training programs to transform the Indian youth into a powerhouse of certified drone pilots and aerospace engineers.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}