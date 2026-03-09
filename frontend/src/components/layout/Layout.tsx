import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import WelcomeModal from '../ui/WelcomeModal'; 

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <WelcomeModal /> 

      <Header />
      
      <main style={{ flex: 1 }}>
        <Outlet /> 
      </main>
      
      <Footer />
    </div>
  );
}