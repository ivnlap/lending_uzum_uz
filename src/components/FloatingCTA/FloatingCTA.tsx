import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { openCourierForm } from '../../utils/utm';

const FloatingCTA = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show button after scrolling 100px
      setIsVisible(scrollPosition > 100);
      
      // Hide when near footer (last 200px of page)
      setIsAtBottom(scrollPosition + windowHeight > documentHeight - 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    openCourierForm('floating');
  };

  if (!isVisible || isAtBottom) return null;

  return (
    <div className="fixed bottom-6 right-4 lg:bottom-8 lg:right-8 z-50">
      <button
        onClick={handleClick}
        className="group bg-primary-500 hover:bg-primary-400 hover:brightness-110 text-white font-semibold py-4 px-6 lg:px-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 max-w-xs lg:max-w-none hover:ring-4 hover:ring-primary-300 hover:ring-opacity-50"
      >
        <span className="text-sm lg:text-base">
          {t('header.nav.become_courier')}
        </span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
      </button>
      
      {/* Pulse animation */}
      <div className="absolute inset-0 bg-primary-500 rounded-2xl animate-ping opacity-20 pointer-events-none"></div>
    </div>
  );
};

export default FloatingCTA;