// Enhanced Portfolio JavaScript with Modern Interactions and Animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeTypingAnimation();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeCounterAnimation();
    initializeSmoothScrolling();
    initializeScrollIndicator();
    initializeParallaxEffects();
    initializeLazyLoading();
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        offset: 100,
        once: true,
        easing: 'ease-out-cubic'
    });
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    // Handle scroll effects on navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            const icon = mobileMenu.querySelector('i');
            
            if (navLinks.classList.contains('mobile-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on nav links
    const navLinksElements = navLinks.querySelectorAll('a');
    navLinksElements.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50% 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const navLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
            if (entry.isIntersecting) {
                // Remove active class from all nav links
                navLinksElements.forEach(link => link.classList.remove('active'));
                // Add active class to current nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));
}

// Typing animation for hero section
function initializeTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) {
        console.log('Typing element not found');
        return;
    }
    
    const titles = [
          'Machine Learning Researcher',
        'AI Enthusiast', 
     
        'Software Engineer',
        'Tech Innovator',
        'Research Mentor'
    ];
    
    let currentTitleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentTitle = titles[currentTitleIndex];
        
        if (!isDeleting) {
            // Typing
            typingElement.textContent = currentTitle.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentTitle.length) {
                // Pause at end of word
                setTimeout(() => {
                    isDeleting = true;
                    typeText();
                }, 2500); // Longer pause to read
                return;
            }
            setTimeout(typeText, 80); // Typing speed
        } else {
            // Deleting
            typingElement.textContent = currentTitle.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                
                // Small pause before starting next word
                setTimeout(() => {
                    typeText();
                }, 500);
                return;
            }
            setTimeout(typeText, 40); // Faster deleting
        }
    }
    
    // Clear initial content and start animation
    typingElement.textContent = '';
    setTimeout(typeText, 1500);
}

// Enhanced scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger skill bars animation when skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                // Trigger counter animation when about section is visible
                if (entry.target.id === 'about') {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => observer.observe(section));
    
    // Observe individual elements that need animation
    const animateElements = document.querySelectorAll(
        '.stat-card, .skill-category, .project-card, .timeline-item, .cert-item'
    );
    animateElements.forEach(element => observer.observe(element));
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width') + '%';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, index * 200);
    });
}

// Counter animation for statistics
function initializeCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        counter.textContent = '0';
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll indicator functionality
function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
        
        // Hide scroll indicator after scrolling
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

// Parallax effects for background elements
function initializeParallaxEffects() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Lazy loading for images and heavy content
function initializeLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const src = element.getAttribute('data-lazy');
                
                if (element.tagName === 'IMG') {
                    element.src = src;
                } else {
                    element.style.backgroundImage = `url(${src})`;
                }
                
                element.classList.add('loaded');
                lazyLoadObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(element => lazyLoadObserver.observe(element));
}

// Enhanced project card interactions
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Contact form functionality (if needed in future)
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Here you would typically send the form data to a server
                // For now, we'll just simulate a submission
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            } catch (error) {
                // Show error message
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out'
    });
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Handle any scroll-based animations or updates here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Enable keyboard navigation for interactive elements
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
    
    // Quick navigation shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case '2':
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case '3':
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case '4':
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                break;
        }
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Theme preference detection (for future dark mode implementation)
function detectThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        return savedTheme;
    }
    
    return prefersDark ? 'dark' : 'light';
}

// Loading screen functionality
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        window.addEventListener('load', () => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        });
    }
}

// Error handling for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', () => {
            // Replace broken images with placeholder
            img.style.display = 'none';
        });
    });
});

// Print optimization
window.addEventListener('beforeprint', () => {
    // Expand all collapsed content for printing
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// Social media sharing functionality
function shareProject(projectTitle, projectUrl) {
    if (navigator.share) {
        navigator.share({
            title: `Check out ${projectTitle} by Laiba Noor`,
            url: projectUrl
        });
    } else {
        // Fallback to copying URL to clipboard
        navigator.clipboard.writeText(projectUrl).then(() => {
            showNotification('Project URL copied to clipboard!', 'success');
        });
    }
}

// Analytics tracking (placeholder for future implementation)
function trackEvent(eventName, eventData = {}) {
    // This would integrate with analytics services like Google Analytics
    console.log(`Event: ${eventName}`, eventData);
}

// Track important user interactions
document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button');
    if (target) {
        const action = target.textContent?.trim() || target.getAttribute('aria-label') || 'Unknown';
        trackEvent('click', { element: action });
    }
});

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLoadingScreen);
} else {
    initializeLoadingScreen();
}