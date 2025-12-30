import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs: FAQItem[] = [
        {
            question: "What web development services does SiteCrafters offer?",
            answer: "SiteCrafters offers comprehensive web development services including custom website development, responsive web design, UI/UX design, SEO optimization, web maintenance, landing page design, and website speed optimization. We specialize in modern technologies like React, Node.js, and create fast, user-friendly websites for businesses of all sizes."
        },
        {
            question: "How much does it cost to build a website with SiteCrafters?",
            answer: "Website costs vary based on complexity and features. Basic websites start from affordable packages for small businesses, while custom web applications and e-commerce sites are priced based on specific requirements. Contact us for a free consultation and personalized quote tailored to your project needs and budget."
        },
        {
            question: "How long does it take to build a website?",
            answer: "Project timelines vary depending on complexity. A basic landing page takes 1-2 weeks, a standard business website takes 3-4 weeks, and complex web applications take 6-12 weeks. We provide detailed timelines during consultation and keep you updated throughout the development process."
        },
        {
            question: "Do you provide ongoing website maintenance?",
            answer: "Yes! We offer comprehensive web maintenance services including security updates, performance monitoring, content updates, bug fixes, and technical support. Our maintenance plans ensure your website stays secure, fast, and up-to-date with the latest web standards."
        },
        {
            question: "Will my website be mobile-friendly and SEO optimized?",
            answer: "Absolutely! Every website we build is fully responsive and mobile-friendly, working perfectly on all devices. We implement comprehensive SEO best practices including optimized meta tags, structured data, fast loading speeds, and search engine-friendly code to help your site rank higher in search results."
        },
        {
            question: "What makes SiteCrafters different from other web development agencies?",
            answer: "SiteCrafters combines technical excellence with creative design. We use modern technologies, deliver fast-loading websites, provide transparent communication, offer competitive pricing, and ensure every project is optimized for performance and SEO. Plus, we offer ongoing support and maintenance to help your business grow online."
        },
        {
            question: "Can you help improve my existing website's performance and SEO?",
            answer: "Yes! We offer website audit, optimization, and redesign services. We can improve your site's speed, enhance SEO, update design, fix technical issues, and implement modern best practices to boost your search rankings and user experience."
        },
        {
            question: "Do you build e-commerce websites?",
            answer: "Yes, we build fully-functional e-commerce websites with secure payment processing, inventory management, shopping carts, and user-friendly admin panels. We can integrate with popular platforms or create custom solutions tailored to your business needs."
        },
        {
            question: "What technologies do you use for web development?",
            answer: "We use cutting-edge technologies including React, Next.js, TypeScript, Tailwind CSS, Node.js, and modern cloud platforms. Our tech stack ensures your website is fast, scalable, secure, and built with industry best practices."
        },
        {
            question: "Do you provide website hosting and domain services?",
            answer: "Yes, we can help you with domain registration, SSL certificates, web hosting setup, and ongoing server management. We work with reliable hosting providers to ensure your website has excellent uptime and performance."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 px-4 bg-slate-900/30">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-4">
                        <HelpCircle className="w-12 h-12 text-cyan-600 mr-3" />
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Frequently Asked <span className="bg-gradient-to-r from-cyan-600 to-purple-400 bg-clip-text text-transparent">Questions</span>
                        </h2>
                    </div>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Get answers to common questions about our web development services, pricing, timelines, and process.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <Card
                            key={index}
                            className="bg-slate-800/50 border-slate-700 hover:border-cyan-600/50 transition-all duration-300"
                        >
                            <CardContent className="p-0">
                                <button
                                    type="button"
                                    id={`faq-question-${index}`}
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
                                    aria-expanded={openIndex === index ? "true" : "false"}
                                    aria-controls={`faq-answer-${index}`}
                                >
                                    <h3 className="text-lg md:text-xl font-semibold text-white pr-4">
                                        {faq.question}
                                    </h3>
                                    <div className="flex-shrink-0">
                                        {openIndex === index ? (
                                            <ChevronUp className="w-6 h-6 text-cyan-600" />
                                        ) : (
                                            <ChevronDown className="w-6 h-6 text-slate-400" />
                                        )}
                                    </div>
                                </button>

                                <div
                                    id={`faq-answer-${index}`}
                                    role="region"
                                    aria-labelledby={`faq-question-${index}`}
                                    className={`px-6 transition-all duration-300 overflow-hidden ${openIndex === index
                                        ? 'max-h-96 opacity-100 pb-6'
                                        : 'max-h-0 opacity-0 pb-0'
                                        }`}
                                >
                                    <p className="text-slate-300 leading-relaxed text-base md:text-lg border-t border-slate-700 pt-4">
                                        {faq.answer}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-300 mb-4">Still have questions?</p>
                    <a
                        href="#contact"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-cyan-600 transition-all duration-300"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
