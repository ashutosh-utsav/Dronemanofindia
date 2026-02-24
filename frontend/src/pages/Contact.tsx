import { useState } from 'react';
import pb from '../api/pocketbase';
import './Contact.css';

export default function Contact() {
  // We use state to hold what the user types into the boxes
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'General Inquiry',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // This updates our state every time the user types a letter
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // This runs when they hit the Submit button
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from refreshing
    setIsSubmitting(true);

    try {
      // Send the data TO PocketBase!
      await pb.collection('contact_submissions').create(formData);
      
      setIsSuccess(true);
      // Clear the form back to empty
      setFormData({ name: '', email: '', type: 'General Inquiry', message: '' });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <h1 style={{ color: '#fff', marginBottom: '2rem', textAlign: 'center' }}>Contact Us</h1>
      
      {isSuccess && (
        <div className="success-message">
          Thank you! Your message has been sent successfully. We will be in touch soon.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            className="form-input" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="form-input" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">What is this regarding?</label>
          <select 
            id="type" 
            name="type" 
            className="form-input" 
            value={formData.type} 
            onChange={handleChange}
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Membership Request">Membership Request</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea 
            id="message" 
            name="message" 
            className="form-input" 
            rows={5} 
            value={formData.message} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}