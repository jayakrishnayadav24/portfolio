// Netflix-Enhanced Portfolio JavaScript
let ticking = false;

// Draggable Profile Image
function initDraggableProfile() {
    const profileImage = document.getElementById('draggableProfile');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    function dragStart(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        if (e.target === profileImage || e.target.parentNode === profileImage) {
            isDragging = true;
            profileImage.classList.add('dragging');
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
        profileImage.classList.remove('dragging');
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            profileImage.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }
    }

    profileImage.addEventListener('mousedown', dragStart);
    profileImage.addEventListener('touchstart', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
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

// Netflix-Style Scroll Progress
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

// Netflix-Style Dramatic Scroll Effects
function netflixScrollEffects() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const sections = document.querySelectorAll('section');
    
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const sectionCenter = sectionTop + sectionHeight / 2;
        const viewportCenter = windowHeight / 2;
        
        // Calculate distance from viewport center
        const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
        const maxDistance = windowHeight;
        
        // Netflix-style scaling with more dramatic effects
        if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
            // Section is in viewport
            if (distanceFromCenter < windowHeight * 0.4) {
                // Section is near center - zoom in with glow effect
                const scale = 1 + (1 - distanceFromCenter / (windowHeight * 0.4)) * 0.05;
                const opacity = 1;
                section.style.transform = `scale(${scale})`;
                section.style.opacity = opacity;
                section.style.zIndex = 10;
                
                // Add glow effect for active section
                if (section.classList.contains('hero')) {
                    section.style.boxShadow = `0 0 50px rgba(229, 9, 20, ${0.3 * (1 - distanceFromCenter / (windowHeight * 0.4))})`;
                }
            } else {
                // Section is far from center - zoom out with fade
                const scale = Math.max(0.85, 1 - (distanceFromCenter / maxDistance) * 0.3);
                const opacity = Math.max(0.6, 1 - (distanceFromCenter / maxDistance) * 0.6);
                section.style.transform = `scale(${scale})`;
                section.style.opacity = opacity;
                section.style.zIndex = 1;
                section.style.boxShadow = 'none';
            }
        } else {
            // Section is out of viewport
            section.style.transform = 'scale(0.8)';
            section.style.opacity = '0.4';
            section.style.zIndex = 1;
            section.style.boxShadow = 'none';
        }
    });
    
    // Hero specific effects with Netflix-style parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroScale = Math.max(0.7, 1 - scrolled * 0.0006);
        const heroOpacity = Math.max(0.4, 1 - scrolled * 0.0008);
        const heroBlur = scrolled === 0 ? 0 : Math.min(5, scrolled * 0.01);
        
        hero.style.transform = `scale(${heroScale})`;
        hero.style.opacity = heroOpacity;
        hero.style.filter = `blur(${heroBlur}px)`;
    }
    
    updateScrollProgress();
}

// Enhanced Intersection Observer for Netflix-style reveals
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const netflixRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            entry.target.classList.add('revealed');
            
            // Staggered animations for cards with Netflix timing
            const cards = entry.target.querySelectorAll('.experience-card, .skill-category, .blog-platform, .contact-link');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 200); // Netflix-style stagger timing
            });
        }
    });
}, observerOptions);

// Navbar effects with Netflix-style transparency
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid rgba(229, 9, 20, 0.3)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.7)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.borderBottom = 'none';
    }
}

// Active navigation link highlighting with Netflix red
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Netflix-style cloud icon interactions
function enhanceCloudIcons() {
    const cloudIcons = document.querySelectorAll('.cloud-icon');
    
    cloudIcons.forEach(icon => {
        // Add hover sound effect simulation
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3) rotate(10deg)';
            this.style.boxShadow = '0 0 30px rgba(229, 9, 20, 0.6)';
            this.style.zIndex = '100';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 0 10px rgba(229, 9, 20, 0.2)';
            this.style.zIndex = '1';
        });
        
        // Add click ripple effect
        icon.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(229, 9, 20, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Optimized scroll handler with Netflix smoothness
function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            netflixScrollEffects();
            updateNavbar();
            updateActiveNavLink();
            ticking = false;
        });
        ticking = true;
    }
}

// Initialize Netflix-enhanced animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize draggable profile
    initDraggableProfile();
    
    // Observe sections for reveal animations
    document.querySelectorAll('.section-reveal, .zoom-section').forEach(el => {
        netflixRevealObserver.observe(el);
    });
    
    // Enhance cloud icons
    enhanceCloudIcons();
    
    // Add Netflix-style loading animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        document.body.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        document.body.style.opacity = '1';
        document.body.style.transform = 'scale(1)';
    }, 100);
    
    // Staggered hero content animation
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 500 + (index * 150));
    });
    // Ensure page starts at top on load or when restored from bfcache
    try {
        if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    } catch (e) {
        // ignore
    }
    window.scrollTo(0, 0);
});

// When page is shown (including bfcache restores), ensure scroll at top
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        window.scrollTo(0, 0);
    }
});

// Attach optimized scroll listener
window.addEventListener('scroll', handleScroll, { passive: true });

// Add Netflix-style CSS animations
const netflixStyles = document.createElement('style');
netflixStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #e50914 !important;
        text-shadow: 0 0 10px rgba(229, 9, 20, 0.5);
    }
    
    .nav-link.active::after {
        width: 100%;
        box-shadow: 0 0 5px #e50914;
    }
    
    /* Netflix-style glow effects */
    .experience-card:hover,
    .skill-category:hover,
    .blog-platform:hover {
        box-shadow: 0 0 30px rgba(229, 9, 20, 0.3) !important;
    }
    
    /* Enhanced button effects */
    .btn-primary:hover {
        box-shadow: 0 0 20px rgba(229, 9, 20, 0.5) !important;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
`;
document.head.appendChild(netflixStyles);

// Performance optimization: Debounce resize events
function debounce(func, wait = 20) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize with Netflix responsiveness
const handleResize = debounce(() => {
    // Recalculate animations on resize
    netflixScrollEffects();
}, 100);

window.addEventListener('resize', handleResize);
