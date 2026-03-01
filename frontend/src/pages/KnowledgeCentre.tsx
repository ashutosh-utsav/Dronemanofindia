import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import pb from '../api/pocketbase';
import type { KnowledgeResource } from '../types';
import Card from '../components/ui/Card';
import './KnowledgeCentre.css';
import './Events.css';

const CATEGORIES = ['All', 'Research Paper', 'Invention History', 'Case Study', 'Technical Handbook'];

export default function KnowledgeCentre() {
  const [resources, setResources] = useState<KnowledgeResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeFilter = searchParams.get('type') || 'All';

  // 1. Fetch the data
  useEffect(() => {
    async function fetchResources() {
      try {
        const records = await pb.collection('knowledge_resources').getFullList<KnowledgeResource>({
          sort: '-created',
        });
        setResources(records);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching resources:", error);
        setLoading(false);
      }
    }
    fetchResources();
  }, []);

  // 2. The Framing Scroll Logic
  useEffect(() => {
    if (searchParams.has('type')) {
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
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchParams]);

  const handleFilterChange = (category: string) => {
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ type: category });
    }
  };

  const displayedResources = activeFilter === 'All' 
    ? resources 
    : resources.filter(res => res.category === activeFilter);

  return (
    <div className="page-container">
      <h1 className="page-title">Knowledge Centre</h1>
      
      {/* Target ID for the auto-scroll */}
      <div id="filter-target" className="filter-container">
        {CATEGORIES.map(category => (
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
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading resources...</p>
      ) : (
        <div className="card-grid">
          {displayedResources.map((resource) => {
            const imageUrl = resource.thumbnail 
              ? `https://render-droneman-1.onrender.com/api/files/${resource.collectionId}/${resource.id}/${resource.thumbnail}`
              : '';
            return (
              <Card 
                key={resource.id}
                id={resource.id}
                title={resource.title}
                subtitle={resource.summary}
                imageUrl={imageUrl}
                linkPrefix="knowledge-centre"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}