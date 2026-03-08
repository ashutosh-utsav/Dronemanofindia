// frontend/src/components/ui/GalleryGrid.tsx
import { useEffect, useState } from 'react';
import pb from '../../api/pocketbase';
import type { GalleryItem } from '../../types';
import './GalleryGrid.css';

export default function GalleryGrid() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // NEW: State to track which image is currently popped up
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const records = await pb.collection('gallery_media').getFullList<GalleryItem>({
          sort: '-created',
        });
        setItems(records);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gallery:", error);
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  };

  if (loading) return <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading gallery...</p>;
  if (items.length === 0) return <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No media found yet.</p>;

  return (
    <>
      <div className="gallery-grid">
        {items.map((item) => {
          const imageUrl = item.image 
            ? `https://cms.dronemanofindia.com/api/files/${item.collectionId}/${item.id}/${item.image}`
            : '';

          return (
            <div key={item.id} className="gallery-card">
              <div className="gallery-media-container">
                {item.media_type === 'Video' && item.youtube_url ? (
                  <iframe 
                    src={getEmbedUrl(item.youtube_url)} 
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                  />
                ) : (
                  <img 
                    src={imageUrl} 
                    alt={item.title} 
                    onClick={() => setSelectedImage(imageUrl)} // NEW: Click to open popup
                  />
                )}
              </div>
              {item.title && (
                <div className="gallery-info">
                  <h3 className="gallery-title">{item.title}</h3>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* NEW: The Full-Screen Lightbox Popup */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <span className="lightbox-close">&times;</span>
          <img src={selectedImage} alt="Expanded view" className="lightbox-image" />
        </div>
      )}
    </>
  );
}