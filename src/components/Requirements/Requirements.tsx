import { useTranslation } from 'react-i18next';
import { User, Smartphone } from 'lucide-react';

const Requirements = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h1 className="font-bold text-[#1E1E1E] text-center text-[32px] sm:text-[40px] lg:text-[50px]">
            {t('requirements.title')}
          </h1>
        </div>

        {/* Requirements Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Age Requirement */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-[24px] sm:text-[28px] lg:text-[36px]">
                {t('requirements.age.title')}
              </h3>
            </div>
            <p className="text-gray-600 text-[16px] sm:text-[18px] lg:text-[20px]">
              {t('requirements.age.description')}
            </p>
          </div>

          {/* Smartphone Requirement */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <Smartphone className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-[24px] sm:text-[28px] lg:text-[36px]">
                {t('requirements.smartphone.title')}
              </h3>
            </div>
            <p className="text-gray-600 text-[16px] sm:text-[18px] lg:text-[20px]">
              {t('requirements.smartphone.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Requirements;