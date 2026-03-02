import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import pb from '../api/pocketbase';
import type { SuccessStory } from '../types';

export default function ImpactDetail() {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<SuccessStory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStory() {
      if (!id) return;
      try {
        const record = await pb.collection('success_stories').getOne<SuccessStory>(id);
        setStory(record);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching story:", error);
        setLoading(false);
      }
    }
    fetchStory();
  }, [id]);

  if (loading) return <div className="page-wrapper" style={{textAlign: 'center'}}>Loading...</div>;
  if (!story) return <div className="page-wrapper" style={{textAlign: 'center'}}>Story not found.</div>;

  // The foolproof URL generator
  const imageUrl = story.image ? pb.files.getUrl(story, story.image) : '';

  return (
    <div className="page-wrapper" style={{ maxWidth: '900px' }}>
      <Link to="/about#impact" style={{ color: 'var(--brand-accent)', textDecoration: 'none', display: 'block', marginBottom: '2rem' }}>
        &larr; Back to About Us
      </Link>
      
      <div style={{ marginBottom: '3rem' }}>
        <span style={{ color: 'var(--brand-accent)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem' }}>
          Mentorship & Impact
        </span>
        <h1 style={{ fontSize: '3.5rem', marginTop: '0.5rem', marginBottom: '1.5rem' }} className="gradient-text">
          {story.title}
        </h1>
        <div style={{ color: 'var(--text-muted)', fontSize: '1.2rem', fontWeight: '500' }}>
          Featuring: {story.name}
        </div>
      </div>

      {imageUrl && (
        <img src={imageUrl} alt={story.name} style={{ width: '100%', maxHeight: '600px', objectFit: 'cover', borderRadius: '24px', marginBottom: '3rem', border: '1px solid var(--border-subtle)' }} />
      )}

      <div 
        style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.2rem' }}
        dangerouslySetInnerHTML={{ __html: story.content }} 
      />
    </div>
  );
}