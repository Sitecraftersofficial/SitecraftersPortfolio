
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
    <header className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            SiteCrafters
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("home")} className="text-white hover:text-purple-400 transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection("services")} className="text-white hover:text-purple-400 transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("about")} className="text-white hover:text-purple-400 transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection("portfolio")} className="text-white hover:text-purple-400 transition-colors">
              Portfolio
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-white hover:text-purple-400 transition-colors">
              Contact
            </button>
            <Button 
              onClick={() => scrollToSection("contact")} 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-700/20">
            <div className="flex flex-col space-y-4 pt-4">
              <button onClick={() => scrollToSection("home")} className="text-white hover:text-purple-400 transition-colors text-left">
                Home
              </button>
              <button onClick={() => scrollToSection("services")} className="text-white hover:text-purple-400 transition-colors text-left">
                Services
              </button>
              <button onClick={() => scrollToSection("about")} className="text-white hover:text-purple-400 transition-colors text-left">
                About
              </button>
              <button onClick={() => scrollToSection("portfolio")} className="text-white hover:text-purple-400 transition-colors text-left">
                Portfolio
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-white hover:text-purple-400 transition-colors text-left">
                Contact
              </button>
              <Button 
                onClick={() => scrollToSection("contact")} 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-fit text-white border-0"
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
