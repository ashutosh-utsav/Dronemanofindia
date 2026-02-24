import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* The floating navbar stays at the top */}
      <Header />
      
      {/* This main tag grows to fill empty space, pushing the footer to the bottom */}
      <main style={{ flex: 1 }}>
        <Outlet /> 
      </main>
      
      {/* The footer stays at the bottom */}
      <Footer />
    </div>
  );
}