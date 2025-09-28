import { useTranslation } from 'react-i18next';
import { Users } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { openReferralProgram } from '../../utils/utm';

const Referral = () => {
  const { t } = useTranslation();
  const [ref, isInView] = useInView();

  const handleReferralClick = () => {
    openReferralProgram('referral');
  };

  return (
    <section id="referral" ref={ref} className="bg-gradient-to-br from-primary-500 to-primary-700 py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-white rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-8 left-8">
                <Users className="w-32 h-32 text-primary-500" />
              </div>
              <div className="absolute bottom-8 right-8 rotate-12">
                <Users className="w-24 h-24 text-primary-500" />
              </div>
              <div className="absolute top-1/2 right-16 -rotate-12">
                <Users className="w-16 h-16 text-primary-500" />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto">
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {t('referral.title')}
              </h2>

              {/* Description */}
              <p className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed">
                {t('referral.description')}
              </p>

              {/* Reward Amount */}
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-6 mb-8">
                <p className="text-base lg:text-lg text-gray-700 mb-2">
                  {t('referral.reward_text')}
                </p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-600">
                  <span className="hidden lg:inline">
                    {t('referral.reward_amount').replace(/\n/g, ' ')}
                  </span>
                  <span className="lg:hidden">
                    {t('referral.reward_amount').split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </span>
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleReferralClick}
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-4 px-8 lg:px-12 rounded-xl text-lg lg:text-xl transition-all duration-200 inline-flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Users className="w-6 h-6" />
                {t('referral.cta_button')}
              </button>

              {/* Additional info */}
              <p className="text-sm text-gray-500 mt-4 max-w-2xl mx-auto">
                {t('referral.terms')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Referral;