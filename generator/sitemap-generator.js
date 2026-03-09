const fs = require('fs-extra');
const path = require('path');
const cities = require('../data/cities.json');

async function generateSitemap() {
    const baseUrl = 'https://yourdomain.com';
    const today = new Date().toISOString().split('T')[0];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    
    <!-- Homepage -->
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    
    <!-- City Pages -->\n`;
    
    // Add city pages
    for (const city of cities) {
        sitemap += `    <url>
        <loc>${baseUrl}/cities/${city.id}.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>\n`;
    }
    
    // Add other important pages
    const staticPages = [
        'luxury-hotels',
        'travel-tips',
        'about',
        'contact',
        'privacy'
    ];
    
    for (const page of staticPages) {
        sitemap += `    <url>
        <loc>${baseUrl}/${page}.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>\n`;
    }
    
    sitemap += `</urlset>`;
    
    // Write sitemap
    await fs.writeFile(path.join(__dirname, '../sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated successfully!');
    
    // Generate sitemap index for scalability (for 1000+ cities)
    if (cities.length > 500) {
        await generateSitemapIndex();
    }
}

async function generateSitemapIndex() {
    const baseUrl = 'https://yourdomain.com';
    const today = new Date().toISOString().split('T')[0];
    
    let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>${baseUrl}/sitemap-cities-1.xml</loc>
        <lastmod>${today}</lastmod>
    </sitemap>
    <sitemap>
        <loc>${baseUrl}/sitemap-cities-2.xml</loc>
        <lastmod>${today}</lastmod>
    </sitemap>
    <sitemap>
        <loc>${baseUrl}/sitemap-static.xml</loc>
        <lastmod>${today}</lastmod>
    </sitemap>
</sitemapindex>`;
    
    await fs.writeFile(path.join(__dirname, '../sitemap-index.xml'), sitemapIndex);
    console.log('✅ Sitemap index generated for scalability!');
}

generateSitemap().catch(console.error);