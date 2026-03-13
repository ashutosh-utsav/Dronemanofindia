// frontend/src/components/ui/GalleryGrid.tsx
import { useEffect, useState } from 'react';
import pb from '../../api/pocketbase';
import type { GalleryItem } from '../../types';
import './GalleryGrid.css';

export default function GalleryGrid() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  // Auto-rotate carousel every 2 seconds
  useEffect(() => {
    if (items.length <= 1 || selectedImage) return; // Don't rotate if a popup is active or 1 item

    const timer = setTimeout(() => {
      goNext();
    }, 2000);

    return () => clearTimeout(timer);
  }, [items.length, selectedImage, currentIndex]);

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  };

  if (loading) return <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading gallery...</p>;
  if (items.length === 0) return <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No media found yet.</p>;

  return (
    <>
      <div className="gallery-carousel-wrapper">
        {/* Navigation Buttons */}
        {items.length > 1 && (
          <>
            <button className="gallery-carousel-btn prev" onClick={goPrev} aria-label="Previous image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button className="gallery-carousel-btn next" onClick={goNext} aria-label="Next image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </>
        )}

        <div
          className="gallery-carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item) => {
            const imageUrl = item.image
              ? `https://cms.dronemanofindia.com/api/files/${item.collectionId}/${item.id}/${item.image}`
              : '';

            return (
              <div key={item.id} className="gallery-carousel-slide">
                <div className="gallery-carousel-media-container">
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
                      onClick={() => setSelectedImage(imageUrl)} // Click to open popup
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

        {/* Navigation Indicators */}
        <div className="gallery-carousel-dots">
          {items.map((_, idx) => (
            <button
              key={idx}
              className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* The Full-Screen Lightbox Popup */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <span className="lightbox-close">&times;</span>
          <img src={selectedImage} alt="Expanded view" className="lightbox-image" />
        </div>
      )}
    </>
  );
}