import { useEffect, useState } from "react";
import { Users, Award, Target, Zap } from "lucide-react";

const SatisfactionCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 95;
    const duration = 2000; // animation duration in ms
    const increment = end / (duration / 30);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(interval);
        setCount(end);
      } else {
        setCount(Math.ceil(start));
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center p-4 rounded-lg bg-slate-700/30">
      <div className="text-2xl font-bold text-cyan-600 mb-2">{count}%</div>
      <div className="text-slate-300 text-sm">Client Satisfaction</div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-slate-800/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-purple-400 bg-clip-text text-transparent">
                SiteCrafters
              </span>
            </h2>
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              We are a passionate team of designers, developers, and digital strategists dedicated to crafting{" "}
              exceptional digital experiences. With years of experience in the industry, we've helped businesses{" "}
              of all sizes establish their online presence and achieve their digital goals.
            </p>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Our mission is to transform your ideas into powerful digital solutions that not only look great{" "}
              but also drive results. We believe in the power of collaboration, innovation, and attention to detail.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <SatisfactionCounter />
              <div className="text-center p-4 rounded-lg bg-slate-700/30">
                <div className="text-2xl font-bold text-purple-500 mb-2">24/7</div>
                <div className="text-slate-300 text-sm">Support Available</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-6 rounded-lg bg-slate-700/30 border border-slate-600/20">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Expert Team</h3>
                <p className="text-slate-300">
                  Our diverse team brings together expertise in design, development, and digital strategy.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-lg bg-slate-700/30 border border-slate-600/20">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Quality Focused</h3>
                <p className="text-slate-300">
                  We maintain the highest standards in every project, ensuring exceptional quality and performance.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-lg bg-slate-700/30 border border-slate-600/20">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Results Driven</h3>
                <p className="text-slate-300">
                  Every project is designed with your business goals in mind, focusing on measurable results.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-lg bg-slate-700/30 border border-slate-600/20">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Fast Delivery</h3>
                <p className="text-slate-300">
                  We pride ourselves on delivering projects on time without compromising on quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
