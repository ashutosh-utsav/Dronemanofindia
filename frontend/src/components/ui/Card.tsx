import { Link } from 'react-router-dom';
import './Card.css';

// We define what information the Card needs to display
interface CardProps {
  id: string;
  title: string;
  subtitle: string;
  date?: string;
  imageUrl: string;
  linkPrefix: string; // Tells the button if it should go to /events/id or /knowledge-centre/id
}

export default function Card({ id, title, subtitle, date, imageUrl, linkPrefix }: CardProps) {
  return (
    <div className="custom-card">
      <div className="card-image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="card-image" />
        ) : (
          <div className="card-placeholder">No Image</div>
        )}
      </div>
      
      <div className="card-content">
        {/* If a date exists, show it */}
        {date && <span className="card-date">{new Date(date).toLocaleDateString()}</span>}
        
        <h3 className="card-title">{title}</h3>
        <p className="card-subtitle">{subtitle}</p>
        
        <Link to={`/${linkPrefix}/${id}`} className="card-button">
          View Details
        </Link>
      </div>
    </div>
  );
}