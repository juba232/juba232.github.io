// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // ===== THEME TOGGLE FUNCTIONALITY =====
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;

    // Function to update theme icon
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    // Initialize theme from localStorage or system preference
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            body.classList.add(savedTheme + '-theme');
            updateThemeIcon(savedTheme);
        } else if (systemPrefersDark) {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        } else {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        }
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        }
    });

    // Initialize theme on page load
    initializeTheme();

    // ===== BOTTOM NAV ACTIVE STATE =====
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    function setActiveNavItem() {
        let currentSection = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#${currentSection}` || (currentSection === 'home' && href === '#home')) {
                item.classList.add('active');
            }
        });
    }

    // Set active nav item on scroll
    window.addEventListener('scroll', setActiveNavItem);

    // Replace the smooth scrolling section in script.js with this:
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#home') return;
        
        e.preventDefault();
        const targetId = href;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.getElementById('bottom-nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
    // Helper function to get element offset
    Element.prototype.getOffsetTop = function() {
        let offsetTop = 0;
        let element = this;
        
        while(element) {
            offsetTop += element.offsetTop;
            element = element.offsetParent;
        }
        
        return offsetTop;
    };

    // Initialize active nav item on page load
    setActiveNavItem();
});
