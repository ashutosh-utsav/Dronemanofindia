export interface DroneEvent {
  id: string; 
  collectionId: string; // <-- Add this line
  title: string;
  type: string;
  date: string;
  location: string;
  description: string;
  image: string; 
}

export interface KnowledgeResource {
  id: string;
  collectionId: string; // <-- Add this line
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