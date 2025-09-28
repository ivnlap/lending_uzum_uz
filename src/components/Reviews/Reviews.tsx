import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Reviews = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const reviews = t('reviews.items', { returnObjects: true }) as any[];
  const totalSlides = reviews.length;
  const slidesToShow = isMobile ? 1 : 3;
  const maxSlide = Math.max(0, totalSlides - slidesToShow);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      if (isMobile) {
        // For mobile (1 slide at a time), use simple looping
        return (prev + 1) % totalSlides;
      } else {
        // For desktop (3 slides at a time), loop to beginning when reaching end
        return prev >= maxSlide ? 0 : prev + 1;
      }
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      if (isMobile) {
        // For mobile (1 slide at a time), use simple looping
        return (prev - 1 + totalSlides) % totalSlides;
      } else {
        // For desktop (3 slides at a time), loop to end when at beginning
        return prev <= 0 ? maxSlide : prev - 1;
      }
    });
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="reviews" className="bg-white" style={{ paddingTop: '50px', paddingBottom: '96px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
            {t('reviews.title')}
          </h2>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Desktop: Show 3 slides, Mobile: Show 1 slide */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
              }}
            >
              {reviews.map((review: any, index: number) => (
                <div
                  key={index}
                  className="w-full md:w-1/3 flex-shrink-0 px-4"
                >
                  <div
                    className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out relative overflow-hidden h-full transform hover:-translate-y-2"
                    style={{
                      backgroundImage: `url(/images/reviews/bg${index + 1}.png)`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'top left',
                    }}
                  >
                    {/* Background overlay for readability */}
                    <div className="absolute inset-0 bg-white/90 rounded-2xl"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Header with photo and name */}
                      <div className="flex items-center gap-4 mb-6">
                        {/* Reviewer Photo - 8 times bigger, in left corner */}
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary-100 flex-shrink-0">
                          <img 
                            src={`/images/reviews/photo${index + 1}.png`}
                            alt={review.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to generated avatar if image fails
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                                    <span class="text-white font-semibold text-lg">
                                      ${review.name.charAt(0)}
                                    </span>
                                  </div>
                                `;
                              }
                            }}
                          />
                        </div>
                        
                        {/* Name to the right of photo */}
                        <h4 className="font-bold text-primary-600 text-xl">
                          {review.name}
                        </h4>
                      </div>

                      {/* Review Text */}
                      <p className="text-black text-base lg:text-lg leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {isMobile ? (
              // Mobile: Show 4 dots (one for each review)
              reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                />
              ))
            ) : (
              // Desktop: Show 2 dots when 3 reviews are visible (2 groups)
              Array.from({ length: 2 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;