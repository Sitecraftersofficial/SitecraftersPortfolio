import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, PhoneCall, Star, Globe, ShieldCheck, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  website?: string;
  email: string;
  phone: string;
  verified: boolean;
  created_at?: string;
}

interface FormInputs {
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  website?: string;
  email: string;
  phone: string;
}

const renderStars = (rating: number) => (
  <div className="flex space-x-[2px]" aria-label={`Rating: ${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((i) => {
      const isFull = rating >= i;
      const isHalf = !isFull && rating >= i - 0.5;
      if (isFull) {
        return <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />;
      } else if (isHalf) {
        return (
          <div key={i} className="relative w-5 h-5">
            <Star className="text-slate-600 absolute top-0 left-0 w-5 h-5" />
            <div className="absolute top-0 left-0 w-2.5 h-5 overflow-hidden">
              <Star className="text-yellow-400 fill-yellow-400 w-5 h-5" />
            </div>
          </div>
        );
      } else {
        return <Star key={i} className="w-5 h-5 text-slate-600" />;
      }
    })}
  </div>
);

const Testimonials = () => {
  const [testimonialList, setTestimonialList] = useState<Testimonial[]>([]);
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormInputs>();

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching testimonials:", error);
    else setTestimonialList(data || []);

    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonialList.length <= 1) return;

    const interval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % testimonialList.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [testimonialList]);

  const onSubmit = async (formData: FormInputs) => {
    const newTestimonial: Testimonial = {
      id: uuidv4(),
      ...formData,
      verified: false,
    };

    const { error } = await supabase.from("testimonials").insert([newTestimonial]);

    if (error) {
      alert("Failed to submit. Please try again.");
      console.error(error);
      return;
    }

    try {
      const formspreeData = new FormData();
      Object.entries(formData).forEach(([k, v]) => formspreeData.append(k, String(v || "")));
      await fetch("https://formspree.io/f/xblyvzon", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formspreeData,
      });
    } catch (err) {
      console.warn("Formspree submission failed:", err);
    }

    alert("Thank you! Your testimonial is pending verification.");
    reset();
    setIsModalOpen(false);
  };

  return (
    <section id="testimonials" className="py-20 px-4 bg-slate-900">
      <div className="container mx-auto max-w-6xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
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
            className="w-full sm:w-auto mt-4 px-6 py-2 bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-600 text-white hover:from-purple-700 hover:to-purple-400 hover:text-black rounded font-medium transition"
          >
            Submit Testimonial
          </button>
        </div>

        {/* Loading spinner */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-purple-400 border-r-purple-500 border-b-cyan-600 border-l-purple-500 animate-spin" />
          </div>
        ) : testimonialList.length === 0 ? (
          <p className="text-center text-slate-400">No testimonials yet.</p>
        ) : (
          <div className="relative w-full min-h-[360px]">
            {testimonialList.map((t, i) => (
              <div
                key={t.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  visibleIndex === i
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Card className="w-full max-w-full bg-slate-800/50 border-slate-700/50 overflow-hidden shadow-lg">
                  <CardContent className="p-6 sm:p-8 space-y-6 text-slate-300 break-words hyphens-auto">
                    <div className="flex items-center gap-3">
                      {renderStars(t.rating)}
                      {t.verified && (
                        <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded flex items-center gap-1">
                          <ShieldCheck size={12} /> Verified
                        </span>
                      )}
                    </div>
                    <blockquote className="leading-relaxed text-base sm:text-lg md:text-xl">
                      “{t.content}”
                    </blockquote>
                    <div className="pt-4 border-t border-slate-700/40 text-sm space-y-2">
                      <div>
                        <span className="text-white font-semibold">{t.name}</span>{" "}
                        <span className="text-slate-400"> — {t.role}{t.company && ` at ${t.company}`}</span>
                      </div>
                      {t.website && (
                        <div>
                          <Globe className="inline-block w-4 h-4 mr-1" />
                          <a
                            href={t.website}
                            className="text-cyan-400 hover:underline break-words"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t.website}
                          </a>
                        </div>
                      )}
                      <div>
                        <Mail className="inline-block w-4 h-4 mr-1" />
                        <a href={`mailto:${t.email}`} className="hover:underline text-cyan-400">
                          {t.email}
                        </a>
                      </div>
                      <div>
                        <PhoneCall className="inline-block w-4 h-4 mr-1" />
                        <a href={`tel:${t.phone}`} className="hover:underline text-cyan-400">
                          {t.phone}
                        </a>
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
                aria-label="Close"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-semibold text-white mb-4 text-center">
                Submit Your Testimonial
              </h3>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name", { required: true })} className="w-full p-2 rounded bg-slate-700 text-white" placeholder="Your Name" />
                <input {...register("role", { required: true })} className="w-full p-2 rounded bg-slate-700 text-white" placeholder="Your Role" />
                <input {...register("company")} className="w-full p-2 rounded bg-slate-700 text-white" placeholder="Company (optional)" />
                <textarea {...register("content", { required: true })} rows={4} className="w-full p-2 rounded bg-slate-700 text-white" placeholder="Your Testimonial" />
                <input {...register("rating", { required: true, min: 1, max: 5 })} type="number" min={1} max={5} className="w-full p-2 rounded bg-slate-700 text-white" placeholder="Rating (1-5)" />
                <input {...register("website")} className="w-full p-2 rounded bg-slate-700 text-white" placeholder="Website (optional)" />
                <input {...register("email", { required: true })} type="email" className="w-full p-2 rounded bg-slate-700 text-white" placeholder="Email" />
                <input {...register("phone", { required: true })} type="tel" className="w-full p-2 rounded bg-slate-700 text-white" placeholder="Phone" />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-600 hover:from-purple-700 hover:to-purple-400 hover:text-black text-white rounded font-medium transition"
                >
                  {isSubmitting ? "Submitting..." : "Submit Testimonial"}
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
