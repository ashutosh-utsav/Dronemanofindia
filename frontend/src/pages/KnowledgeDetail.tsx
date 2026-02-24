import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import pb from '../api/pocketbase';
import type { KnowledgeResource } from '../types';

export default function KnowledgeDetail() {
  const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState<KnowledgeResource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResource() {
      if (!id) return;
      try {
        const record = await pb.collection('knowledge_resources').getOne<KnowledgeResource>(id);
        setResource(record);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }
    fetchResource();
  }, [id]);

  if (loading || !resource) return <div className="page-wrapper">Loading...</div>;

  const imageUrl = resource.thumbnail 
    ? `http://127.0.0.1:8090/api/files/${resource.collectionId}/${resource.id}/${resource.thumbnail}`
    : '';
  
  const docUrl = resource.document 
    ? `http://127.0.0.1:8090/api/files/${resource.collectionId}/${resource.id}/${resource.document}`
    : '';

  return (
    <div className="page-wrapper" style={{ maxWidth: '800px' }}>
      <Link to="/knowledge-centre" style={{ color: 'var(--brand-accent)', textDecoration: 'none', display: 'block', marginBottom: '2rem' }}>
        &larr; Back to Resources
      </Link>

      <span style={{ color: 'var(--brand-accent)', fontWeight: '600' }}>{resource.category}</span>
      <h1 className="gradient-text" style={{ fontSize: '3rem', margin: '1rem 0' }}>{resource.title}</h1>
      
      <p style={{ color: 'var(--text-muted)', fontSize: '1.3rem', fontStyle: 'italic', marginBottom: '3rem', borderLeft: '4px solid var(--brand-accent)', paddingLeft: '1.5rem' }}>
        {resource.summary}
      </p>

      {imageUrl && <img src={imageUrl} alt="" style={{ width: '100%', borderRadius: '16px', marginBottom: '3rem' }} />}

      <div 
        style={{ color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '1.1rem' }}
        dangerouslySetInnerHTML={{ __html: resource.content }} 
      />

      {docUrl && (
        <a href={docUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'inline-block', marginTop: '4rem' }}>
          Download Full PDF Resource
        </a>
      )}
    </div>
  );
}