import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import pb from '../api/pocketbase';
import type { DroneEvent } from '../types';
import EventCard from '../components/ui/EventCard';
import './Events.css'; 
import './KnowledgeCentre.css'; 

// Updated Categories to match your request exactly
const EVENT_CATEGORIES = ['All', 'Events', 'Conferences', 'Meetups', 'Workshop', 'Competition'];

export default function Events() {
  const [events, setEvents] = useState<DroneEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const activeFilter = searchParams.get('type') || 'All';

  useEffect(() => {
    async function fetchEvents() {
      try {
        const records = await pb.collection('events').getFullList<DroneEvent>({
          sort: '-created',
        });
        setEvents(records);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    if (searchParams.has('type')) {
      setTimeout(() => {
        const element = document.getElementById('filter-target');
        if (element) {
          const headerOffset = 120; 
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100); 
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchParams]);

  const handleFilterChange = (category: string) => {
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ type: category });
    }
  };

  const displayedEvents = activeFilter === 'All' 
    ? events 
    : events.filter(event => event.type === activeFilter);

  return (
    <div className="page-container">
      {/* Updated Heading & Subtitle */}
      <h1 className="page-title">Events & Programs</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
        Workshops, training sessions, and innovation programs that empower students to learn AI and drone technologies
      </p>
      
      <div id="filter-target" className="filter-container">
        {EVENT_CATEGORIES.map(category => (
          <button 
            key={category}
            className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
            onClick={() => handleFilterChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading events...</p>
      ) : (
        <div className="card-grid">
          {displayedEvents.map((event) => {
            const imageUrl = event.image 
              ? `https://cms.dronemanofindia.com/api/files/${event.collectionId}/${event.id}/${event.image}`
              : '';
            return (
              <EventCard 
                key={event.id}
                id={event.id}
                title={event.title}
                type={event.type}
                description={event.description}
                date={event.date}
                time={event.time} /* Requires adding 'time' to your CMS */
                location={event.location}
                imageUrl={imageUrl}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}