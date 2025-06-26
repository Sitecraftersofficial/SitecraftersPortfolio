import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  return (
    <div className="min-h-screen bg-black from-gray-900 via-gray-800 to-gray-700">
      <Header />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Pricing setSelectedPlan={setSelectedPlan} />
      <Testimonials />
      <Contact selectedPlan={selectedPlan} />
      <Footer />
    </div>
  );
};

export default Index;

