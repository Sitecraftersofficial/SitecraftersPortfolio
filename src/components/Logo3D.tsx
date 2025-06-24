
import { useEffect, useRef } from "react";

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
    <div className="flex flex-col items-center mb-12">
      <div 
        ref={logoRef}
        className="relative transition-transform duration-200 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          {/* Main cube structure with gradient */}
          <div className="absolute inset-0 transform-gpu">
            <div 
              className="w-full h-full bg-gradient-to-br from-cyan-400 via-purple-500 to-purple-600 rounded-lg shadow-2xl"
              style={{
                transform: "translateZ(20px)",
                background: "linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #7c3aed 100%)"
              }}
            >
              {/* Inner geometric shapes */}
              <div className="absolute inset-4 bg-slate-900/80 rounded transform rotate-45"></div>
              <div className="absolute inset-6 bg-gradient-to-br from-purple-400 to-cyan-400 rounded transform -rotate-12"></div>
              <div className="absolute inset-8 bg-slate-800/90 rounded"></div>
            </div>
            
            {/* Side faces for 3D effect */}
            <div 
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg opacity-60"
              style={{ transform: "rotateY(90deg) translateZ(20px)" }}
            ></div>
            <div 
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-700 to-purple-900 rounded-lg opacity-40"
              style={{ transform: "rotateX(90deg) translateZ(20px)" }}
            ></div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-1/2 -right-4 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-700"></div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-2">
          SiteCrafters
        </h1>
        <p className="text-lg md:text-xl text-cyan-300 font-light tracking-wide">
          Bold Sites. Smart design. Real impact.
        </p>
      </div>
    </div>
  );
};

export default Logo3D;
