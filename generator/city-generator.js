const fs = require('fs-extra');
const path = require('path');
const cities = require('../data/cities.json');

// Related cities for internal linking
const relatedCities = {
  'new-york': ['boston', 'chicago', 'miami', 'los-angeles', 'san-francisco', 'toronto', 'london', 'paris'],
  'paris': ['london', 'rome', 'barcelona', 'amsterdam', 'brussels', 'geneva', 'lyon', 'marseille'],
  // Add mappings for all 100 cities
};

function generateCityPage(city) {
  const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete Travel Guide to ${city.name}: Luxury Hotels, Attractions & Travel Tips</title>
    <meta name="description" content="Discover the best luxury hotels, attractions, and things to do in ${city.name}. Expert travel guide with insider tips, neighborhood guides, and premium experiences.">
    <meta name="keywords" content="luxury hotels ${city.name}, where to stay in ${city.name}, travel guide ${city.name}, best hotels ${city.name}, things to do in ${city.name}">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://yourdomain.com/cities/${city.id}.html">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Complete Travel Guide to ${city.name}: Luxury Hotels, Attractions & Travel Tips">
    <meta property="og:description" content="Discover the best luxury hotels, attractions, and things to do in ${city.name}. Expert travel guide with insider tips.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://yourdomain.com/cities/${city.id}.html">
    <meta property="og:image" content="https://yourdomain.com/images/cities/${city.id}.jpg">
    
    <!-- Styles -->
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/responsive.css">
    
    <!-- Schema.org markup -->
    <script type="application/ld+json" id="schema-travel">
    {
        "@context": "https://schema.org",
        "@type": "TravelGuide",
        "name": "${city.name} Travel Guide",
        "description": "${city.description}",
        "url": "https://yourdomain.com/cities/${city.id}.html",
        "inLanguage": "en",
        "about": {
            "@type": "City",
            "name": "${city.name}",
            "containedIn": {
                "@type": "Country",
                "name": "${city.country}"
            }
        }
    }
    </script>
</head>
<body>
    <!-- Header -->
    <header class="site-header">
        <div class="container">
            <div class="header-content">
                <a href="/" class="logo">Premium<span>Travel</span></a>
                <nav class="main-nav">
                    <a href="/">Home</a>
                    <a href="/cities/">Destinations</a>
                    <a href="/luxury-hotels/">Luxury Hotels</a>
                    <a href="/travel-tips/">Travel Tips</a>
                    <a href="/about/">About</a>
                </nav>
                <button class="mobile-menu-toggle">☰</button>
            </div>
        </div>
    </header>

    <!-- Breadcrumbs -->
    <div class="container">
        <div class="breadcrumbs">
            <a href="/">Home</a> › 
            <a href="/cities/">Cities</a> › 
            <span>${city.name}</span>
        </div>
    </div>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1>Complete Travel Guide to ${city.name}: Luxury Hotels, Attractions & Travel Tips</h1>
            <p>${city.description}</p>
        </div>
    </section>

    <!-- Main Content -->
    <div class="container">
        <div class="content-wrapper">
            <main class="article-content">
                <!-- Ad Below Title -->
                <div class="ad-container">
                    <!-- AdSense code will go here -->
                    <div class="ad-label">Advertisement</div>
                    <!-- <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-xxxxxxxxxxxxx" data-ad-slot="xxxxxxxxx" Replace All></ins> -->
                </div>

                <!-- Introduction -->
                <h2>Introduction to ${city.name}</h2>
                <p>${city.name}, the dazzling gem of ${city.country}, stands as one of the world's most captivating destinations for discerning travelers. From its iconic skyline to its rich cultural tapestry, ${city.name} offers an unparalleled journey into luxury, history, and sophistication.</p>
                <p>Whether you're seeking world-class dining, exclusive shopping experiences, or simply want to immerse yourself in the local culture, ${city.name} delivers beyond expectations. This comprehensive guide will navigate you through the city's finest offerings, ensuring your visit is nothing short of extraordinary.</p>

                <!-- Ad After First Section -->
                <div class="ad-container">
                    <div class="ad-label">Advertisement</div>
                </div>

                <!-- Luxury Hotels -->
                <h2>Luxury Hotels in ${city.name}</h2>
                <p>For the discerning traveler, ${city.name} boasts some of the world's most prestigious accommodations. These establishments redefine hospitality with unparalleled service and exquisite amenities.</p>
                
                ${generateLuxuryHotelsList(city.luxuryHotels)}
                
                <p>Each of these properties offers unique experiences, from Michelin-starred restaurants to world-class spas, ensuring your stay in ${city.name} is as memorable as the city itself.</p>

                <!-- Where to Stay -->
                <h2>Where to Stay in ${city.name}</h2>
                <p>${city.name}'s diverse neighborhoods each offer a distinct character and atmosphere. Here's our curated guide to the best areas for luxury travelers:</p>
                
                ${generateNeighborhoodsList(city.neighborhoods)}

                <!-- Mid-Content Ad -->
                <div class="ad-container">
                    <div class="ad-label">Advertisement</div>
                </div>

                <!-- Top Attractions -->
                <h2>Top Attractions in ${city.name}</h2>
                <p>No visit to ${city.name} is complete without experiencing these iconic landmarks and cultural institutions:</p>
                
                ${generateAttractionsList(city.attractions)}

                <!-- Things to Do -->
                <h2>Things to Do in ${city.name}</h2>
                <p>Beyond the famous landmarks, ${city.name} offers countless experiences for the curious traveler:</p>
                
                <h3>Cultural Experiences</h3>
                <p>Immerse yourself in ${city.name}'s rich cultural scene with visits to world-renowned museums, galleries, and performance venues. From classical concerts to contemporary art exhibitions, the city pulses with creative energy.</p>
                
                <h3>Culinary Adventures</h3>
                <p>${city.name}'s food scene is a journey in itself. From Michelin-starred restaurants to hidden local gems, the city offers an extraordinary range of dining experiences that reflect its cultural diversity.</p>

                <!-- Luxury Experiences -->
                <h2>Luxury Experiences in ${city.name}</h2>
                <p>Indulge in the finest that ${city.name} has to offer with these exclusive experiences:</p>
                
                <h3>Michelin-Starred Dining</h3>
                <p>Savor culinary masterpieces at the city's most acclaimed restaurants, where world-renowned chefs create unforgettable dining experiences.</p>
                
                <h3>Private Tours</h3>
                <p>Explore ${city.name} in style with personalized guided tours that offer insider access to exclusive locations and behind-the-scenes experiences.</p>
                
                <h3>Luxury Shopping</h3>
                <p>Discover the world's most prestigious brands in ${city.name}'s exclusive shopping districts, where personal shoppers and VIP services await.</p>

                <!-- Ad Before Footer -->
                <div class="ad-container">
                    <div class="ad-label">Advertisement</div>
                </div>

                <!-- Travel Tips -->
                <h2>Travel Tips for ${city.name}</h2>
                
                <h3>Best Time to Visit</h3>
                <p>${city.bestTime}</p>
                
                <h3>Getting Around</h3>
                <p>${city.name} offers excellent transportation options, from world-class metro systems to premium car services. For luxury travelers, we recommend private transfers and chauffeur services for the ultimate convenience.</p>
                
                <h3>Budget Estimates</h3>
                <p>For a luxury experience in ${city.name}, budget approximately $500-1000 per day for accommodations, $200-400 for fine dining, and $300-500 for experiences and shopping.</p>
                
                <h3>Local Etiquette</h3>
                <p>${city.name} welcomes international visitors with open arms. A few key tips: dress elegantly for fine dining, learn a few basic phrases in ${city.language}, and always confirm service charges at upscale establishments.</p>

                <!-- FAQ Section with Schema -->
                <section class="faq-section">
                    <h2>Frequently Asked Questions About ${city.name}</h2>
                    
                    <div class="faq-item">
                        <div class="faq-question">How many days should you spend in ${city.name}?</div>
                        <div class="faq-answer">We recommend spending at least 4-5 days in ${city.name} to experience the main attractions while allowing time for luxury experiences and exploration of different neighborhoods.</div>
                    </div>
                    
                    <div class="faq-item">
                        <div class="faq-question">What is the best time to visit ${city.name}?</div>
                        <div class="faq-answer">${city.bestTime} offers the most pleasant weather and optimal conditions for luxury travel and outdoor activities.</div>
                    </div>
                    
                    <div class="faq-item">
                        <div class="faq-question">Is ${city.name} expensive for tourists?</div>
                        <div class="faq-answer">${city.name} offers experiences at various price points. For luxury travelers, expect premium pricing for 5-star accommodations, fine dining, and exclusive experiences, reflecting the city's world-class standards.</div>
                    </div>
                    
                    <div class="faq-item">
                        <div class="faq-question">What are the must-visit luxury hotels in ${city.name}?</div>
                        <div class="faq-answer">The most prestigious hotels include ${city.luxuryHotels.slice(0, 3).join(', ')} and other world-class properties offering unparalleled service and amenities.</div>
                    </div>
                </section>

                <!-- FAQ Schema -->
                <script type="application/ld+json">
                {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "How many days should you spend in ${city.name}?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "We recommend spending at least 4-5 days in ${city.name} to experience the main attractions while allowing time for luxury experiences and exploration of different neighborhoods."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "What is the best time to visit ${city.name}?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "${city.bestTime} offers the most pleasant weather and optimal conditions for luxury travel and outdoor activities."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Is ${city.name} expensive for tourists?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "${city.name} offers experiences at various price points. For luxury travelers, expect premium pricing for 5-star accommodations, fine dining, and exclusive experiences, reflecting the city's world-class standards."
                            }
                        }
                    ]
                }
                </script>
            </main>

            <!-- Sidebar -->
            <aside class="sidebar">
                <!-- Sticky Sidebar Ad -->
                <div class="ad-sidebar">
                    <div class="ad-label">Advertisement</div>
                    <!-- AdSense code will go here -->
                </div>
                
                <!-- Related Cities -->
                <div class="related-cities">
                    <h3>Popular Destinations</h3>
                    <ul class="related-list">
                        ${generateRelatedCities(city.id)}
                    </ul>
                </div>
                
                <!-- Luxury Hotels Widget -->
                <div class="widget">
                    <h3>Top Luxury Hotels</h3>
                    <ul class="hotel-list">
                        ${city.luxuryHotels.map(hotel => `<li><a href="/hotels/${slugify(hotel)}.html">${hotel}</a></li>`).join('')}
                    </ul>
                </div>
            </aside>
        </div>
    </div>

    <!-- Footer -->
    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div>
                    <h4>Premium Travel</h4>
                    <p>Curated luxury travel guides for the discerning traveler.</p>
                </div>
                <div>
                    <h4>Destinations</h4>
                    <ul>
                        <li><a href="/cities/new-york.html">New York</a></li>
                        <li><a href="/cities/paris.html">Paris</a></li>
                        <li><a href="/cities/tokyo.html">Tokyo</a></li>
                        <li><a href="/cities/london.html">London</a></li>
                        <li><a href="/cities/dubai.html">Dubai</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="/travel-tips/">Travel Tips</a></li>
                        <li><a href="/luxury-hotels/">Luxury Hotels</a></li>
                        <li><a href="/about/">About Us</a></li>
                        <li><a href="/contact/">Contact</a></li>
                        <li><a href="/privacy/">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Follow Us</h4>
                    <div class="social-links">
                        <a href="#" aria-label="Instagram">📸</a>
                        <a href="#" aria-label="Facebook">📘</a>
                        <a href="#" aria-label="Twitter">🐦</a>
                        <a href="#" aria-label="Pinterest">📌</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Premium Travel Guide. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="/js/main.js"></script>
    <script src="/js/ads.js"></script>
    <script>
        // Initialize AdSense
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</body>
</html>`;

    return template;
}

function generateLuxuryHotelsList(hotels) {
    return hotels.map(hotel => `
        <h3>${hotel}</h3>
        <p>Experience unparalleled luxury at ${hotel}, where impeccable service meets sophisticated design. This prestigious property offers exquisite accommodations, world-class dining, and exclusive amenities that define the pinnacle of hospitality in the city.</p>
    `).join('');
}

function generateNeighborhoodsList(neighborhoods) {
    return neighborhoods.map(neighborhood => `
        <h3>${neighborhood}</h3>
        <p>${neighborhood} offers a unique blend of luxury accommodations, fine dining, and exclusive shopping. This prestigious area is favored by discerning travelers seeking the ultimate ${neighborhood} experience.</p>
    `).join('');
}

function generateAttractionsList(attractions) {
    return attractions.map(attraction => `
        <h3>${attraction}</h3>
        <p>${attraction} stands as one of ${attraction}'s most iconic landmarks, offering visitors a glimpse into the city's rich history and culture. VIP tours and exclusive access experiences are available for luxury travelers.</p>
    `).join('');
}

function generateRelatedCities(currentCityId) {
    const related = relatedCities[currentCityId] || ['paris', 'london', 'rome', 'barcelona', 'tokyo'];
    return related.map(cityId => {
        const city = cities.find(c => c.id === cityId);
        return city ? `<li><a href="/cities/${city.id}.html">${city.name}</a></li>` : '';
    }).join('');
}

function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Generate all city pages
async function generateAllCities() {
    console.log('🚀 Generating city pages...');
    
    // Ensure cities directory exists
    await fs.ensureDir(path.join(__dirname, '../cities'));
    
    for (const city of cities) {
        const content = generateCityPage(city);
        const filePath = path.join(__dirname, `../cities/${city.id}.html`);
        await fs.writeFile(filePath, content);
        console.log(`✅ Generated: ${city.name}`);
    }
    
    console.log('✨ All city pages generated successfully!');
}

generateAllCities().catch(console.error);