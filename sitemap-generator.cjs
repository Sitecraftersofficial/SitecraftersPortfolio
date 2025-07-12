// sitemap-generator.cjs
const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');
const path = require('path');

const links = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.8 },
  { url: '/services', changefreq: 'monthly', priority: 0.8 },
  { url: '/portfolio', changefreq: 'monthly', priority: 0.7 },
  { url: '/dashboard', changefreq: 'monthly', priority: 0.6 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.4 },
  { url: '/terms-of-service', changefreq: 'yearly', priority: 0.4 },
];

(async () => {
  const stream = new SitemapStream({ hostname: 'https://www.sitecraftersz.netlify.app' });

  links.forEach(link => stream.write(link));
  stream.end();

  const sitemapData = await streamToPromise(stream);
  fs.writeFileSync(path.resolve('./public/sitemap.xml'), sitemapData.toString());

  console.log('✅ Sitemap generated successfully at: public/sitemap.xml');
})();
