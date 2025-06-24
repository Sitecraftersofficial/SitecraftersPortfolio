
import { useEffect, useRef } from "react";
import mylogo from '.../../public/Sitecrafters-assets/siteCraftersLogo.jpg'; // Adjust the path as necessary
 

const Logo3D = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!logoRef.current) return;
      
      const rect = logoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / 10;
      const deltaY = (e.clientY - centerY) / 10;
      
      logoRef.current.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
    };

    const handleMouseLeave = () => {
      if (!logoRef.current) return;
      logoRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="flex flex-col items-center mb-8 md:mb-12">
      <div 
        ref={logoRef}
        className="relative transition-transform duration-700 ease-out mb-6"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative w-24 h-24 m-3 sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[400px] lg:h-[400px]">
          {/* Main logo with 3D effect */}
          <div className="absolute inset-0 transform-gpu">
            <div 
              className="w-full h-full rounded-lg shadow-2xl overflow-hidden"
              style={{
                transform: "translateZ(20px)",
              }}
            >
              <img 
                src={mylogo}  
                alt="SiteCrafters Logo"
                className="sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[400px] lg:h-[400px] object-contain"
              />
              {/* Overlay for 3D depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-lg"></div>
            </div>
            
            {/* Side faces for 3D effect */}
            <div 
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/60 to-purple-800/60 rounded-lg"
              style={{ transform: "rotateY(90deg) translateZ(20px)" }}
            ></div>
            <div 
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-700/40 to-purple-900/40 rounded-lg"
              style={{ transform: "rotateX(90deg) translateZ(20px)" }}
            ></div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-2 h-2 sm:w-4 sm:h-4 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-1.5 h-1.5 sm:w-3 sm:h-3 bg-purple-400 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-1/2 -right-2 sm:-right-4 w-1 h-1 sm:w-2 sm:h-2 bg-pink-400 rounded-full animate-pulse delay-700"></div>
        </div>
      </div>
      
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-300 via-purple-400 to-gray-400 bg-clip-text text-transparent mb-2">
          SiteCrafters
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-cyan-300 font-400 italic tracking-wide px-4">
          Bold Sites. Smart design. Real impact.
        </p>
      </div>
    </div>
  );
};

export default Logo3D;
