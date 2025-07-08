import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, PhoneCall, Star, Globe, ShieldCheck, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  website?: string;
  email: string;
  phone: string;
  verified: boolean;
  created_at?: string;
}

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
  const [testimonialList, setTestimonialList] = useState<Testimonial[]>([]);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([0]);
  const [screen, setScreen] = useState<"sm" | "md" | "lg">("sm");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Detect screen size
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

  // Auto-slider
  useEffect(() => {
    if (testimonialList.length <= 1) return;
    const interval = setInterval(() => {
      setVisibleIndexes((prev) => {
        if (screen === "lg") return [0, 1, 2];
        if (screen === "md") {
          const next = (prev[0] + 1) % testimonialList.length;
          const second = (next + 1) % testimonialList.length;
          return [next, second];
        }
        return [(prev[0] + 1) % testimonialList.length];
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [screen, testimonialList]);

  // Load testimonials
  useEffect(() => {
  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      setLoading(false);
    } else {
      setTestimonialList(data || []);
      // Keep spinner for 2 seconds after fetch
      setTimeout(() => setLoading(false), 2000);
    }
  };  

    fetchTestimonials();
  }, []);

  // Handle submission (Supabase + Formspree)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newTestimonial: Testimonial = {
      id: uuidv4(),
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      company: formData.get("company") as string,
      content: formData.get("content") as string,
      rating: parseInt(formData.get("rating") as string),
      website: formData.get("website") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      verified: false,
    };

    // Insert into Supabase
    const { error: supabaseError } = await supabase.from("testimonials").insert([newTestimonial]);

    if (supabaseError) {
      alert("Submission failed. Please try again.");
      console.error(supabaseError);
      return;
    }

    // Submit to Formspree
    try {
      const formspreeResponse = await fetch("https://formspree.io/f/xblyvzon", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!formspreeResponse.ok) {
        console.warn("Formspree submission failed.");
      }
    } catch (err) {
      console.warn("Error sending to Formspree:", err);
    }

    alert("Thank you! Your testimonial is pending verification.");
    form.reset();
    setIsModalOpen(false);
  };

  return (
    <section id="testimonials" className="py-20 px-4 bg-slate-900">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-purple-400 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Real people, real results, real success stories. Hear from those who’ve worked with us.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="lg:w-[20%] md:w-[40%] w-full m-4 py-2 bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-600 duration-500 hover:from-purple-700 hover:to-purple-400 hover:text-black text-white rounded font-medium transition"
          >
            Open Testimonial Form
          </button>
        </div>

        {/* Loading spinner */}
        {loading ? (
          <div className="flex justify-center items-center my-20">
            <div
              className="w-16 h-16 rounded-full border-4 border-t-transparent border-purple-400 border-r-purple-500 border-b-cyan-600 border-l-purple-500 animate-spin"
              aria-label="Loading testimonials"
              role="status"
            />
          </div>
        ) : (
          // Testimonials
          <div className="relative flex justify-center flex-wrap gap-8">
            {testimonialList.map((t, i) => (
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
                      {t.verified && (
                        <span className="ml-2 text-xs bg-green-600 text-white px-2 py-0.5 rounded flex items-center gap-1">
                          <ShieldCheck size={12} /> Verified
                        </span>
                      )}
                    </div>
                    <blockquote className="text-slate-300 mb-6 leading-relaxed flex-grow">
                      “{t.content}”
                    </blockquote>
                    <div className="border-t border-slate-700/50 pt-4">
                      <div className="text-center md:text-left mb-3">
                        <h4 className="font-semibold text-white text-lg">{t.name}</h4>
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
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4">
            <div className="bg-slate-800 rounded-xl shadow-lg max-w-xl w-full p-6 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-semibold text-white mb-4 text-center">
                Submit Your Testimonial
              </h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  name="name"
                  required
                  className="w-full p-2 rounded bg-slate-700 text-white"
                  placeholder="Your Name"
                />
                <input
                  name="role"
                  required
                  className="w-full p-2 rounded bg-slate-700 text-white"
                  placeholder="Your Role"
                />
                <input
                  name="company"
                  className="w-full p-2 rounded bg-slate-700 text-white"
                  placeholder="Company"
                />
                <textarea
                  name="content"
                  required
                  rows={4}
                  className="w-full p-2 rounded bg-slate-700 text-white"
                  placeholder="Your Testimonial"
                />
                <input
                  name="rating"
                  type="number"
                  min={1}
                  max={5}
                  required
                  className="w-full p-2 rounded bg-slate-700 text-white"
                  placeholder="Rating (1-5)"
                />
                <input
                  name="website"
                  className="w-full p-2 rounded bg-slate-700 text-white"
                  placeholder="Website (optional)"
                />
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full p-2 rounded bg-slate-700 text-white"
                  placeholder="Email"
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  className="w-full p-2 rounded bg-slate-700 text-white"
                  placeholder="Phone"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-600 duration-500 hover:from-purple-700 hover:to-purple-400 hover:text-black text-white rounded font-medium transition"
                >
                  Submit Testimonial
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
