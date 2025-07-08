import { useEffect, useState } from "react";
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
    <section id="testimonials" className="px-4 py-20 bg-slate-900 overflow-x-hidden">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            What Our <span className="bg-gradient-to-r from-cyan-600 to-purple-400 bg-clip-text text-transparent">Clients Say</span>
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

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-purple-400 border-r-purple-500 border-b-cyan-600 border-l-purple-500 animate-spin" />
          </div>
        ) : testimonialList.length === 0 ? (
          <p className="text-center text-slate-400">No testimonials yet.</p>
        ) : (
          <div className="w-full">
            <Card className="w-full bg-slate-800/50 border-slate-700/50 overflow-hidden shadow-lg transition-opacity duration-700 ease-in-out">
              <CardContent className="p-6 sm:p-8 space-y-6 text-slate-300 break-words hyphens-auto">
                <div className="flex items-center gap-3">
                  {renderStars(testimonialList[visibleIndex].rating)}
                  {testimonialList[visibleIndex].verified && (
                    <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded flex items-center gap-1">
                      <ShieldCheck size={12} /> Verified
                    </span>
                  )}
                </div>
                <blockquote className="leading-relaxed text-base sm:text-lg md:text-xl">
                  “{testimonialList[visibleIndex].content}”
                </blockquote>
                <div className="pt-4 border-t border-slate-700/40 text-sm space-y-2">
                  <div>
                    <span className="text-white font-semibold">{testimonialList[visibleIndex].name}</span>{" "}
                    <span className="text-slate-400"> — {testimonialList[visibleIndex].role}{testimonialList[visibleIndex].company && ` at ${testimonialList[visibleIndex].company}`}</span>
                  </div>
                  {testimonialList[visibleIndex].website && (
                    <div>
                      <Globe className="inline-block w-4 h-4 mr-1" />
                      <a
                        href={testimonialList[visibleIndex].website}
                        className="text-cyan-400 hover:underline break-words"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {testimonialList[visibleIndex].website}
                      </a>
                    </div>
                  )}
                  <div>
                    <Mail className="inline-block w-4 h-4 mr-1" />
                    <a href={`mailto:${testimonialList[visibleIndex].email}`} className="hover:underline text-cyan-400">
                      {testimonialList[visibleIndex].email}
                    </a>
                  </div>
                  <div>
                    <PhoneCall className="inline-block w-4 h-4 mr-1" />
                    <a href={`tel:${testimonialList[visibleIndex].phone}`} className="hover:underline text-cyan-400">
                      {testimonialList[visibleIndex].phone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
