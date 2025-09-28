import { useTranslation } from 'react-i18next';
import { useInView } from '../../hooks/useInView';
import { openCourierForm } from '../../utils/utm';

const Hero = () => {
  const { t } = useTranslation();
  const [ref, isInView] = useInView();

  const handleCTAClick = () => {
    openCourierForm('hero');
  };

  return (
    <section ref={ref} className="relative bg-primary-500 text-white overflow-hidden">
      
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-8 sm:py-6 lg:py-6">
          <div className="flex flex-col lg:flex-row items-stretch min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
            {/* Left Content */}
            <div className={`lg:w-[800px] text-center lg:text-left transition-all duration-1000 flex flex-col justify-center px-4 sm:px-6 lg:px-8 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h1 className="font-semibold mb-6 text-[28px] sm:text-[36px] lg:text-[48px]" style={{ lineHeight: '100%', letterSpacing: '0px' }}>
                {t('hero.title').split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </h1>
              
              <div className="mb-8" style={{ marginTop: '30px' }}>
                <button
                  onClick={handleCTAClick}
                  className="bg-white hover:bg-gray-50 font-medium py-4 px-8 rounded-xl transition-colors duration-200 inline-flex items-center gap-2 shadow-lg hover:shadow-xl text-[18px] sm:text-[24px] lg:text-[32px]"
                  style={{ letterSpacing: '0px', color: '#7000FF' }}
                >
                  {t('hero.cta_button')}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Content - Courier Image */}
            <div className={`flex-1 flex justify-center lg:justify-end transition-all duration-1000 delay-300 relative lg:mr-0 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <div className="relative w-full h-full flex items-end justify-center lg:justify-end lg:translate-x-8" style={{ transform: 'translateY(40px)' }}>
                {/* Background shape */}
                <div className="absolute inset-0 flex items-end justify-center lg:justify-end">
                  <img 
                    src="/images/hero-bg-new.png" 
                    alt="Background shape" 
                    className="h-full w-auto object-contain object-bottom max-w-none"
                  />
                </div>
                
                {/* Courier Image */}
                <div className="relative z-10 h-full flex items-end justify-center lg:justify-end">
                  <img 
                    src="/images/courier-new.png" 
                    alt="Uzum Tezkor Courier" 
                    className="h-full w-auto object-contain object-bottom max-w-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;