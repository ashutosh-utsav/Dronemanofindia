import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import pb from '../api/pocketbase';
import type { DroneEvent } from '../types';
import EventCard from '../components/ui/EventCard';
import './Events.css'; 
import './KnowledgeCentre.css'; 

// Display label → URL param value
const EVENT_CATEGORIES: { label: string; value: string }[] = [
  { label: 'All', value: 'All' },
  { label: 'Conferences', value: 'Conference' },
  { label: 'Meetups', value: 'Meetup' },
  { label: 'Workshops', value: 'Workshop' },
  { label: 'Competitions', value: 'Competition' },
];

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

  const handleFilterChange = (value: string) => {
    if (value === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ type: value });
    }
  };

  // THE FIX: The Smart Filter
  // This removes the 's' from both the CMS data and the button name so they always match
  // (e.g., "Conferences" and "Conference" both become "conference")
  const displayedEvents = activeFilter === 'All' 
    ? events 
    : events.filter(event => {
        if (!event.type) return false;
        
        const dbType = event.type.toLowerCase().trim().replace(/s$/, '');
        const filterType = activeFilter.toLowerCase().trim().replace(/s$/, '');
        
        return dbType === filterType;
      });

  return (
    <div className="page-container">
      <h1 className="page-title">Events & Programs</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
        Workshops, training sessions, and innovation programs that empower students to learn AI and drone technologies
      </p>
      
      <div id="filter-target" className="filter-container">
        {EVENT_CATEGORIES.map(({ label, value }) => (
          <button 
            key={value}
            className={`filter-btn ${activeFilter === value ? 'active' : ''}`}
            onClick={() => handleFilterChange(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading events...</p>
      ) : displayedEvents.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Coming soon...</p>
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
                time={event.time} 
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