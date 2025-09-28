import { useTranslation } from 'react-i18next';
import { openCourierForm } from '../../utils/utm';

const Cities = () => {
  const { t } = useTranslation();

  const cities = [
    'tashkent', 'uzbekistan', 'samarkand',
    'fergana', 'bukhara', 'andijan', 'navoi',
    'namangan', 'kokand', 'karshi',
    'urgench', 'nukus', 'chirchik'
  ];

  const handleCityClick = (city: string) => {
    // Open the application form with city parameter
    openCourierForm('cities', { utm_content: city });
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* City Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => handleCityClick(city)}
              className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-primary-300 rounded-2xl px-6 py-4 text-center transition-all duration-200 hover:shadow-md"
            >
              <span className="text-gray-900 font-medium text-base lg:text-lg">
                {t(`cities.buttons.${city}`)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cities;