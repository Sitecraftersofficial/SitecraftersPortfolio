
import instagramicon from '../assets/socialmedia/instagram.png';
import facebookicon from '../assets/socialmedia/facebook.png';
import gmailicon from '../assets/socialmedia/gmail.png';
import linkedinicon from '../assets/socialmedia/linkedin.png';
import whatsappicon from '../assets/socialmedia/whatsapp.png';
import githubicon from '../assets/socialmedia/github.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900/90 border-t border-slate-700/20 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              SiteCrafters
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              We craft exceptional digital experiences that help businesses grow and succeed online.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/250789599719" target="_blank" rel="noopener noreferrer">
                <div className="w-[50px] h-[50px] flex items-center justify-center bg-transparent rounded-full">
                  <img src={whatsappicon} alt="whatsapp" className="w-[28px] h-[28px] object-contain" />
                </div>
              </a>
              <a href="https://www.instagram.com/sitecraftersz/" target="_blank" rel="noopener noreferrer">
                <div className="w-[50px] h-[50px] flex items-center justify-center bg-transparent rounded-full">
                  <img src={instagramicon} alt="instagram" className="w-[30px] h-[30px] object-contain" />
                </div>
              </a>
              <a href="https://www.facebook.com/share/1BhjrkKef6/" target="_blank" rel="noopener noreferrer">
                <div className="w-[50px] h-[50px] flex items-center justify-center bg-transparent rounded-full">
                  <img src={facebookicon} alt="facebook" className="w-[25px] h-[25px] object-contain" />
                </div>
              </a>
              <a href="mailto:sitecraftersz@gmail.com" target="_blank" rel="noopener noreferrer">
                <div className="w-[50px] h-[50px] flex items-center justify-center bg-transparent rounded-full">
                  <img src={gmailicon} alt="gmail" className="w-[30px] h-[30px] object-contain" />
                </div>
              </a>
              <a href="https://github.com/Sitecraftersofficial" target="_blank" rel="noopener noreferrer">
                <div className="w-[50px] h-[50px] flex items-center justify-center bg-transparent rounded-full">
                  <img src={githubicon} alt="github" className="w-[30px] h-[30px] object-contain" />
                </div>
              </a>
              <a href="https://www.linkedin.com/in/site-crafters-a6b199371/" target="_blank" rel="noopener noreferrer">
                <div className="w-[50px] h-[50px] flex items-center justify-center bg-transparent rounded-full">
                  <img src={linkedinicon} alt="linkedin" className="w-[30px] h-[30px] object-contain" />
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-slate-300 hover:text-purple-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-slate-300 hover:text-purple-400 transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-slate-300 hover:text-purple-400 transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="text-slate-300 hover:text-purple-400 transition-colors"
                >
                  Portfolio
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="mailto:sitecraftersz@gmail.com" className="text-slate-300">sitecraftersz@gmail.com</a></li>
              <li><a href="tel:250789599719" className="text-slate-300">(+250) 789-599-719</a></li>
              <li>Kigali, Rwanda</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © {currentYear} SiteCrafters. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-purple-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-purple-400 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
