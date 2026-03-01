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
  
  const activeFilter = searchParams.get('type') || 'All';

  // 1. Fetch the data
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

  // 2. The Framing Scroll Logic
  useEffect(() => {
    if (searchParams.has('type')) {
      // If a specific filter is clicked from the menu, scroll to frame it
      setTimeout(() => {
        const element = document.getElementById('filter-target');
        if (element) {
          const headerOffset = 120; // Accounts for your sticky header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100); // 100ms delay ensures the DOM is painted before scrolling
    } else {
      // If they just clicked "All Events", ensure they start at the top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchParams]); // Re-runs whenever the URL changes

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
      
      {/* We add an ID here so the Javascript knows exactly where to scroll */}
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
              ? `https://render-droneman-1.onrender.com/api/files/${event.collectionId}/${event.id}/${event.image}`
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