import { useTranslation } from 'react-i18next';
import { openCourierForm } from '../../utils/utm';

const HowToStart = () => {
  const { t } = useTranslation();

  const handleCTAClick = () => {
    openCourierForm('howToStart');
  };

  return (
    <section className="bg-gray-50" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('how_to_start.title')}
          </h2>
        </div>

        {/* Custom Grid Layout */}
        <div className="space-y-6">
          {/* First Row: 70% / 30% split */}
          <div className="grid lg:grid-cols-10 gap-6 items-stretch">
            {/* Card 01 - Fill Form (70% width) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 lg:p-12 relative overflow-hidden h-full flex flex-col min-h-[280px] hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-2">
              <div className="absolute top-6 left-6 text-gray-400 font-bold text-lg">01</div>
              <div className="mt-8 flex-grow">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('how_to_start.form_title').split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </h3>
              </div>
              <div className="absolute bottom-6 left-6 right-6 lg:right-auto lg:w-auto">
                <button
                  onClick={handleCTAClick}
                  className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors duration-200 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl w-full lg:w-auto"
                >
                  {t('how_to_start.form_button')}
                </button>
              </div>
              {/* Background decoration */}
              <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-center justify-center hidden lg:flex">
                <img src="/images/Vector.png" alt="Background decoration" className="w-full h-full object-contain" />
              </div>
              {/* Courier image */}
              <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-center justify-center hidden lg:flex">
                <img src="/images/24052023_UZUM30253.png" alt="Courier" className="w-full h-full object-contain object-right" />
              </div>
            </div>

            {/* Card 02 - Call Support (30% width) */}
            <div className="lg:col-span-3 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden h-full flex flex-col min-h-[280px] hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-2">
              <div className="absolute top-6 left-6 text-white/70 font-bold text-lg">02</div>
              <div className="mt-8 flex-grow">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  {t('how_to_start.chat_title')}
                </h3>
              </div>
              {/* Background decoration */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <img src="/images/Vector.png" alt="Background decoration" className="h-full w-auto object-contain" />
              </div>
            </div>
          </div>

          {/* Second Row: 30% / 70% split */}
          <div className="grid lg:grid-cols-10 gap-6 items-stretch">
            {/* Card 03 - Training (30% width) */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-8 lg:p-12 relative overflow-hidden h-full flex flex-col min-h-[280px] hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-2">
              <div className="absolute top-6 left-6 text-gray-400 font-bold text-lg">03</div>
              <div className="mt-8 flex-grow">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t('how_to_start.steps.0.title').split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </h3>
              </div>
              {/* Design element */}
              <div className="absolute right-0 bottom-0 w-full flex items-end justify-end">
                <img src="/images/Group1597880532.png" alt="Design element" className="w-[200%] h-auto object-contain opacity-30" />
              </div>
            </div>

            {/* Card 04 - Start Working (70% width) */}
            <div className="lg:col-span-7 bg-gradient-to-br from-primary-500 to-primary-700 lg:bg-white rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden h-full flex flex-col min-h-[280px] hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-2">
              <div className="absolute top-6 left-6 text-white/70 font-bold text-lg">04</div>
              <div className="mt-8 flex-grow relative z-10">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  {t('how_to_start.steps.1.title').split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </h3>
              </div>
              {/* Phone/app mockup */}
              <div className="absolute right-0 bottom-0 top-0 w-full hidden lg:block">
                <img src="/images/Group 1077238610.png" alt="Phone app mockup" className="h-full w-auto object-contain ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToStart;