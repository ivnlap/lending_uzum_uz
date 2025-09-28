import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

const Benefits = () => {
  const { t } = useTranslation();
  const [titleRef, isTitleInView] = useInView();
  const [gridRef, isGridInView] = useInView();
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalCards = 6;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalCards);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const renderCard = (index: number, isCarousel = false) => {
    const cardClasses = `bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 ${
      isCarousel ? 'flex-shrink-0 w-full' : 'flex items-start justify-between w-full h-full'
    } ${!isCarousel ? (isGridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8') : ''}`;

    const cards = [
      // Card 1 - Free schedule
      {
        title: t('benefits.items.0.title'),
        description: t('benefits.items.0.description'),
        icon: '/images/clock-icon.png',
        iconFallback: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12,6 12,12 16,14"></polyline>
        </svg>`,
        layout: 'standard'
      },
      // Card 2 - Stable income
      {
        title: t('benefits.items.1.title'),
        description: t('benefits.items.1.description'),
        icon: '/images/coins-icon.png',
        iconFallback: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="8" cy="8" r="6"></circle>
          <path d="M18.09 10.37A6 6 0 1 1 10.37 18.09"></path>
        </svg>`,
        layout: 'standard'
      },
      // Card 3 - Average income (blue bg)
      {
        title: t('benefits.items.2.title'),
        description: t('benefits.items.2.description'),
        icon: '/images/Vector123.png',
        bgImage: '/images/Vector22.png',
        layout: 'blue',
        bgColor: 'bg-gradient-to-br from-[#00C4F0] to-[#5DCCFC]'
      },
      // Card 4 - Training and support
      {
        title: t('benefits.items.3.title'),
        description: t('benefits.items.3.description'),
        icon: '/images/support-icon.png',
        iconFallback: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <path d="M8 9h8"></path><path d="M8 13h6"></path>
        </svg>`,
        layout: 'standard'
      },
      // Card 5 - Couriers image
      {
        title: t('benefits.items.4.title'),
        description: t('benefits.items.4.description'),
        icon: '/images/couriers-team.png',
        layout: 'image'
      },
      // Card 6 - You earn more if
      {
        title: t('benefits.items.5.title'),
        description: t('benefits.items.5.description'),
        layout: 'multipliers',
        multipliers: (t('benefits.items.5.multipliers', { returnObjects: true }) as string[]) || [],
        bgColor: 'bg-gradient-to-br from-[#00C4F0] to-[#5DCCFC]',
        bgImage: '/images/Vector22.png'
      }
    ];

    const card = cards[index];
    if (!card) return null;

    if (card.layout === 'blue') {
      const blueCardClasses = `bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 ${
        isCarousel ? 'flex-shrink-0 w-full' : 'w-full h-full'
      } ${!isCarousel ? (isGridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8') : ''}`;

      return (
        <div key={index} className={`${blueCardClasses} ${card.bgColor} text-white relative overflow-hidden`}
             style={{ transitionDelay: `${index * 150}ms` }}>
          {card.bgImage && (
            <div className="absolute bottom-0 -right-8 opacity-60">
              <img src={card.bgImage} alt="Background pattern" className="w-auto h-full object-contain" />
            </div>
          )}
          <div className="relative flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold mb-3 text-[20px] sm:text-[24px] lg:text-[29px]" style={{ lineHeight: '1.1' }}>
                {card.title.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </h3>
              <div className="space-y-0">
                {card.description.split('\n').map((line, i) => (
                  <div key={i} className="font-normal text-[14px] sm:text-[16px] lg:text-[17px]">{line}</div>
                ))}
              </div>
            </div>
            {card.icon && (
              <div className="ml-4 flex items-center justify-end flex-shrink-0">
                <img src={card.icon} alt="Icon" className="w-[152px] h-[126px]" />
              </div>
            )}
          </div>
        </div>
      );
    }

    if (card.layout === 'image') {
      return (
        <div key={index} className={`${cardClasses} relative overflow-hidden min-h-[200px]`}
             style={{ transitionDelay: `${index * 150}ms` }}>
          <div className="absolute inset-0">
            <img src={card.icon} alt="Курьеры Uzum Tezkor" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      );
    }

    if (card.layout === 'multipliers') {
      const multipliersCardClasses = `bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 ${
        isCarousel ? 'flex-shrink-0 w-full' : 'w-full h-full'
      } ${!isCarousel ? (isGridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8') : ''}`;

      return (
        <div key={index} className={multipliersCardClasses} style={{ transitionDelay: `${index * 150}ms` }}>
          <div className={isCarousel ? 'p-4' : ''}>
            <h3 className="font-bold text-gray-900 mb-4 text-[20px] sm:text-[24px] lg:text-[29px]" style={{ lineHeight: '1.1' }}>{card.title}</h3>
            <div className="flex flex-col items-end space-y-3">
              {card.multipliers?.map((multiplier: string, i: number) => (
                <div key={i} className="bg-[#00C4F0] text-white px-4 py-3 rounded-2xl max-w-[80%] ml-auto text-[14px] sm:text-[16px] lg:text-[17px]">
                  {multiplier}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Standard layout
    return (
      <div key={index} className={cardClasses} style={{ transitionDelay: `${index * 150}ms` }}>
        {isCarousel ? (
          <div className="p-4 flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2 text-[20px] sm:text-[24px] lg:text-[29px]" style={{ lineHeight: '1.1' }}>
                {card.title.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </h3>
              <p className="text-black font-normal text-[14px] sm:text-[16px] lg:text-[17px]">
                {card.description.split('\n').map((line, i) => (
                  <span key={i}>{line}{i < card.description.split('\n').length - 1 && <br />}</span>
                ))}
              </p>
            </div>
            {card.icon && (
              <div className={`ml-4 flex-shrink-0 ${card.title.includes('поддержка') ? 'self-start' : ''}`} style={card.title.includes('поддержка') ? { marginRight: '7px' } : {}}>
                <img 
                  src={card.icon} 
                  alt="Icon" 
                  className={card.title.includes('поддержка') ? "w-[72px] h-[72px]" : "w-[50px] h-[50px]"}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && card.iconFallback) {
                      const size = card.title.includes('поддержка') ? 'w-[72px] h-[72px]' : 'w-[50px] h-[50px]';
                      parent.innerHTML = `
                        <div class="${size} bg-[#00C4F0] rounded-full flex items-center justify-center">
                          ${card.iconFallback}
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2 text-[20px] sm:text-[24px] lg:text-[29px]" style={{ lineHeight: '1.1' }}>
                {card.title.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </h3>
              <p className="text-black font-normal text-[14px] sm:text-[16px] lg:text-[17px]">
                {card.description.split('\n').map((line, i) => (
                  <span key={i}>{line}{i < card.description.split('\n').length - 1 && <br />}</span>
                ))}
              </p>
            </div>
            {card.icon && (
              <div className={`ml-4 flex-shrink-0 ${card.title.includes('поддержка') ? 'self-start' : ''}`} style={card.title.includes('поддержка') ? { marginRight: '7px' } : {}}>
                <img 
                  src={card.icon} 
                  alt="Icon" 
                  className={card.title.includes('поддержка') ? "w-[72px] h-[72px]" : "w-[50px] h-[50px]"}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && card.iconFallback) {
                      const size = card.title.includes('поддержка') ? 'w-[72px] h-[72px]' : 'w-[50px] h-[50px]';
                      parent.innerHTML = `
                        <div class="${size} bg-[#00C4F0] rounded-full flex items-center justify-center">
                          ${card.iconFallback}
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <section id="benefits" className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className={`transition-all duration-1000 ${
          isTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ marginBottom: '50px' }}>
          <h1 className="font-bold text-[#1E1E1E] text-center text-[32px] sm:text-[40px] lg:text-[50px]">
            {t('benefits.title')}
          </h1>
        </div>

        {/* Benefits Grid - Desktop */}
        <div ref={gridRef} className="hidden md:block">
          {/* First row - 2 equal columns */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {Array.from({ length: 2 }, (_, index) => renderCard(index, false))}
          </div>
          
          {/* Second row - custom layout */}
          <div className="grid md:grid-cols-5 gap-4 mb-4 items-stretch">
            {/* Blue card - takes 2/5 of width */}
            <div className="md:col-span-2 flex">
              {renderCard(2, false)}
            </div>
            {/* Support card - takes 3/5 of width */}
            <div className="md:col-span-3 flex">
              {renderCard(3, false)}
            </div>
          </div>
          
          {/* Third row - custom layout */}
          <div className="flex gap-4 items-stretch">
            {/* Couriers image - takes 35% of width */}
            <div style={{ width: '35%' }}>
              {renderCard(4, false)}
            </div>
            {/* Multipliers card - takes 65% of width */}
            <div style={{ width: '65%' }}>
              {renderCard(5, false)}
            </div>
          </div>
        </div>

        {/* Benefits Carousel - Mobile */}
        <div className="md:hidden">
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalCards }, (_, index) => renderCard(index, true))}
              </div>
            </div>
            
            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center z-10"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center z-10"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalCards }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;