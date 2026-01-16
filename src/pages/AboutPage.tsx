import Header from "@/components/Header";
import About from "@/components/About";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-black from-gray-900 via-gray-800 to-gray-700">
            <SEO
                title="About SiteCrafters | Professional Web Development Agency"
                description="Meet the team behind SiteCrafters. We're passionate about creating exceptional web experiences with modern technologies and user-centered design principles."
                keywords="about sitecrafters, web development agency, professional web developers, web design team"
                canonicalUrl="https://www.sitecraftersz.co/about"
            />
            <Header />
            <div className="pt-20">
                <About />
            </div>
            <Footer />
        </div>
    );
};

export default AboutPage;
