import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import pb from '../api/pocketbase';
import type { DroneEvent } from '../types';

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<DroneEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSingleEvent() {
      if (!id) return;
      try {
        const record = await pb.collection('events').getOne<DroneEvent>(id);
        setEvent(record);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event:", error);
        setLoading(false);
      }
    }
    fetchSingleEvent();
  }, [id]);

  if (loading) return <div className="page-wrapper" style={{textAlign: 'center'}}>Loading...</div>;
  if (!event) return <div className="page-wrapper" style={{textAlign: 'center'}}>Event not found.</div>;

  const imageUrl = event.image 
    ? `https://render-droneman-1.onrender.com/api/files/${event.collectionId}/${event.id}/${event.image}`
    : '';

  return (
    <div className="page-wrapper" style={{ maxWidth: '900px' }}>
      <Link to="/events" style={{ color: 'var(--brand-accent)', textDecoration: 'none', display: 'block', marginBottom: '2rem' }}>
        &larr; Back to Events
      </Link>
      
      <div style={{ marginBottom: '3rem' }}>
        <span style={{ color: 'var(--brand-accent)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem' }}>
          {event.type}
        </span>
        <h1 style={{ fontSize: '3.5rem', marginTop: '0.5rem', marginBottom: '1.5rem' }} className="gradient-text">
          {event.title}
        </h1>
        <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          <span>📍 {event.location}</span>
          {event.date && <span>📅 {new Date(event.date).toLocaleDateString()}</span>}
        </div>
      </div>

      {imageUrl && (
        <img src={imageUrl} alt={event.title} style={{ width: '100%', borderRadius: '24px', marginBottom: '3rem', border: '1px solid var(--border-subtle)' }} />
      )}

      <div 
        style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.2rem' }}
        dangerouslySetInnerHTML={{ __html: event.description }} 
      />
    </div>
  );
}