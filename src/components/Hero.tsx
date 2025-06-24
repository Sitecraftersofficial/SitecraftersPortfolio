
import { ArrowRight, Code, Palette, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Logo3D from "./Logo3D";

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const texts = ["Web Development", "UI/UX Design", "Digital Solutions", "Brand Identity"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto text-center">
        {/* 3D Logo */}
        <Logo3D />
        
        <div className="mb-6 md:mb-8 flex justify-center space-x-4 md:space-x-8 text-slate-400">
          <Code className="w-6 h-6 md:w-8 md:h-8 animate-pulse" />
          <Palette className="w-6 h-6 md:w-8 md:h-8 animate-pulse delay-200" />
          <Rocket className="w-6 h-6 md:w-8 md:h-8 animate-pulse delay-400" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
          <span className="text-white">Crafting Digital</span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            {texts[currentText]}
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
          We transform ideas into stunning digital experiences. From concept to launch, 
          we're your partner in creating exceptional websites and applications.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 md:mb-16">
          <Button 
            onClick={scrollToContact}
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3 group text-white border-0"
          >
            Start Your Project
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-slate-600 text-white hover:bg-slate-800 hover:text-white bg-transparent text-lg px-8 py-3"
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Our Work
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
          <div className="text-center p-4 md:p-6 rounded-lg bg-slate-800/30 backdrop-blur-sm border border-slate-700/20">
            <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2">50+</div>
            <div className="text-slate-300 text-sm md:text-base">Projects Completed</div>
          </div>
          <div className="text-center p-4 md:p-6 rounded-lg bg-slate-800/30 backdrop-blur-sm border border-slate-700/20">
            <div className="text-2xl md:text-3xl font-bold text-pink-400 mb-2">25+</div>
            <div className="text-slate-300 text-sm md:text-base">Happy Clients</div>
          </div>
          <div className="text-center p-4 md:p-6 rounded-lg bg-slate-800/30 backdrop-blur-sm border border-slate-700/20">
            <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">3+</div>
            <div className="text-slate-300 text-sm md:text-base">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
