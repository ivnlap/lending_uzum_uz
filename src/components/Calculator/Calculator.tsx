import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Car, Bike, Footprints, Zap, ChevronDown } from 'lucide-react';

const Calculator = () => {
  const { t } = useTranslation();
  
  const [selectedCity, setSelectedCity] = useState('tashkent');
  const [selectedTransport, setSelectedTransport] = useState('auto');
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [daysPerMonth, setDaysPerMonth] = useState(25);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Base rate: 40,000 sum per hour for auto in Tashkent
  const baseHourlyRate = 40000;
  
  const cityRates = {
    tashkent: 1,
    samarkand: 0.75, // 30000 / 40000 = 0.75
    fergana: 1,
    bukhara: 1,
    andijan: 1,
    navoi: 1,
    namangan: 1,
    kokand: 1,
    karshi: 1,
    urgench: 1,
    nukus: 1,
    chirchik: 1
  };

  const transportMultipliers = {
    auto: 1,
    moto: 0.925, // 37000 / 40000 = 0.925
    bike: 0.675, // 27000 / 40000 = 0.675
    ebike: 0.825, // 33000 / 40000 = 0.825
    walk: 0.375 // 15000 / 40000 = 0.375
  };

  const calculateIncome = () => {
    const cityRate = cityRates[selectedCity as keyof typeof cityRates] || 1;
    let transportMultiplier = transportMultipliers[selectedTransport as keyof typeof transportMultipliers] || 1;
    
    // Special rates for Samarkand
    if (selectedCity === 'samarkand') {
      const samarkandRates = {
        auto: 30000,
        moto: 29000,
        ebike: 19000,
        bike: 16000,
        walk: 8000
      };
      const rate = samarkandRates[selectedTransport as keyof typeof samarkandRates] || 30000;
      return Math.round(rate * hoursPerDay * daysPerMonth);
    }
    
    // Special rates for Chirchik
    if (selectedCity === 'chirchik') {
      const chirchikRates = {
        auto: 25000,
        moto: 31000,
        ebike: 19000,
        bike: 15000,
        walk: 8000
      };
      const rate = chirchikRates[selectedTransport as keyof typeof chirchikRates] || 25000;
      return Math.round(rate * hoursPerDay * daysPerMonth);
    }
    
    // Special rates for Fergana, Bukhara, Andijan, Navoi, Namangan, Kokand, Karshi, Urgench, Nukus
    const standardSecondaryRateCities = ['fergana', 'bukhara', 'andijan', 'navoi', 'namangan', 'kokand', 'karshi', 'urgench', 'nukus'];
    if (standardSecondaryRateCities.includes(selectedCity)) {
      const secondaryRates = {
        auto: 19000,
        moto: 24000,
        ebike: 19000,
        bike: 15000,
        walk: 8000
      };
      const rate = secondaryRates[selectedTransport as keyof typeof secondaryRates] || 19000;
      return Math.round(rate * hoursPerDay * daysPerMonth);
    }
    
    return Math.round(baseHourlyRate * cityRate * transportMultiplier * hoursPerDay * daysPerMonth);
  };

  // Custom motorcycle SVG component with rider
  const MotorcycleIcon = ({ className }: { className?: string }) => (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {/* Helmet */}
      <path d="M8 6.5c0-1.5 1.3-2.5 2.8-2.5h1.4c1.5 0 2.8 1 2.8 2.5v1c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5V8H8V6.5z"/>
      {/* Visor */}
      <path d="M9.5 5.5h3c.6 0 1 .4 1 1v.5h-5V6.5c0-.6.4-1 1-1z"/>
      
      {/* Rider body */}
      <path d="M7.5 8.5c0-.8.7-1.5 1.5-1.5h4c.8 0 1.5.7 1.5 1.5v2.5c0 .8-.7 1.5-1.5 1.5H9c-.8 0-1.5-.7-1.5-1.5V8.5z"/>
      
      {/* Arms */}
      <path d="M7.5 9.5L6 10.5"/>
      <path d="M14.5 9.5L16 10.5"/>
      
      {/* Motorcycle body/tank */}
      <path d="M5 12h12c1 0 1.8.8 1.8 1.8v1.4c0 1-.8 1.8-1.8 1.8H5c-1 0-1.8-.8-1.8-1.8v-1.4c0-1 .8-1.8 1.8-1.8z"/>
      
      {/* Front wheel */}
      <circle cx="5" cy="18" r="2.5"/>
      <circle cx="5" cy="18" r="1"/>
      
      {/* Back wheel */}
      <circle cx="17" cy="18" r="2.5"/>
      <circle cx="17" cy="18" r="1"/>
      
      {/* Handlebars */}
      <path d="M6 10.5h8"/>
      <path d="M6 10.5v1"/>
      <path d="M14 10.5v1"/>
    </svg>
  );

  const transportIcons = {
    auto: Car,
    moto: MotorcycleIcon,
    bike: Bike,
    ebike: Zap,
    walk: Footprints
  };

  const cities = [
    'tashkent', 'samarkand', 'fergana', 'bukhara', 'andijan', 'navoi',
    'namangan', 'kokand', 'karshi', 'urgench', 'nukus', 'chirchik'
  ];

  const transportOptions = ['auto', 'moto', 'ebike', 'bike', 'walk'];

  return (
    <section id="calculator" className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h1 className="font-bold text-[#1E1E1E] text-center text-[32px] sm:text-[40px] lg:text-[50px]">
            {t('calculator.title')}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            {t('calculator.description')}
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
          <div className="space-y-8">
            {/* City Selection */}
            <div className="relative">
              <label className="block font-semibold text-gray-900 mb-4 text-[18px] sm:text-[20px] lg:text-[24px]">
                {t('calculator.city')}
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 bg-white text-gray-900 font-medium text-lg shadow-sm hover:border-primary-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all duration-200 cursor-pointer text-left flex items-center justify-between"
                >
                  <span>{t(`calculator.cities.${selectedCity}`)}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-lg z-50 max-h-60 overflow-y-auto">
                    {cities.map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          setSelectedCity(city);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-6 py-3 text-left text-lg font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors duration-150 first:rounded-t-2xl last:rounded-b-2xl ${
                          selectedCity === city ? 'bg-primary-50 text-primary-600' : 'text-gray-900'
                        }`}
                      >
                        {t(`calculator.cities.${city}`)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Transport Selection */}
            <div>
              <label className="block font-semibold text-gray-900 mb-4 text-[18px] sm:text-[20px] lg:text-[24px]">
                {t('calculator.transport')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {transportOptions.map((transport) => {
                  const IconComponent = transportIcons[transport as keyof typeof transportIcons];
                  const isSelected = selectedTransport === transport;
                  return (
                    <button
                      key={transport}
                      onClick={() => setSelectedTransport(transport)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                        isSelected
                          ? 'border-primary-500 bg-primary-50 text-primary-600'
                          : 'border-gray-300 bg-white text-gray-600 hover:border-primary-300 hover:bg-primary-25'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                      <span className="text-sm font-medium">
                        {t(`calculator.transport_options.${transport}`)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hours Slider */}
            <div>
              <label className="block font-semibold text-gray-900 mb-4 text-[18px] sm:text-[20px] lg:text-[24px]">
                {t('calculator.hours_label')}
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  min="3"
                  max="16"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-primary"
                  style={{ '--value': `${((hoursPerDay - 3) / (16 - 3)) * 100}%` } as React.CSSProperties}
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>3 {t('calculator.time_units.hours_few')}</span>
                  <span className="font-semibold text-primary-600 text-lg">{hoursPerDay} {t('calculator.time_units.hours')}</span>
                  <span>16 {t('calculator.time_units.hours')}</span>
                </div>
              </div>
            </div>

            {/* Days Slider */}
            <div>
              <label className="block font-semibold text-gray-900 mb-4 text-[18px] sm:text-[20px] lg:text-[24px]">
                {t('calculator.days_label')}
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={daysPerMonth}
                  onChange={(e) => setDaysPerMonth(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-primary"
                  style={{ '--value': `${((daysPerMonth - 1) / (30 - 1)) * 100}%` } as React.CSSProperties}
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>1 {t('calculator.time_units.day')}</span>
                  <span className="font-semibold text-primary-600 text-lg">{daysPerMonth} {t('calculator.time_units.days')}</span>
                  <span>30 {t('calculator.time_units.days')}</span>
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white text-center">
              <p className="mb-2 opacity-90 text-[18px] sm:text-[20px] lg:text-[24px]">{t('calculator.your_income')}</p>
              <p className="text-4xl lg:text-5xl font-bold">
                {calculateIncome().toLocaleString()} {t('calculator.currency')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for sliders */}
      <style>{`
        .slider-primary {
          -webkit-appearance: none;
          appearance: none;
          height: 12px;
          border-radius: 6px;
          background: linear-gradient(to right, #7C3AED 0%, #7C3AED var(--value), #e5e7eb var(--value), #e5e7eb 100%);
          outline: none;
        }
        
        .slider-primary::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #7C3AED;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(124, 58, 237, 0.3);
          position: relative;
          z-index: 2;
        }
        
        .slider-primary::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #7C3AED;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(124, 58, 237, 0.3);
        }
        
        .slider-primary::-moz-range-track {
          height: 12px;
          border-radius: 6px;
          background: #e5e7eb;
        }
        
        .slider-primary::-moz-range-progress {
          height: 12px;
          border-radius: 6px;
          background: #7C3AED;
        }
      `}</style>
    </section>
  );
};

export default Calculator;