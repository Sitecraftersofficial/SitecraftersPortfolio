import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import projectsData from "../assets/portfolio/projects.json";

// Pre-import all images
import silvagymimage from "../assets/portfolio/silvagym.png";
import webwizardsimage from "../assets/portfolio/webwizards.png";
import sitecraftersimage from "../assets/portfolio/sitecrafters.png";
import exquisitekonnorimage from "../assets/portfolio/exquisitekonnor.png";
import carrentalimage from "../assets/portfolio/carrental.png";
import ecobazarimage from "../assets/portfolio/ecobazar.png";

// Map JSON image names to imported images
const imageMap: Record<string, string> = {
  "silvagym.png": silvagymimage,
  "webwizards.png": webwizardsimage,
  "sitecrafters.png": sitecraftersimage,
  "exquisitekonnor.png": exquisitekonnorimage,
  "carrental.png": carrentalimage,
  "ecobazar.png": ecobazarimage,
};

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const projects = projectsData.map(project => ({
    ...project,
    image: imageMap[project.image],
  }));

  const categories = ["All", "Landing Pages", "Websites"];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-purple-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-6">
            Take a look at some of our recent projects and see how we've helped businesses achieve their digital goals.
          </p>

          {/* Category Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-cyan-600 to-purple-500 text-white"
                    : "bg-slate-700/60 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              className="bg-slate-800/50 border-slate-700/50 overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-cyan-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-cyan-600 to-purple-500 duration-500 hover:text-black hover:from-purple-500 hover:to-cyan-600 text-white border-0"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live
                    </Button>
                  </a>
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

        {/* See More Button */}
        <div className="flex justify-center mt-10">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-600 duration-500 hover:from-purple-700 hover:to-purple-400 hover:text-black text-white border-0"
            onClick={() => alert("Load more projects or navigate to another page")}
          >
            See More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
