// Wetter News App - JavaScript

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('show');

    // Toggle icon
    const icon = menuToggle.querySelector('i');
    if (mobileMenu.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Weather Data (Demo Daten)
const weatherData = {
    current: {
        location: 'Berlin, Deutschland',
        temperature: 22,
        description: 'Sonnig',
        icon: 'fa-sun',
        wind: '15 km/h',
        humidity: '65%'
    },
    forecast: [
        { day: 'Mo', temp: 24, icon: 'fa-sun', desc: 'Sonnig', color: 'from-yellow-300 to-yellow-500' },
        { day: 'Di', temp: 26, icon: 'fa-sun', desc: 'Heiter', color: 'from-yellow-400 to-orange-400' },
        { day: 'Mi', temp: 23, icon: 'fa-cloud-sun', desc: 'Teils bewölkt', color: 'from-blue-300 to-gray-400' },
        { day: 'Do', temp: 19, icon: 'fa-cloud-rain', desc: 'Regnerisch', color: 'from-gray-400 to-gray-600' },
        { day: 'Fr', temp: 21, icon: 'fa-cloud-sun', desc: 'Wechselhaft', color: 'from-blue-300 to-blue-400' },
        { day: 'Sa', temp: 25, icon: 'fa-sun', desc: 'Sonnig', color: 'from-yellow-300 to-yellow-500' },
        { day: 'So', temp: 27, icon: 'fa-sun', desc: 'Sehr sonnig', color: 'from-yellow-400 to-orange-500' }
    ]
};

// Update Current Weather
function updateCurrentWeather() {
    document.getElementById('location').textContent = weatherData.current.location;
    document.getElementById('temperature').textContent = `${weatherData.current.temperature}°C`;
    document.getElementById('weatherDesc').textContent = weatherData.current.description;
    document.getElementById('weatherIcon').className = `fas ${weatherData.current.icon} text-7xl mb-4 weather-icon-animate`;
    document.getElementById('wind').textContent = weatherData.current.wind;
    document.getElementById('humidity').textContent = weatherData.current.humidity;
}

// Generate Forecast Cards
function generateForecast() {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';

    weatherData.forecast.forEach((day, index) => {
        const card = document.createElement('div');
        card.className = 'forecast-card card-reveal';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="bg-gradient-to-br ${day.color} rounded-lg p-4 mb-3">
                <i class="fas ${day.icon} text-white text-5xl"></i>
            </div>
            <div class="forecast-day">${day.day}</div>
            <div class="forecast-temp">${day.temp}°C</div>
            <div class="forecast-desc">${day.desc}</div>
        `;

        forecastContainer.appendChild(card);
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter Form Submit
const newsletterForm = document.querySelector('form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;

        if (email) {
            // Show success message
            alert(`Vielen Dank! Sie haben sich erfolgreich für unseren Newsletter angemeldet: ${email}`);
            e.target.reset();
        }
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all weather cards
document.querySelectorAll('.weather-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Simulate real-time weather updates
function simulateWeatherUpdate() {
    // Random temperature change
    const tempChange = Math.floor(Math.random() * 3) - 1;
    weatherData.current.temperature += tempChange;

    // Random weather conditions
    const conditions = [
        { desc: 'Sonnig', icon: 'fa-sun' },
        { desc: 'Wolkig', icon: 'fa-cloud' },
        { desc: 'Teils bewölkt', icon: 'fa-cloud-sun' },
        { desc: 'Leicht bewölkt', icon: 'fa-cloud-sun' }
    ];

    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    weatherData.current.description = randomCondition.desc;
    weatherData.current.icon = randomCondition.icon;

    updateCurrentWeather();
}

// Update weather every 30 seconds (demo)
setInterval(simulateWeatherUpdate, 30000);

// Add click effect to news cards
document.querySelectorAll('.weather-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Add hover effect to forecast cards
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.forecast-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f0f9ff';
            });

            card.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'white';
            });
        });
    }, 1000);
});

// Dynamic date and time display
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    const dateTimeString = now.toLocaleDateString('de-DE', options);

    // You can add this to the UI if needed
    console.log('Aktuelle Zeit:', dateTimeString);
}

updateDateTime();
setInterval(updateDateTime, 60000); // Update every minute

// Geolocation (optional - for future enhancement)
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                console.log('Standort:', lat, lon);
                // Here you could fetch real weather data based on coordinates
            },
            (error) => {
                console.log('Geolocation nicht verfügbar:', error.message);
            }
        );
    }
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    updateCurrentWeather();
    generateForecast();

    // Optional: Request location for personalized weather
    // Uncomment the line below to enable geolocation
    // getLocation();

    // Add fade-in animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    console.log('🌤️ Wetter News App geladen!');
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service Worker Registration (PWA - optional)
if ('serviceWorker' in navigator) {
    // Uncomment to enable PWA functionality
    /*
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registriert'))
            .catch(err => console.log('Service Worker Fehler:', err));
    });
    */
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Fehler aufgetreten:', e.message);
});

// Console styling
console.log(
    '%c🌤️ Wetter News App',
    'font-size: 20px; font-weight: bold; color: #2563eb;'
);
console.log(
    '%cEntwickelt mit HTML, CSS, JavaScript & Tailwind CSS',
    'font-size: 12px; color: #6b7280;'
);
