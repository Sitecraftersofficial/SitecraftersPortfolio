import { useEffect } from 'react';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonicalUrl?: string;
    ogImage?: string;
    ogType?: string;
    noindex?: boolean;
}

const SEO = ({
    title = 'SiteCrafters - Professional Web Development & Design Services',
    description = 'Expert web development agency specializing in custom websites, responsive design, UI/UX, SEO optimization, and web maintenance. Transform your digital presence with SiteCrafters.',
    keywords = 'web development, website design, custom websites, responsive web design, UI/UX design, SEO optimization, web maintenance',
    canonicalUrl = 'https://www.sitecraftersz.co/',
    ogImage = 'https://www.sitecraftersz.co/siteCraftersLogo.jpg',
    ogType = 'website',
    noindex = false,
}: SEOProps) => {
    useEffect(() => {
        // Update page title
        document.title = title;

        // Update or create meta tags
        const updateMetaTag = (name: string, content: string, property?: boolean) => {
            const attribute = property ? 'property' : 'name';
            let element = document.querySelector(`meta[${attribute}="${name}"]`);

            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }

            element.setAttribute('content', content);
        };

        // Standard meta tags
        updateMetaTag('description', description);
        updateMetaTag('keywords', keywords);

        // Robots
        if (noindex) {
            updateMetaTag('robots', 'noindex, nofollow');
        } else {
            updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
        }

        // Open Graph tags
        updateMetaTag('og:title', title, true);
        updateMetaTag('og:description', description, true);
        updateMetaTag('og:type', ogType, true);
        updateMetaTag('og:url', canonicalUrl, true);
        updateMetaTag('og:image', ogImage, true);
        updateMetaTag('og:site_name', 'SiteCrafters', true);

        // Twitter tags
        updateMetaTag('twitter:card', 'summary_large_image');
        updateMetaTag('twitter:title', title);
        updateMetaTag('twitter:description', description);
        updateMetaTag('twitter:image', ogImage);

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', canonicalUrl);
    }, [title, description, keywords, canonicalUrl, ogImage, ogType, noindex]);

    return null;
};

export default SEO;
