// Modern Portfolio Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Ensure all content is visible by default
    const allContent = document.querySelectorAll('body *');
    allContent.forEach(element => {
        if (getComputedStyle(element).opacity === '0') {
            element.style.opacity = '1';
        }
    });
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            navMenu?.classList.remove('active');
            navToggle?.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu?.classList.remove('active');
            navToggle?.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .contact-link, .quick-link, .publication-link, .award-link, .teaching-link, .cv-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add typing effect to hero title (optional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.location.pathname === '/index.html' || window.location.pathname === '/') {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Safer animation system with fallbacks
    const animateElements = document.querySelectorAll('.content-card, .publication-item, .experience-item, .award-item, .project-item, .teaching-item, .stat-item, .quick-link, .news-item');
    
    // First, ensure all elements are visible
    animateElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
    
    // Then apply animations only if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Set initial animation state and observe
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease-out';
            observer.observe(element);
        });
    }
    
    // Fallback: ensure all elements are visible after a delay
    setTimeout(() => {
        animateElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }, 1000);

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add counter animation to stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }, 30);
    };

    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target.textContent;
                const target = parseInt(number.replace(/\D/g, ''));
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });



    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = 'none';
            this.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.3)';
        });
        
        element.addEventListener('blur', function() {
            this.style.boxShadow = 'none';
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu?.classList.remove('active');
            navToggle?.classList.remove('active');
        }
    });

    // Gallery Slider Functionality
    const gallerySliders = document.querySelectorAll('.gallery-slider');
    
    gallerySliders.forEach(slider => {
        const slides = slider.querySelector('.gallery-slides');
        const slideItems = slider.querySelectorAll('.gallery-slide');
        const prevBtn = slider.querySelector('.gallery-slider-nav.prev');
        const nextBtn = slider.querySelector('.gallery-slider-nav.next');
        const indicators = slider.querySelectorAll('.gallery-indicator');
        
        if (slideItems.length <= 1) {
            // Hide navigation for single images
            prevBtn?.classList.add('hidden');
            nextBtn?.classList.add('hidden');
            slider.querySelector('.gallery-indicators')?.classList.add('hidden');
            return;
        }
        
        let currentSlide = 0;
        
        function updateSlider() {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
            
            // Update navigation buttons
            prevBtn.style.display = currentSlide === 0 ? 'none' : 'flex';
            nextBtn.style.display = currentSlide === slideItems.length - 1 ? 'none' : 'flex';
        }
        
        // Navigation button events
        prevBtn?.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });
        
        nextBtn?.addEventListener('click', () => {
            if (currentSlide < slideItems.length - 1) {
                currentSlide++;
                updateSlider();
            }
        });
        
        // Indicator events
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });
        
        // Initialize slider
        updateSlider();
    });

    // News Pagination
    const newsGrid = document.getElementById('newsGrid');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    
    if (newsGrid && prevBtn && nextBtn) {
        const itemsPerPage = 10;
        const newsItems = newsGrid.querySelectorAll('.news-item');
        const totalPages = Math.ceil(newsItems.length / itemsPerPage);
        let currentPage = 1;
        
        // Update pagination info
        totalPagesSpan.textContent = totalPages;
        
        function showPage(page) {
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            
            newsItems.forEach((item, index) => {
                if (index >= startIndex && index < endIndex) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Update pagination buttons
            prevBtn.disabled = page === 1;
            nextBtn.disabled = page === totalPages;
            
            // Update current page display
            currentPageSpan.textContent = page;
        }
        
        // Initialize first page
        showPage(1);
        
        // Event listeners for pagination buttons
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        });
    }

    // Visitor Counter Functionality
    function initVisitorCounter() {
        // Get or initialize counters from localStorage
        let visitorCount = parseInt(localStorage.getItem('visitorCount')) || 0;
        let pageViews = parseInt(localStorage.getItem('pageViews')) || 0;
        
        // Check if this is a new visitor (using sessionStorage)
        const hasVisited = sessionStorage.getItem('hasVisited');
        if (!hasVisited) {
            visitorCount++;
            sessionStorage.setItem('hasVisited', 'true');
            localStorage.setItem('visitorCount', visitorCount.toString());
        }
        
        // Always increment page views
        pageViews++;
        localStorage.setItem('pageViews', pageViews.toString());
        
        // Update the display with animation
        const visitorCountElement = document.getElementById('visitorCount');
        const pageViewsElement = document.getElementById('pageViews');
        
        if (visitorCountElement) {
            animateCounter(visitorCountElement, visitorCount);
        }
        
        if (pageViewsElement) {
            animateCounter(pageViewsElement, pageViews);
        }
    }
    
    // Initialize visitor counter
    initVisitorCounter();
});

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: var(--shadow-lg);
    }
    
    /* Prevent body scroll when mobile menu is open */
    body.menu-open {
        overflow: hidden;
    }
    
    /* Additional mobile menu improvements */
    @media (max-width: 1024px) {
        .nav-menu {
            gap: 1rem;
        }
        
        .nav-link {
            padding: 1rem;
            border-radius: 12px;
            font-size: 1.1rem;
            text-align: center;
            width: 100%;
        }
        
        .nav-link:hover {
            background: rgba(37, 99, 235, 0.1);
        }
    }
`;
document.head.appendChild(style); 