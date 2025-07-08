import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, PhoneCall, Star, Globe, ShieldCheck } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  website: string;
  email: string;
  phone: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "~Ismail Munyentwari",
    role: "CEO & Founder",
    company: "DreamizeAfrica",
    content:
      "SiteCrafters is led by a talented team I had the privilege to teach. Their professionalism, attention to detail, and passion for quality work consistently impressed me. With their strong technical skills and ability to learn fast, they’re well-equipped to thrive in the web development industry and deliver real value to clients.",
    rating: 5,
    website: "https://dreamizeafrica.com",
    email: "ismailmunyentwari9@gmail.com",
    phone: "+250 785 837 748",
  },
];

// Render star rating with support for half-star
const renderStars = (rating: number) => (
  <div className="flex space-x-[2px]">
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

const Testimonials = () => {
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([0]);
  const [screen, setScreen] = useState<"sm" | "md" | "lg">("sm");

  // Update screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setScreen("lg");
      else if (width >= 768) setScreen("md");
      else setScreen("sm");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto transition logic (disabled for 1 testimonial)
  useEffect(() => {
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setVisibleIndexes((prev) => {
        if (screen === "lg") return [0, 1, 2];
        if (screen === "md") {
          const next = (prev[0] + 1) % testimonials.length;
          const second = (next + 1) % testimonials.length;
          return [next, second];
        }
        if (screen === "sm") {
          return [(prev[0] + 1) % testimonials.length];
        }
        return prev;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [screen]);

  return (
    <section id="testimonials" className="py-20 px-4 bg-slate-900">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-purple-400 bg-clip-text text-transparent">
              Mentor Has to Say
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Real people, real results, real success story. Hear from our satisfied mentor about his experience with the SiteCrafters Team.
          </p>
        </div>

        {/* Testimonial Card(s) */}
        <div className="relative flex justify-center">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`w-full max-w-xl transition-all duration-1000 ease-in-out transform ${
                visibleIndexes.includes(i)
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-95 pointer-events-none absolute z-0"
              }`}
              style={{ transitionProperty: "opacity, transform" }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 hover:-translate-y-2 transition-transform duration-300 group">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    {renderStars(t.rating)}
                    <span className="ml-2 text-slate-400 text-sm italic">
                      Based on 1 verified review
                    </span>
                  </div>
                  <blockquote className="text-slate-300 mb-6 leading-relaxed flex-grow">
                    “{t.content}”
                  </blockquote>
                  <div className="border-t border-slate-700/50 pt-4">
                    <div className="text-center md:text-left mb-3">
                      <h4 className="font-semibold text-white text-lg flex items-center justify-center md:justify-start">
                        {t.name}
                        <span className="ml-2 text-xs bg-green-600 text-white px-2 py-0.5 rounded flex items-center gap-1">
                          <ShieldCheck size={12} /> Verified
                        </span>
                      </h4>
                      <p className="text-slate-400 text-sm">
                        {t.role}, {t.company}
                      </p>
                    </div>
                    <div className="text-slate-400 text-sm space-y-1">
                      {t.website && (
                        <p>
                          <Globe className="inline-block w-4 h-4 mr-2" />
                          <a
                            href={t.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-300 hover:text-cyan-500 hover:underline duration-700"
                          >
                            {t.website}
                          </a>
                        </p>
                      )}
                      <p>
                        <Mail className="inline-block w-4 h-4 mr-2" />
                        <a
                          href={`mailto:${t.email}`}
                          className="text-slate-300 hover:text-cyan-500 hover:underline duration-700"
                        >
                          {t.email}
                        </a>
                      </p>
                      <p>
                        <PhoneCall className="inline-block w-4 h-4 mr-2" />
                        <a
                          href={`tel:${t.phone}`}
                          className="text-slate-300 hover:text-cyan-500 hover:underline duration-700"
                        >
                          {t.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
