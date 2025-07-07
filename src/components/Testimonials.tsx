import { useState, useLayoutEffect, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Mail, PhoneCall, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  email: string;
  phone: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marcus Silva",
    role: "Gym Owner",
    company: "Silva Fitness",
    content:
      "SiteCrafters transformed our gym's online presence completely. The new website with class scheduling and membership management has streamlined our operations and increased member engagement by 150%.",
    rating: 5,
    email: "marcus@silvafitness.com",
    phone: "+1 555-123-4567",
  },
  {
    id: 2,
    name: "David Chen",
    role: "CEO",
    company: "Web Wizards Agency",
    content:
      "Working with SiteCrafters was a game-changer for our agency. Their modern web design and SEO optimization helped us attract 300% more qualified leads and establish ourselves as industry leaders.",
    rating: 4.5,
    email: "david@webwizards.com",
    phone: "+1 555-987-6543",
  },
  {
    id: 3,
    name: "Sarah Martinez",
    role: "Operations Manager",
    company: "Luxe Drive",
    content:
      "The conversion-focused landing page SiteCrafters built for our car rental service exceeded all expectations. Online bookings increased by 250% within the first month of launch.",
    rating: 5,
    email: "sarah@luxedrive.com",
    phone: "+1 555-555-7890",
  },
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

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

  useLayoutEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, [updateSlidesPerView]);

  const totalSlides = Math.ceil(testimonials.length / slidesPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? totalSlides - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, [slidesPerView, testimonials.length]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-[2px] relative">
        {[1, 2, 3, 4, 5].map((i) => {
          const isFull = rating >= i;
          const isHalf = !isFull && rating >= i - 0.5;
          if (isFull) {
            return <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />;
          } else if (isHalf) {
            return (
              <div key={i} className="relative w-4 h-4">
                <Star className="text-slate-600 absolute top-0 left-0 w-4 h-4" />
                <div className="absolute top-0 left-0 w-2 h-4 overflow-hidden">
                  <Star className="text-yellow-400 fill-yellow-400 w-4 h-4" />
                </div>
              </div>
            );
          } else {
            return <Star key={i} className="w-4 h-4 text-slate-600" />;
          }
        })}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-20 px-4 bg-slate-800/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-purple-400 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Real people, real results, real success stories. See how we've transformed businesses across industries.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto h-full min-h-[400px]">
          {[...Array(totalSlides)].map((_, slideIndex) => {
            const groupStart = slideIndex * slidesPerView;
            const group = testimonials.slice(groupStart, groupStart + slidesPerView);

            return (
              <div
                key={slideIndex}
                className={`absolute inset-0 flex transition-opacity duration-700 ease-in-out ${
                  slideIndex === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {group.map((testimonial) => (
                  <div key={testimonial.id} style={{ width: `${100 / slidesPerView}%` }} className="px-4">
                    <Card className="bg-slate-700/30 border border-slate-600/20 h-full hover:-translate-y-1 transition-all duration-500 group">
                      <CardContent className="p-6 h-full flex flex-col">
                        {/* Star Rating */}
                        <div className="flex items-center mb-4">
                          {renderStars(testimonial.rating)}
                          <span className="ml-2 text-slate-300 text-sm">({testimonial.rating.toFixed(1)})</span>
                        </div>

                        {/* Testimonial Content */}
                        <blockquote className="text-slate-300 mb-6 leading-relaxed flex-grow">
                          "{testimonial.content}"
                        </blockquote>

                        {/* Client Info */}
                        <div className="border-t border-slate-600/20 pt-4">
                          <div className="text-center md:text-left mb-3">
                            <h4 className="font-semibold text-white text-lg">{testimonial.name}</h4>
                            <p className="text-slate-400 text-sm">
                              {testimonial.role}, {testimonial.company}
                            </p>
                          </div>
                          <div className="text-slate-400 text-sm space-y-1">
                            <p>
                              <Mail className="inline-block w-4 h-4 mr-2" />
                              <a
                                href={`mailto:${testimonial.email}`}
                                className="text-slate-300 hover:text-cyan-500 hover:underline duration-700"
                              >
                                {testimonial.email}
                              </a>
                            </p>
                            <p>
                              <PhoneCall className="inline-block w-4 h-4 mr-2" />
                              <a
                                href={`tel:${testimonial.phone}`}
                                className="text-slate-300 hover:text-cyan-500 hover:underline duration-700"
                              >
                                {testimonial.phone}
                              </a>
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {totalSlides > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button
              onClick={prevSlide}
              size="icon"
              className="bg-slate-700/30 border border-slate-600/20 text-white hover:bg-gradient-to-r hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              onClick={nextSlide}
              size="icon"
              className="bg-slate-700/30 border border-slate-600/20 text-white hover:bg-gradient-to-r hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 hover:scale-110"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
