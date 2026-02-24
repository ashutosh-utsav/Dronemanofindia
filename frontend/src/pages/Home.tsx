import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pb from '../api/pocketbase';
import type { DroneEvent } from '../types';
import Card from '../components/ui/Card';
import './Home.css';
import './Events.css'; // Keeps the card grid uniform

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
        <div className="hero-content">
          <h1 className="gradient-text">India's Aerial Future.</h1>
          <p className="hero-subtitle">
            Uniting innovators, policymakers, and engineers to accelerate the nation's drone ecosystem through research, policy, and indigenous manufacturing.
          </p>
          <div className="hero-buttons">
            <Link to="/about" className="btn-primary">Explore Our Mission</Link>
            <Link to="/contact" className="btn-secondary">Join the Ecosystem</Link>
          </div>
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
        </div>
      </section>

      {/* 3. Featured Events */}
      <section className="featured-events-wrapper">
        <div className="section-header">
          <h2>Upcoming Summits</h2>
          <p>Join the community shaping the future of flight.</p>
        </div>
        
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading network data...</p>
        ) : (
          <div className="card-grid">
            {featuredEvents.map((event) => {
              const imageUrl = event.image 
                ? `http://127.0.0.1:8090/api/files/${event.collectionId}/${event.id}/${event.image}`
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
    </div>
  );
}