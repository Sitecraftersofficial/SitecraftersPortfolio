import { ArrowDown, ArrowRight, Code, InstagramIcon, Palette, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Logo3D from "./Logo3D";
import instagramicon from '../assets/socialmedia/instagram.png';
import gmailicon from '../assets/socialmedia/gmail.png';
import whatsappicon from '../assets/socialmedia/whatsapp.png';

// Reusable counter component
const CounterCard = ({
  end,
  label,
  color,
}: {
  end: number;
  label: string;
  color: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let animationId: NodeJS.Timeout;

    const startCounting = () => {
      let start = 0;
      const duration = 2000; // animation time
      const increment = end / (duration / 30);

      animationId = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(animationId);
          setCount(end);
        } else {
          setCount(Math.ceil(start));
        }
      }, 30);
    };

      startCounting();
  
      return () => {
        clearInterval(animationId);
      };
    }, [end]);


  return (
    <div className="text-center p-4 md:p-6 rounded-lg bg-slate-800/30 backdrop-blur-sm border border-slate-700/20">
      <div className={`text-2xl md:text-3xl font-bold ${color} mb-2`}>
        {count}+
      </div>
      <div className="text-slate-300 text-sm md:text-base">{label}</div>
    </div>
  );
};


const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [fade, setFade] = useState(true); // for fade in/out control

  const texts = [
    "Web Development",
    "UI/UX Design",
    "Digital Solutions",
    "Brand Identity",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out

      setTimeout(() => {
        // Switch text after fade-out completes
        setCurrentText((prev) => (prev + 1) % texts.length);
        setFade(true); // Start fade-in
      }, 1000); // Match fade-out duration
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, []);
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-4"
    >
      <div className="container mx-auto text-center">
        {/* 3D Logo */}
        <Logo3D />

<div className="mb-7 md:mb-8 flex justify-center space-x-4 md:space-x-8">
  <a href="https://wa.me/250789599719" target="_blank" rel="noopener noreferrer">
    <div className="w-[50px] h-[50px] flex items-center justify-center bg-transparent rounded-full">
      <img src={whatsappicon} alt="whatsapp" className="w-[38px] h-[38px] object-contain" />
    </div>
  </a>
  <a href="https://www.instagram.com/sitecraftersz/" target="_blank" rel="noopener noreferrer">
    <div className="w-[50px] h-[50px] flex items-center justify-center bg-transparent rounded-full">
      <img src={instagramicon} alt="instagram" className="w-[40px] h-[40px] object-contain" />
    </div>
  </a>
  <a href="mailto:sitecraftersz@gmail.com" target="_blank" rel="noopener noreferrer">
    <div className="w-[50px] h-[50px] flex items-center justify-center bg-transparent rounded-full">
      <img src={gmailicon} alt="gmail" className="w-[40px] h-[40px] object-contain" />
    </div>
  </a>
</div>


        {/* Hero Content */}

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
          <span className="text-white">Crafting Digital</span>
          <br />
          <span
            className={`bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-600 bg-clip-text text-transparent transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            {texts[currentText]}
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
          We transform ideas into stunning digital experiences. From concept to
          launch, we're your partner in creating exceptional websites and
          applications.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 md:mb-16">
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-600 duration-500 hover:text-black hover:from-purple-700 hover:to-purple-400 text-lg px-8 py-3 group text-white border-0"
          >
            Start Your Project
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-gradient-to-r from-cyan-600 via-purple-500 to-purple-400 duration-500 hover:text-black hover:from-purple-400 hover:to-purple-700 text-lg px-8 py-3 group text-white border-0"
            onClick={() =>
              document
                .getElementById("portfolio")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Our Portfolio
            <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </Button>          
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
          <CounterCard
            end={20}
            label="Projects Completed"
            color="text-cyan-600"
          />
          <CounterCard
            end={15}
            label="Happy Clients"
            color="text-indigo-500"
          />
          <CounterCard
            end={1}
            label="Years Experience"
            color="text-purple-500"
          />
        </div>   */}

      </div>
    </section>
  );
};

export default Hero;
