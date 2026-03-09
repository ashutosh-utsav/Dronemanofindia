// frontend/src/components/ui/JourneyTimeline.tsx
import './JourneyTimeline.css';

// The Journey Timeline Data - based on your uploaded photos!
const journeyMilestones = [
  {
    id: 1,
    phase: "Grassroots & Mentorship",
    title: "Inspiring the Next Generation",
    description: "The foundation of a self-reliant India starts with its youth. The journey is deeply rooted in mentoring young minds, instilling discipline, and nurturing an early passion for technology and national duty.",
    image: "/youth-mentor.png" // Put the photo of the young boy in uniform here
  },
  {
    id: 2,
    phase: "Tactical Implementation",
    title: "On-Ground Field Operations",
    description: "Moving from theory to practice. Engaging directly with armed forces personnel in rigorous field trials to ensure that indigenous drone innovations are tactical, rugged, and ready for real-world deployment.",
    image: "/field-operations.png" // Put the photo of Rahul with the military outdoors by the machinery here
  },
  {
    id: 3,
    phase: "Strategic Defense",
    title: "Empowering the Armed Forces",
    description: "Briefing top-tier military brass and commanding officers. Showcasing how advanced aerial robotics and intelligent flight systems can modernize surveillance and strengthen national security.",
    image: "/military-briefing.png" // Put the photo of Rahul showing the document to the Army Generals here
  },
  {
    id: 4,
    phase: "National Leadership",
    title: "Recognition at the Highest Levels",
    description: "Collaborating with national leaders, including the Defense Minister, to integrate indigenous drone technology into India's strategic sectors and align with the vision of a Viksit Bharat.",
    image: "/rajnath-singh.png" // Put the photo of Rahul with Defense Minister Rajnath Singh here
  },
  {
    id: 5,
    phase: "Ecosystem Building",
    title: "Shaping the National Drone Hub",
    description: "Leading discussions at flagship events like Bharat Drone Shakti and the Amaravati Drone Summit, actively working to position India as a global powerhouse for drone manufacturing and policy.",
    image: "/drone-summits.png" // Put the screenshot of the Summit events here
  }
];

export default function JourneyTimeline() {
  return (
    <section className="timeline-wrapper">
      <div className="section-header">
        <h2 className="gradient-text">The Journey</h2>
        <p className="centered-subtitle">The ongoing mission of the Drone Man of India.</p>
      </div>
      
      <div className="timeline-container">
        {journeyMilestones.map((milestone, index) => {
          // Alternates left and right placement
          const sideClass = index % 2 === 0 ? 'left' : 'right';
          
          return (
            <div key={milestone.id} className={`timeline-item ${sideClass}`}>
              <div className="timeline-card">
                {milestone.image && (
                  <img src={milestone.image} alt={milestone.title} className="timeline-image" />
                )}
                {/* We reuse the 'timeline-year' CSS class, but feed it the phase text instead! */}
                <div className="timeline-year">{milestone.phase}</div>
                <h3 className="timeline-title">{milestone.title}</h3>
                <p className="timeline-desc">{milestone.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}