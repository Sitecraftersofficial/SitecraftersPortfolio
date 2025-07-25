
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-900/50 backdrop-blur-md border-b border-slate-700/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl cursor-default hover:scale-110 transition-all ease-in-out duration-500 font-bold bg-gradient-to-r from-cyan-600 to-purple-500 uppercase bg-clip-text text-transparent">
            SiteCrafters
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <button onClick={() => scrollToSection("home")} className="text-white hover:text-purple-500 duration-500 hover:border-b-2 border-purple-500 transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection("services")} className="text-white hover:text-purple-500 duration-500 hover:border-b-2 border-purple-500 transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("about")} className="text-white hover:text-purple-500 duration-500 hover:border-b-2 border-purple-500 transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection("portfolio")} className="text-white hover:text-purple-500 duration-500 hover:border-b-2 border-purple-500 transition-colors">
              Portfolio
            </button>
            <button onClick={() => scrollToSection("pricing")} className="text-white hover:text-purple-500 duration-500 hover:border-b-2 border-purple-500 transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection("testimonials")} className="text-white hover:text-purple-500 duration-500 hover:border-b-2 border-purple-500 transition-colors">
              Testimonials
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-white hover:text-purple-500 duration-500 hover:border-b-2 border-purple-500 transition-colors">
              Contact
            </button>
            <Button 
              onClick={() => scrollToSection("contact")} 
              className="bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-600 duration-500 hover:from-purple-700 hover:to-purple-400 hover:text-black text-white border-0"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className=" mt-4 pb-4 border-t border-slate-700/20">
            <div className="flex flex-col space-y-4 pt-4">
              <button onClick={() => scrollToSection("home")} className="text-white duration-300 hover:text-purple-500 transition-colors text-left">
                Home
              </button>
              <button onClick={() => scrollToSection("services")} className="text-white duration-300 hover:text-purple-500 transition-colors text-left">
                Services
              </button>
              <button onClick={() => scrollToSection("about")} className="text-white duration-300 hover:text-purple-500 transition-colors text-left">
                About
              </button>
              <button onClick={() => scrollToSection("portfolio")} className="text-white duration-300 hover:text-purple-500 transition-colors text-left">
                Portfolio
              </button>
              <button onClick={() => scrollToSection("pricing")} className="text-white duration-300 hover:text-purple-500 transition-colors text-left">
                Pricing
              </button>
              <button onClick={() => scrollToSection("testimonials")} className="text-white duration-300 hover:text-purple-500 transition-colors text-left">
                Testimonials
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-white duration-300 hover:text-purple-500 transition-colors text-left">
                Contact
              </button>
              <Button 
                onClick={() => scrollToSection("contact")} 
                className="bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-600 duration-500 hover:from-purple-700 hover:to-purple-400 hover:text-black text-white border-0"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
