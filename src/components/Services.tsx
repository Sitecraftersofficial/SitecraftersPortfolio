
import { Code, Palette, Search, ShoppingCart, Settings, Smartphone, Plug, FileText, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies like React, Node.js, and more.",
      features: ["Responsive Design", "Performance Optimization", "SEO Friendly", "Cross-browser Compatible"]
    },
    {
      icon: Settings,
      title: "Web Maintenance",
      description: "Ongoing support and maintenance to keep your website secure, updated, and performing optimally.",
      features: ["Security Updates", "Performance Monitoring", "Content Updates", "Bug Fixes"]
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that provide exceptional user experiences and drive conversions.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Improve your online visibility and rank higher in search engine results.",
      features: ["Keyword Research", "On-page SEO", "Technical SEO", "Content Strategy"]
    },
    {
      icon: FileText,
      title: "Landing Page Design",
      description: "High-converting, responsive landing pages to support your marketing campaigns or product launches.",
      features: ["One-Page Layout", "Conversion Focused", "Fast Loading", "Mobile Optimized"]
    },
    {
      icon: Zap, // or another suitable Lucide icon
      title: "Website Speed Optimization",
      description: "Enhance performance and user experience with faster loading times and optimized assets.",
      features: ["Lighthouse Reports", "Code Minification", "Image Compression", "Lazy Loading"]
    }
  ];

  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-cyan-600 to-purple-400 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We offer a comprehensive range of digital services to help your business thrive in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:transform group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                <CardDescription className="text-slate-300">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-slate-400 flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Services;
