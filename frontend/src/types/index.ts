export interface DroneEvent {
  id: string; 
  collectionId: string; 
  title: string;
  type: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  image: string; 
}

export interface KnowledgeResource {
  id: string;
  collectionId: string; 
  title: string;
  category: string;
  summary: string;
  content: string;
  thumbnail: string;
  document: string;
}

export interface TeamMember {
  id: string;
  collectionId: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
}

export interface SuccessStory {
  id: string;
  collectionId: string;
  name: string;
  title: string;
  content: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  collectionId: string;
  title: string;
  media_type: 'Photo' | 'Video';
  image: string; 
  youtube_url: string;
}