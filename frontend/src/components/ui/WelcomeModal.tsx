import { useState, useEffect } from 'react';
import pb from '../../api/pocketbase';
import './WelcomeModal.css';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Check Local Storage when the component loads
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenWelcomePopup');
    if (!hasSeenPopup) {
      // Small delay so it doesn't aggressively pop up the millisecond the site loads
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWelcomePopup', 'true'); // Remember they closed it
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to your new PocketBase collection
      await pb.collection('user_details').create(formData);
      closeModal(); // Close and set local storage
    } catch (error) {
      console.error("Error submitting details:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If it's closed, don't render anything
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={closeModal} aria-label="Close">✕</button>
        
        <h2 className="gradient-text modal-title">Welcome to Drone Man</h2>
        <p className="modal-subtitle">Join our ecosystem to stay updated on the latest research, events, and aviation policies.</p>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <input 
              type="text" 
              name="name" 
              placeholder="Full Name" 
              className="modal-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              className="modal-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="tel" 
              name="phone" 
              placeholder="Phone Number (Optional)" 
              className="modal-input"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="modal-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Joining...' : 'Join the Network'}
          </button>
        </form>
        
        <button className="modal-skip-btn" onClick={closeModal}>
          No thanks, let me explore the site
        </button>
      </div>
    </div>
  );
}