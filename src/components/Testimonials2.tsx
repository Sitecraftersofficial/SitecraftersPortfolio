import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Play, Pause } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  result: string;
  resultColor: "cyan" | "purple";
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marcus Silva",
    role: "Gym Owner",
    company: "Silva Fitness",
    content: "Working with SiteCrafters was a game-changer for our boutique. Their modern web design and SEO optimization helped us attract more customers and boost sales. Throughout the process, their excellent communication made collaboration smooth and effortless, helping us establish ourselves as industry leaders.",
    rating: 5,
    result: "+150% member engagement",
    resultColor: "cyan"
  },
  {
    id: 2,
    name: "David Chen",
    role: "CEO",
    company: "Web Wizards Agency",
    content: "Working with SiteCrafters was a game-changer for our boutique. Their modern web design and SEO optimization helped us attract more customers and boost sales. Throughout the process, their excellent communication made collaboration smooth and effortless, helping us establish ourselves as industry leaders.",
    rating: 5,
    result: "+300% qualified leads",
    resultColor: "purple"
  },
  {
    id: 3,
    name: "Sarah Martinez",
    role: "Operations Manager",
    company: "Luxe Drive",
    content: "Working with SiteCrafters was a game-changer for our boutique. Their modern web design and SEO optimization helped us attract more customers and boost sales. Throughout the process, their excellent communication made collaboration smooth and effortless, helping us establish ourselves as industry leaders.",
    rating: 5,
    result: "+250% online bookings",
    resultColor: "cyan"
  },
  {
    id: 4,
    name: "Amanda Foster",
    role: "Founder",
    company: "EcoStyle Boutique",
    content: "Working with SiteCrafters was a game-changer for our boutique. Their modern web design and SEO optimization helped us attract more customers and boost sales. Throughout the process, their excellent communication made collaboration smooth and effortless, helping us establish ourselves as industry leaders.",
    rating: 5,
    result: "+180% conversion rate",
    resultColor: "purple"
  },
  {
    id: 5,
    name: "Giuseppe Romano",
    role: "Head Chef",
    company: "Bella Vista Ristorante",
    content: "Working with SiteCrafters was a game-changer for our boutique. Their modern web design and SEO optimization helped us attract more customers and boost sales. Throughout the process, their excellent communication made collaboration smooth and effortless, helping us establish ourselves as industry leaders.",
    rating: 5,
    result: "+300% online reservations",
    resultColor: "cyan"
  },
  {
    id: 6,
    name: "Dr. Rachel Kim",
    role: "Principal",
    company: "Strategic Business Solutions",
    content: "Working with SiteCrafters was a game-changer for our boutique. Their modern web design and SEO optimization helped us attract more customers and boost sales. Throughout the process, their excellent communication made collaboration smooth and effortless, helping us establish ourselves as industry leaders.",
    rating: 5,
    result: "+220% client inquiries",
    resultColor: "purple"
  },
];

const Testimonials2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(1);

  // Calculate slides per view based on screen size
  const updateSlidesPerView = useCallback(() => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setSlidesPerView(3);
    } else if (width >= 768) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(1);
    }
  }, []);

  // Initialize slides per view
  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, [updateSlidesPerView]);

  // Calculate total slides for pagination
  const totalSlides = Math.ceil(testimonials.length / slidesPerView);

  // Navigation functions
  const goToSlide = useCallback((slideIndex: number) => {
    setCurrentSlide(Math.max(0, Math.min(slideIndex, totalSlides - 1)));
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev >= totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev <= 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Reset to first slide when slides per view changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [slidesPerView]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(prev => !prev);
  };

  // Calculate transform for carousel
  const translateX = -(currentSlide * (100 / slidesPerView) * slidesPerView);

  return (
    <section id="testimonials" className="py-20 px-4 bg-slate-900">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="bg-gradient-to-r from-cyan-600 to-purple-400 bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Real people, real results, real success stories. See how we've transformed businesses across industries.
          </p>
        </div>

        {/* Testimonials Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          <div 
            className="testimonials-carousel overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${translateX}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className={`flex-shrink-0 px-4 ${
                    slidesPerView === 1 ? 'w-full' : 
                    slidesPerView === 2 ? 'w-1/2' : 
                    'w-1/3'
                  }`}
                >
                  <Card className="bg-slate-800/50 border-slate-700/50 h-full hover:transform hover:-translate-y-2 transition-all duration-300 group">
                    <CardContent className="p-6 h-full flex flex-col">
                      {/* Star Rating */}
                      <div className="flex items-center mb-4">
                        <div className="flex text-yellow-400">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="ml-2 text-slate-300 text-sm">(5.0)</span>
                      </div>
                      
                      {/* Testimonial Content */}
                      <blockquote className="text-slate-300 mb-6 leading-relaxed flex-grow">
                        "{testimonial.content}"
                      </blockquote>
                      
                      {/* Client Info */}
                      <div className="border-t border-slate-700/50 pt-4">
                        <div className="text-center md:text-left mb-3">
                          <h4 className="font-semibold text-white text-lg">{testimonial.name}</h4>
                          <p className="text-slate-400 text-sm">{testimonial.role}, {testimonial.company}</p>
                        </div>
                        
                        {/* Result Metric */}
                        <div className="inline-block">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            testimonial.resultColor === 'cyan' 
                              ? 'bg-gradient-to-r from-cyan-600/20 to-purple-400/20 text-cyan-300'
                              : 'bg-gradient-to-r from-cyan-600/20 to-purple-400/20 text-purple-300'
                          }`}>
                            Result: {testimonial.result}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            {/* Previous Button */}
            <Button
              onClick={prevSlide}
              size="icon"
              className="bg-slate-800/50 border border-slate-700/50 text-white hover:bg-gradient-to-r hover:from-cyan-600 hover:to-purple-500 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {[...Array(totalSlides)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  title={`Go to testimonial slide ${index + 1}`}
                  aria-label={`Go to testimonial slide ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-cyan-600 to-purple-500'
                      : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <Button
              onClick={nextSlide}
              size="icon"
              className="bg-slate-800/50 border border-slate-700/50 text-white hover:bg-gradient-to-r hover:from-cyan-600 hover:to-purple-500 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Auto-play Control */}
          <div className="flex justify-center mt-4">
            <button
              onClick={toggleAutoPlay}
              className="text-slate-400 hover:text-white transition-colors duration-300 text-sm flex items-center"
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4 mr-2" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              <span>{isAutoPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials2