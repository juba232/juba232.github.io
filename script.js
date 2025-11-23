// Enhanced responsive spacing and interactions
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupSmoothScroll();
        this.setupNavHighlight();
        this.setupProjectsToggle();
        this.setupSlideshows();
        this.setupContactForm();
        this.setupResponsiveBehaviors();
        this.setupAnimations();
    }

    // Theme Toggle Functionality
    setupTheme() {
        const themeSwitch = document.getElementById('themeSwitch');
        const currentTheme = localStorage.getItem('theme') || 'light';

        // Set initial theme
        document.documentElement.setAttribute('data-theme', currentTheme);
        this.updateThemeIcon(currentTheme);

        themeSwitch.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
        });
    }

    updateThemeIcon(theme) {
        const icon = themeSwitch.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    // Enhanced Smooth Scrolling with offset for fixed nav
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80; // Account for potential fixed elements
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Enhanced Navbar Section Highlighting with intersection observer
    setupNavHighlight() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        const navHeight = document.querySelector('.floating-nav').offsetHeight;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentSection = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href').substring(1) === currentSection) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: `-${navHeight}px 0px -${window.innerHeight - navHeight - 100}px 0px`,
            threshold: 0.1
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Projects Toggle Functionality
    setupProjectsToggle() {
        const toggleProjects = document.getElementById('toggleProjects');
        const hiddenProjects = document.getElementById('hiddenProjects');

        if (toggleProjects && hiddenProjects) {
            toggleProjects.addEventListener('click', () => {
                hiddenProjects.classList.toggle('show');
                
                // Update button text and focus for accessibility
                const showText = toggleProjects.querySelector('.show-text');
                const hideText = toggleProjects.querySelector('.hide-text');
                
                if (hiddenProjects.classList.contains('show')) {
                    showText.style.display = 'none';
                    hideText.style.display = 'inline';
                    // Focus on first hidden project for better UX
                    const firstHiddenProject = hiddenProjects.querySelector('.project-item');
                    if (firstHiddenProject) {
                        firstHiddenProject.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                } else {
                    showText.style.display = 'inline';
                    hideText.style.display = 'none';
                    // Scroll back to toggle button
                    toggleProjects.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        }
    }

    // Enhanced Slideshow Functionality with touch support
    setupSlideshows() {
        const slideshows = document.querySelectorAll('.slideshow-container');
        
        slideshows.forEach((slideshow, index) => {
            const slides = slideshow.querySelectorAll('.slide');
            const prevBtn = slideshow.querySelector('.slideshow-prev');
            const nextBtn = slideshow.querySelector('.slideshow-next');
            const dotsContainer = slideshow.parentElement.querySelector('.slideshow-dots');
            let currentSlide = 0;
            let slideInterval;
            
            // Create dots
            slides.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.className = 'dot';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(i));
                dotsContainer.appendChild(dot);
            });
            
            const dots = dotsContainer.querySelectorAll('.dot');
            
            this.goToSlide = (n) => {
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                
                currentSlide = (n + slides.length) % slides.length;
                
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            };
            
            const nextSlide = () => {
                this.goToSlide(currentSlide + 1);
            };
            
            const prevSlide = () => {
                this.goToSlide(currentSlide - 1);
            };
            
            // Auto-advance slides with pause on hover/touch
            const startSlideShow = () => {
                slideInterval = setInterval(nextSlide, 5000);
            };
            
            const pauseSlideShow = () => {
                clearInterval(slideInterval);
            };
            
            // Touch support for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            slideshow.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                pauseSlideShow();
            });
            
            slideshow.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startSlideShow();
            });
            
            const handleSwipe = () => {
                const swipeThreshold = 50;
                if (touchEndX < touchStartX - swipeThreshold) {
                    nextSlide();
                }
                if (touchEndX > touchStartX + swipeThreshold) {
                    prevSlide();
                }
            };
            
            // Button events
            nextBtn.addEventListener('click', () => {
                pauseSlideShow();
                nextSlide();
                startSlideShow();
            });
            
            prevBtn.addEventListener('click', () => {
                pauseSlideShow();
                prevSlide();
                startSlideShow();
            });
            
            // Pause on hover
            slideshow.addEventListener('mouseenter', pauseSlideShow);
            slideshow.addEventListener('mouseleave', startSlideShow);
            slideshow.addEventListener('focusin', pauseSlideShow);
            slideshow.addEventListener('focusout', startSlideShow);
            
            // Keyboard navigation
            slideshow.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') prevSlide();
                if (e.key === 'ArrowRight') nextSlide();
            });
            
            // Initialize
            this.goToSlide(0);
            startSlideShow();
        });
    }

    // Contact Form Handling
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(contactForm);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                // Simple validation
                if (!name || !email || !message) {
                    this.showNotification('Please fill in all fields.', 'error');
                    return;
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    this.showNotification('Please enter a valid email address.', 'error');
                    return;
                }
                
                // Simulate form submission
                this.showNotification('Thank you for your message! I will get back to you soon.', 'success');
                contactForm.reset();
            });
        }
    }

    // Enhanced responsive behaviors
    setupResponsiveBehaviors() {
        // Handle viewport changes
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Handle orientation changes on mobile
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleResize();
            }, 500);
        });
    }

    handleResize() {
        // Update any dynamic spacing or layouts
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Enhanced animations with intersection observer
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.project-item, .skill-category, .contact-item, .tool-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Enhanced notification system
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 12px;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        closeBtn.addEventListener('click', () => {
            notification.remove();
        });

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);

        document.body.appendChild(notification);
    }
}

// CV Download with enhanced feedback
function setupCVDownload() {
    const downloadCV = document.getElementById('downloadCV');
    if (downloadCV) {
        downloadCV.addEventListener('click', () => {
            // In a real scenario, this would link to your actual CV file
            const portfolio = new Portfolio();
            portfolio.showNotification('CV download starting...', 'info');
            
            // Simulate download delay
            setTimeout(() => {
                portfolio.showNotification('CV downloaded successfully!', 'success');
            }, 1000);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
    setupCVDownload();
    
    // Set initial viewport height for mobile
    portfolio.handleResize();
});

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification {
        animation: slideInRight 0.3s ease;
    }
`;
document.head.appendChild(notificationStyles);