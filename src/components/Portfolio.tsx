
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import silvagymimage from "../assets/portfolio/silvagym.png";
import webwizardsimage from "../assets/portfolio/webwizards.png";
import sitecraftersimage from "../assets/portfolio/sitecrafters.png";
import bizmanagerimage from "../assets/portfolio/bizmanager.png";
import carrentalimage from "../assets/portfolio/carrental.png";
import ecobazarimage from "../assets/portfolio/ecobazar.png";

const Portfolio = () => {
  const projects = [
    {
      title: "Silva Gym",
      description: "A sleek gym website with class scheduling, membership management, and a user-friendly admin dashboard.",
      image: silvagymimage,
      tags: ["Html", "Css", "Tailwindcss", "Javascript"],
      liveUrl: "https://silvagym.netlify.app/"
    },
    {
      title: "Web Wizards",
      description: "A modern web agency site showcasing services, portfolio, and contact options with a sleek, responsive design.",
      image: webwizardsimage,
      tags: ["Html", "Css", "Tailwindcss", "Javascript"],
      liveUrl: "https://officialwebwizards.netlify.app/"
    },
    {
      title: "Site Crafters",
      description: "Our own agency website — a modern, responsive design for SiteCrafters, showcasing our services, portfolio, and contact flow.",
      image: sitecraftersimage,
      tags: ["React", "Typescript", "Html", "Css", "Tailwindcss"],
      liveUrl: "https://sitecraftersz.netlify.app/"
    },
    {
      title: "Biz Manager",
      description: "A powerful sales and inventory management system with real-time inventory tracking, invoicing, and customer management tools.",
      image: bizmanagerimage,
      tags: ["React", "Typescript", "Javascript", "Html", "Css", "Tailwindcss"],
      liveUrl: "https://bizmanagement.netlify.app/"
    },
    {
      title: "Car Rental",
      description: "A sleek and conversion-focused landing page for a car rental service, featuring vehicle listings, booking CTA, and responsive design.",
      image: carrentalimage,
      tags: ["Html", "Css"],
      liveUrl: "https://luxedrivecar-rental.netlify.app/"
    },
    {
      title: "Eco Bazar",
      description: "A clean and eco-friendly online store interface designed for organic products, with category browsing, modern UI, and responsive layout.",
      image: ecobazarimage,
      tags: ["Html", "Tailwindcss", "Css"],
      liveUrl: "https://ecobaazar.netlify.app/"
    }
  ];

  return (
    <section id="portfolio" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-cyan-600 to-purple-400 bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Take a look at some of our recent projects and see how we've helped businesses achieve their digital goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700/50 overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-cyan-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-cyan-600 to-purple-500 duration-500 hover:text-black hover:from-purple-500 hover:to-cyan-600 text-white border-0"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live
                    </Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-slate-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
