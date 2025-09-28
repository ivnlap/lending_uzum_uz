import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { openCourierForm } from '../../utils/utm';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleCTAClick = () => {
    openCourierForm('header');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/images/uzum-tezkor-logo.png" 
              alt="Uzum Tezkor" 
              className="h-8 lg:h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
            >
              {t('header.nav.benefits')}
            </button>
            <button
              onClick={() => scrollToSection('calculator')}
              className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
            >
              {t('header.nav.calculator')}
            </button>
            <button
              onClick={() => scrollToSection('referral')}
              className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
            >
              {t('header.nav.referral')}
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
            >
              {t('header.nav.reviews')}
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
            >
              {t('header.nav.faq')}
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switch */}
            <div className="flex items-center border border-gray-300 rounded-md p-1 bg-gray-50">
              <button
                onClick={() => changeLanguage('ru')}
                className={`px-3 py-1 text-sm font-medium rounded transition-all ${
                  i18n.language === 'ru' 
                    ? 'bg-[#7C3AED] text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => changeLanguage('uz')}
                className={`px-3 py-1 text-sm font-medium rounded transition-all ${
                  i18n.language === 'uz' 
                    ? 'bg-[#7C3AED] text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                UZ
              </button>
            </div>
            
            {/* CTA Button */}
            <button
              onClick={handleCTAClick}
              className="btn-primary"
            >
              {t('header.nav.become_courier')}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile Language Switch */}
            <div className="flex items-center border border-gray-300 rounded-md p-1 bg-gray-50">
              <button
                onClick={() => changeLanguage('ru')}
                className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                  i18n.language === 'ru' 
                    ? 'bg-[#7C3AED] text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => changeLanguage('uz')}
                className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                  i18n.language === 'uz' 
                    ? 'bg-[#7C3AED] text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                UZ
              </button>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-primary-500 hover:bg-gray-50"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              <button
                onClick={() => scrollToSection('benefits')}
                className="block w-full text-left text-gray-700 hover:text-primary-500 font-medium py-2"
              >
                {t('header.nav.benefits')}
              </button>
              <button
                onClick={() => scrollToSection('calculator')}
                className="block w-full text-left text-gray-700 hover:text-primary-500 font-medium py-2"
              >
                {t('header.nav.calculator')}
              </button>
              <button
                onClick={() => scrollToSection('referral')}
                className="block w-full text-left text-gray-700 hover:text-primary-500 font-medium py-2"
              >
                {t('header.nav.referral')}
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className="block w-full text-left text-gray-700 hover:text-primary-500 font-medium py-2"
              >
                {t('header.nav.reviews')}
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="block w-full text-left text-gray-700 hover:text-primary-500 font-medium py-2"
              >
                {t('header.nav.faq')}
              </button>
              
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={handleCTAClick}
                  className="btn-primary w-full text-sm px-4 py-2"
                >
                  {t('header.nav.become_courier')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;