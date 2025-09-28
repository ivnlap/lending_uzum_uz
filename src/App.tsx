import { useEffect } from 'react';
import './i18n';
import { captureOriginalParameters } from './utils/utm';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Benefits from './components/Benefits/Benefits';
import Calculator from './components/Calculator/Calculator';
import Referral from './components/Referral/Referral';
import Requirements from './components/Requirements/Requirements';
import Reviews from './components/Reviews/Reviews';
import HowToStart from './components/HowToStart/HowToStart';
import FAQ from './components/FAQ/FAQ';
import Cities from './components/Cities/Cities';
import Footer from './components/Footer/Footer';
import FloatingCTA from './components/FloatingCTA/FloatingCTA';

function App() {
  useEffect(() => {
    // Capture original URL parameters on app initialization
    captureOriginalParameters();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Calculator />
        <Referral />
        <Requirements />
        <Reviews />
        <HowToStart />
        <FAQ />
        <Cities />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}

export default App;