import { Mail, Phone, MapPin, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface ContactProps {
  selectedPlan: string;
}

const Contact: React.FC<ContactProps> = ({ selectedPlan }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Toast state
  const [toast, setToast] = useState<{ visible: boolean; type: "success" | "error"; message: string }>({
    visible: false,
    type: "success",
    message: ""
  });

  // Auto-hide toast after 20 seconds
  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(() => setToast(t => ({ ...t, visible: false })), 20000);
    return () => clearTimeout(timer);
  }, [toast.visible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent submission if any field is empty (extra safety, form has required)
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setToast({
        visible: true,
        type: "error",
        message: "Sitecrafters say your form submission has failed. Please check all fields are rightly submitted."
      });
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("message", formData.message);
    form.append("selectedPlan", selectedPlan);

    try {
      const response = await fetch("https://formspree.io/f/mnnvokkw", {
        method: "POST",
        body: form,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setToast({
          visible: true,
          type: "success",
          message: "Sitecrafters says that your message has been submitted and will get back to you as soon as possible."
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setToast({
          visible: true,
          type: "error",
          message: "Sitecrafters says your form submission has failed. Please try again or simply leave us a message at."
        });
      }
    } catch (error) {
      console.error("Form error:", error);
      setToast({
        visible: true,
        type: "error",
        message: "Sitecrafters says your form submission has failed. Please check all fields are rightly submitted."
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Get In</span>
              <span className="bg-gradient-to-r from-cyan-600 to-purple-400 bg-clip-text text-transparent ml-3">
                Touch
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Ready to start your project? Let's discuss how we can bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/90 rounded-lg p-6">
                <div className="flex items-center lg:justify-start md:justify-center justify-start space-x-4 mb-4">
                  <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <a href="mailto:sitecraftersz@gmail.com" className="text-slate-300 hover:text-cyan-400">sitecraftersz@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/90 rounded-lg p-6">
                <div className="flex items-center lg:justify-start md:justify-center justify-start space-x-4 mb-4">
                  <div className="bg-gradient-to-r from-cyan-600 to-purple-600 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Phone</h3>
                    <a href="tel:250789599719" className="text-slate-300 hover:text-cyan-400">(+250) 789-599-719</a>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/90 rounded-lg p-6">
                <div className="flex items-center lg:justify-start md:justify-center justify-start space-x-4 mb-4">
                  <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Location</h3>
                    <p className="text-slate-300">Kigali, Rwanda</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/90 rounded-lg p-8 relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="selectedPlan" value={selectedPlan} />

                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="off"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Your beautiful name?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="off"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    placeholder="How can we help you..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full hover:text-black bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-600 duration-700 hover:from-purple-700 hover:to-purple-400 text-lg py-3"
                >
                  Send Message
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Toast notification */}
      {toast.visible && (
        <div
          role="alert"
          className={`toast-notification fixed z-[9999] p-4 max-w-sm rounded-md shadow-lg border
            ${
              toast.type === "success"
                ? "bg-black border-slate-600 text-slate-300"
                : toast.type === "error"
                ? "bg-black border-red-600 text-red-400"
                : "bg-black border-cyan-600 text-cyan-400"
            }
            bottom-4 right-4
            sm:bottom-auto sm:right-auto sm:top-4 sm:left-1/2 sm:-translate-x-1/2
            flex items-center justify-between space-x-4
          `}
        >

          <div className="flex-1 text-sm text-slate-300">
            <h1 className="my-3 bg-gradient-to-r font-bold text-2xl from-cyan-600 to-purple-500 bg-clip-text text-transparent">Sitecrafters.com</h1>
            <p className="mb-2">{toast.message}</p>
            {toast.type === "error" && (
              <a
                href="mailto:sitecraftersz@gmail.com"
                className="text-cyan-600 duration-500 hover:text-cyan-400"
              >
                sitecraftersz@gmail.com
              </a>
            )}
          </div>

          <button
            onClick={() => setToast(t => ({ ...t, visible: false }))}
            aria-label="Close notification"
            className="ml-6 p-1 rounded hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
};

export default Contact;
