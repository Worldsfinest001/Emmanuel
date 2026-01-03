// ============================================
// Core Application Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initTheme();
    initNavigation();
    initScrollEffects();
    initContactForm();
    initScrollToTop();
    initChatbot();
    initCurrentYear();
    initProjectAnimations();
});

// ============================================
// Loading Screen
// ============================================

function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('loaded');
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// ============================================
// Theme Management
// ============================================

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches);
    
    // Apply theme
    if (isDark) {
        document.body.classList.add('dark-theme');
    }
    
    // Theme toggle interaction
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-theme');
        
        localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
        
        // Add smooth transition
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
    });
}

// ============================================
// Navigation
// ============================================

function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Scroll Effects
// ============================================

function initScrollEffects() {
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        updateScrollTopButton();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 100;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// Project Animations
// ============================================

function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    projectCards.forEach(card => {
        observer.observe(card);
    });
}

// ============================================
// Contact Form
// ============================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Validate required fields
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--color-error)';
            } else {
                field.style.borderColor = '';
            }
        });
        
        if (!isValid) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Show loading state
        submitButton.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i>';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Success - show confirmation
            showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            setTimeout(() => {
                form.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        }, 1500);
    });
    
    function showFormMessage(message, type) {
        if (!formMessage) return;
        
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// ============================================
// Scroll to Top Button
// ============================================

function initScrollToTop() {
    const scrollButton = document.getElementById('scrollTop');
    
    if (!scrollButton) return;
    
    function updateScrollTopButton() {
        if (window.scrollY > 500) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    }
    
    // Initial check
    updateScrollTopButton();
    
    // Update on scroll
    window.addEventListener('scroll', updateScrollTopButton);
    
    // Scroll to top
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Fixed Chatbot Implementation
// ============================================

function initChatbot() {
    const chatbot = {
        container: document.getElementById('chatbotContainer'),
        toggle: document.getElementById('chatbotToggle'),
        close: document.getElementById('chatbotClose'),
        minimize: document.getElementById('chatbotMinimize'),
        messages: document.getElementById('chatbotMessages'),
        input: document.getElementById('chatbotInput'),
        send: document.getElementById('chatbotSend'),
        suggestions: document.querySelectorAll('.suggestion'),
        overlay: document.getElementById('chatbotOverlay'),
        
        state: {
            isOpen: false,
            isMinimized: false
        },
        
        init() {
            // Event listeners
            this.toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleChatbot();
            });
            
            this.close.addEventListener('click', () => this.closeChatbot());
            this.minimize.addEventListener('click', () => this.minimizeChatbot());
            this.send.addEventListener('click', () => this.sendMessage());
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
            
            // Close chatbot when clicking outside
            document.addEventListener('click', (e) => {
                if (this.state.isOpen && 
                    !this.container.contains(e.target) && 
                    !this.toggle.contains(e.target) &&
                    !this.overlay.contains(e.target)) {
                    this.closeChatbot();
                }
            });
            
            // Close chatbot when pressing Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.state.isOpen) {
                    this.closeChatbot();
                }
            });
            
            // Overlay click to close
            this.overlay.addEventListener('click', () => this.closeChatbot());
            
            // Quick suggestions
            this.suggestions.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const question = e.target.getAttribute('data-question');
                    this.addMessage(question, 'user');
                    this.processMessage(question);
                });
            });
            
            // Prevent clicks inside chatbot from closing it
            this.container.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        },
        
        toggleChatbot() {
            this.state.isOpen = !this.state.isOpen;
            
            if (this.state.isOpen) {
                this.container.classList.add('active');
                this.overlay.classList.add('active');
                this.input.focus();
                this.scrollToBottom();
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                this.closeChatbot();
            }
        },
        
        closeChatbot() {
            this.state.isOpen = false;
            this.state.isMinimized = false;
            this.container.classList.remove('active');
            this.container.classList.remove('minimized');
            this.overlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        },
        
        minimizeChatbot() {
            this.state.isMinimized = !this.state.isMinimized;
            this.container.classList.toggle('minimized');
            
            if (!this.state.isMinimized) {
                this.input.focus();
                this.scrollToBottom();
            }
        },
        
        sendMessage() {
            const message = this.input.value.trim();
            if (!message) return;
            
            this.addMessage(message, 'user');
            this.input.value = '';
            this.processMessage(message);
        },
        
        processMessage(message) {
            const cleanMessage = message.toLowerCase();
            let response = "I'm here to discuss frontend development work. You can ask about my projects, skills, or services.";
            
            // Simple responses for frontend focus
            if (cleanMessage.includes('frontend') || cleanMessage.includes('react') || cleanMessage.includes('javascript')) {
                response = "I specialize in modern frontend development with React, JavaScript, and responsive CSS. My focus is on creating clean, performant user interfaces.";
            } else if (cleanMessage.includes('project') || cleanMessage.includes('work')) {
                response = "I've built various frontend projects including real estate websites, e-commerce UIs, data dashboards, and task management apps. Check out my projects section!";
            } else if (cleanMessage.includes('skill') || cleanMessage.includes('technology')) {
                response = "My technical skills include HTML5, CSS3, JavaScript (ES6+), React, responsive design, performance optimization, and accessibility best practices.";
            } else if (cleanMessage.includes('service') || cleanMessage.includes('hire')) {
                response = "I offer custom website development, responsive design implementation, performance optimization, and UI development from design files.";
            } else if (cleanMessage.includes('real estate') || cleanMessage.includes('isreal')) {
                response = "Yes! I built a modern real estate website with property listings and filtering. You can view it live at https://isreal1.netlify.app/";
            }
            
            setTimeout(() => {
                this.addMessage(response, 'bot');
            }, 500);
        },
        
        addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.textContent = text;
            
            messageDiv.appendChild(contentDiv);
            this.messages.appendChild(messageDiv);
            
            this.scrollToBottom();
        },
        
        scrollToBottom() {
            this.messages.scrollTop = this.messages.scrollHeight;
        }
    };
    
    chatbot.init();
}

// ============================================
// Current Year in Footer
// ============================================

function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}
// ============================================
// Google Forms Integration
// ============================================

function initContactForm() {
    // Since we're using Google Forms iframe, we don't need form handling
    // But we can add some interactivity
    
    // Add loading state to iframe
    const iframe = document.querySelector('.google-form-container iframe');
    if (iframe) {
        iframe.addEventListener('load', function() {
            console.log('Google Form loaded successfully');
            
            // Add a subtle animation when form loads
            const container = this.parentElement;
            container.style.opacity = '0';
            container.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                container.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }, 100);
        });
        
        iframe.addEventListener('error', function() {
            console.error('Failed to load Google Form');
            
            // Show fallback message
            const container = this.parentElement;
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.innerHTML = `
                <div style="text-align: center; padding: var(--space-xl);">
                    <i class='bx bx-error' style="font-size: 3rem; color: var(--color-error); margin-bottom: var(--space-md);"></i>
                    <h3>Form Loading Error</h3>
                    <p>Unable to load the contact form. Please try one of the alternative options below.</p>
                </div>
            `;
            
            container.innerHTML = '';
            container.appendChild(errorDiv);
        });
    }
    
    // Track form opens
    const formLinks = document.querySelectorAll('a[href*="forms.google.com"], a[href*="docs.google.com/forms"]');
    formLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Google Form opened via link');
            // You could add Google Analytics tracking here
            // gtag('event', 'form_open', { method: 'direct_link' });
        });
    });
}