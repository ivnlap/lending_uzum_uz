import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin } from 'lucide-react';
import { openCourierForm, openLegalTerms } from '../../utils/utm';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img 
                src="/images/uzum-tezkor-logo-purple.png" 
                alt="Uzum Tezkor"
                className="h-12 w-auto"
                onError={(e) => {
                  // Fallback to old logo if image not found
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="flex items-center gap-2">
                        <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                          <span class="text-primary-600 font-bold text-lg">U</span>
                        </div>
                        <span class="text-2xl font-bold">Uzum Tezkor</span>
                      </div>
                    `;
                  }
                }}
              />
            </div>
            <p className="text-primary-100 mb-6">
              Быстрая доставка по всему Узбекистану. Присоединяйтесь к команде курьеров!
            </p>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-6">Контакты</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-200 flex-shrink-0 mt-0.5" />
                <p className="text-primary-100 text-sm">
                  {t('footer.address')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-200 flex-shrink-0" />
                <a 
                  href={`tel:${t('footer.phone')}`}
                  className="text-primary-100 hover:text-white transition-colors"
                >
                  {t('footer.phone')}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-200 flex-shrink-0" />
                <a 
                  href={`mailto:${t('footer.email')}`}
                  className="text-primary-100 hover:text-white transition-colors"
                >
                  {t('footer.email')}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-6">Быстрые ссылки</h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  const element = document.getElementById('benefits');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block text-primary-100 hover:text-white transition-colors text-left"
              >
                {t('header.nav.benefits')}
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('calculator');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block text-primary-100 hover:text-white transition-colors text-left"
              >
                {t('header.nav.calculator')}
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('referral');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block text-primary-100 hover:text-white transition-colors text-left"
              >
                {t('header.nav.referral')}
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('reviews');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block text-primary-100 hover:text-white transition-colors text-left"
              >
                {t('header.nav.reviews')}
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('faq');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block text-primary-100 hover:text-white transition-colors text-left"
              >
                {t('header.nav.faq')}
              </button>
              <button
                onClick={() => openCourierForm('footer')}
                className="block text-primary-100 hover:text-white transition-colors text-left"
              >
                {t('header.nav.become_courier')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-500 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-200 text-sm">
              © 2025 Uzum. Все права защищены
            </p>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => openLegalTerms('footer')}
                className="text-primary-200 hover:text-white text-sm transition-colors"
              >
                Пользовательское соглашение
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;