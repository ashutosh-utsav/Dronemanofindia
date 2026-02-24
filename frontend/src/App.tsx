import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import KnowledgeCentre from './pages/KnowledgeCentre';
import Contact from './pages/Contact';
import EventDetail from './pages/EventDetail';
import KnowledgeDetail from './pages/KnowledgeDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Layout wraps around all these pages */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/knowledge-centre" element={<KnowledgeCentre />} />
          <Route path="/contact" element={<Contact />} />
    
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/knowledge-centre/:id" element={<KnowledgeDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}