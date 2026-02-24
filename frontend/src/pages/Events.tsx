import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import pb from '../api/pocketbase';
import type { DroneEvent } from '../types';
import Card from '../components/ui/Card';
import './Events.css'; 
import './KnowledgeCentre.css'; 

const EVENT_CATEGORIES = ['All', 'Conference', 'Workshop', 'Meetup', 'Competition'];

export default function Events() {
  const [events, setEvents] = useState<DroneEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get active filter from URL or default to 'All'
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
      <h1 className="page-title">Events & Programs</h1>
      
      <div className="filter-container">
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
    </div>
  );
}