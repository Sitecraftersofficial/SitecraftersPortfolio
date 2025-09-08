import React from "react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "RWF 370k",
    description: "Perfect for personal websites or portfolios.",
    features: ["1 Page", "Responsive Design", "Basic SEO", "Delivery in 5 days"],
  },
  {
    name: "Pro",
    price: "RWF 550k",
    description: "Great for small businesses and service websites.",
    features: ["Up to 5 Pages", "Contact Form", "SEO Optimization", "Delivery in 10 days"],
    popular: true,
  },
  {
    name: "Ultimate",
    price: "RWF 650k",
    description: "For startups and custom feature-rich sites.",
    features: ["Unlimited Pages", "Custom CMS", "API Integration", "Priority Support"],
  },
];

const maintenancePlans = [
  {
    name: "Maintenance (Monthly)",
    price: "RWF 35,000 / month",
    description: "Keep your website secure, updated, and running smoothly with monthly support.",
    features: ["Regular Updates", "Bug Fixes", "Security Monitoring", "Priority Support"],
  },
  {
    name: "Maintenance (Yearly)",
    price: "RWF 410,000 / year",
    description: "Save more with our annual maintenance plan while keeping your site in top shape.",
    features: ["Regular Updates", "Bug Fixes", "Security Monitoring", "Priority Support"],
    popular: true,
  },
];

interface PricingProps {
  setSelectedPlan: (plan: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ setSelectedPlan }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = (planName: string) => {
    setSelectedPlan(planName);
    scrollToSection("contact");
  };

  return (
    <>
      {/* Main Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-black">
        <div className="w-[80%] mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-purple-500 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            We believe in transparent and flexible pricing to match your goals.{" "}
            <span className="font-bold line-clamp-1">
              ALL PRICES LISTED BELOW ARE NEGOTIABLE
            </span>{" "}
            and are One-time-fee with no hidden costs.
          </p>
        </div>

        <div className="w-[80%] mx-auto">
          {/* Desktop grid (lg and up) */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <PlanCard key={index} plan={plan} handleClick={handleClick} />
            ))}
          </div>

          {/* Medium screen layout (2 cards + 1 centered) */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 gap-8">
              {plans.slice(0, 2).map((plan, index) => (
                <PlanCard key={index} plan={plan} handleClick={handleClick} />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <div className="w-full md:w-1/2">
                <PlanCard plan={plans[2]} handleClick={handleClick} />
              </div>
            </div>
          </div>

          {/* Small screen layout (1 column) */}
          <div className="flex flex-col gap-8 md:hidden">
            {plans.map((plan, index) => (
              <PlanCard key={index} plan={plan} handleClick={handleClick} />
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 via-black to-cyan-900">
        <div className="w-[80%] mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Website Maintenance Plans
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Keep your site secure, updated, and performing at its best with our flexible maintenance options.
            <span className="font-bold line-clamp-1"> PRICES ARE NEGOTIABLE</span>
          </p>
        </div>

        <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {maintenancePlans.map((plan, index) => (
            <PlanCard key={index} plan={plan} handleClick={handleClick} />
          ))}
        </div>
      </section>
    </>
  );
};

interface PlanCardProps {
  plan: {
    name: string;
    price: string;
    description: string;
    features: string[];
    popular?: boolean;
  };
  handleClick: (planName: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, handleClick }) => {
  return (
    <div
      className={`relative p-8 rounded-2xl border text-left shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        plan.popular
          ? "bg-slate-800/60 border-purple-500 scale-105 ring-1 ring-purple-500"
          : "bg-slate-800/50 border-slate-700/50"
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-tr-2xl rounded-bl-2xl">
          Most Popular
        </div>
      )}
      <h3 className="text-white text-2xl font-semibold mb-1">{plan.name}</h3>
      <p className="text-xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-purple-400 bg-clip-text text-transparent">
        {plan.price}
      </p>
      <p className="text-slate-400 mb-6">{plan.description}</p>
      <ul className="text-slate-300 space-y-2 mb-6">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <div className="w-2 h-2 bg-cyan-600 rounded-full mr-3" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        onClick={() => handleClick(plan.name)}
        className="bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-600 duration-500 hover:from-purple-700 hover:to-purple-400 hover:text-black text-white border-0"
      >
        Subscribe
      </Button>
    </div>
  );
};

export default Pricing;
