import { Link } from 'react-router-dom';
import './EventCard.css';

interface EventCardProps {
  id: string;
  title: string;
  type: string;
  description: string;
  date?: string;
  time?: string;
  location: string;
  imageUrl: string;
}

export default function EventCard({ id, title, type, description, date, time, location, imageUrl }: EventCardProps) {
  // Strips HTML tags from the rich-text description for a clean preview
  const cleanDescription = description.replace(/<[^>]+>/g, '');

  return (
    <div className="event-card">
      <div className="ec-image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="ec-image" />
        ) : (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>No Image</div>
        )}
        <span className="ec-type-tag">{type}</span>
      </div>
      
      <div className="ec-body">
        <h3 className="ec-title">{title}</h3>
        <p className="ec-desc">{cleanDescription}</p>
        
        <div className="ec-meta-list">
          {date && (
            <div className="ec-meta-item">
              <span className="ec-meta-icon">📅</span>
              <span>{new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          )}
          {time && (
            <div className="ec-meta-item">
              <span className="ec-meta-icon">🕒</span>
              <span>{time}</span>
            </div>
          )}
          <div className="ec-meta-item">
            <span className="ec-meta-icon">📍</span>
            <span>{location}</span>
          </div>
        </div>

        <div className="ec-footer">
          <Link to={`/events/${id}`} className="ec-link">
            Event Details <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}