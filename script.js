// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');
const mobileDropdown = document.getElementById('mobileDropdown');

if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMobile.classList.toggle('active');
    });
}

if (mobileDropdown) {
    mobileDropdown.addEventListener('click', (e) => {
        e.preventDefault();
        mobileDropdown.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.nav-mobile a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMobile) {
            hamburger.classList.remove('open');
            navMobile.classList.remove('active');
        }
    });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }
    });
}

// Modal Functionality
const enquiryModal = document.getElementById('enquiryModal');
const closeModal = document.getElementById('closeModal');
const enquiryLinks = document.querySelectorAll('a[href="#enquiry"]');

enquiryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        if (enquiryModal) {
            enquiryModal.classList.add('active');
        }
    });
});

if (closeModal && enquiryModal) {
    closeModal.addEventListener('click', () => {
        enquiryModal.classList.remove('active');
    });
}

if (enquiryModal) {
    window.addEventListener('click', (e) => {
        if (e.target === enquiryModal) {
            enquiryModal.classList.remove('active');
        }
    });
}

// Form Submission with Email Functionality
const contactForm = document.getElementById('contactForm');
const enquiryForm = document.getElementById('enquiryForm');
const newsletterForm = document.getElementById('newsletterForm');

// Store newsletter subscribers
let newsletterSubscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];

// Simple email function using mailto
function sendEmail(to, subject, body) {
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    return true;
}

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name') || 'Visitor';
        const email = formData.get('email') || 'No email provided';
        const message = formData.get('message') || 'Hello, I am from your website';
        
        // Send email using mailto
        const emailBody = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\nHello, I am from your website`;
        sendEmail('beatkingcalty@gmail.com', `New Message from ${name}`, emailBody);
        
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Enquiry Form Submission
if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(enquiryForm);
        const name = formData.get('name') || 'Visitor';
        const email = formData.get('email') || 'No email provided';
        const service = formData.get('service') || 'General enquiry';
        const message = formData.get('message') || 'Hello, I am from your website';
        
        // Send email using mailto
        const emailBody = `Name: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}\n\nHello, I am from your website`;
        sendEmail('beatkingcalty@gmail.com', `New Enquiry for ${service}`, emailBody);
        
        alert('Thank you for your enquiry! We will get back to you within 24 hours.');
        enquiryForm.reset();
        
        if (enquiryModal) {
            enquiryModal.classList.remove('active');
        }
    });
}

// Newsletter Subscription
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email && !newsletterSubscribers.includes(email)) {
            newsletterSubscribers.push(email);
            localStorage.setItem('newsletterSubscribers', JSON.stringify(newsletterSubscribers));
            
            // Send welcome email to subscriber
            const welcomeBody = 'Thank you for subscribing to our newsletter! You will receive updates and news from beatkingcalty@gmail.com';
            sendEmail(email, 'Welcome to Our Newsletter!', welcomeBody);
            
            // Send notification to admin
            const adminBody = `New subscriber: ${email}\nTotal subscribers: ${newsletterSubscribers.length}`;
            sendEmail('beatkingcalty@gmail.com', 'New Newsletter Subscriber', adminBody);
            
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        } else {
            alert('You are already subscribed to our newsletter!');
        }
    });
}

// Function to send newsletter to all subscribers
function sendNewsletterToSubscribers(subject, message) {
    newsletterSubscribers.forEach(subscriber => {
        sendEmail(subscriber, subject, message);
    });
    alert(`Newsletter sent to ${newsletterSubscribers.length} subscribers!`);
}

// Particle Animation
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 100 + 50;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const rotation = Math.random() * 360;
        
        particle.style.width = `${size}px`;
        particle.style.height = '2px';
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.transform = `rotate(${rotation}deg)`;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode === particlesContainer) {
                particle.remove();
            }
        }, 3000);
    }
    
    setInterval(createParticle, 300);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#enquiry' || href === '#') return;
        
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// About Page Functionality
const aboutPage = document.getElementById('aboutPage');
const aboutLinks = document.querySelectorAll('#aboutLink, #aboutLinkMobile, #aboutLinkFooter');
const backButtonAbout = document.getElementById('backButtonAbout');

aboutLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        if (aboutPage) {
            aboutPage.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

if (backButtonAbout && aboutPage) {
    backButtonAbout.addEventListener('click', () => {
        aboutPage.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Packages Page Functionality
const packagesPage = document.getElementById('packagesPage');
const packagesLink = document.getElementById('packagesLink');
const backButtonPackages = document.getElementById('backButtonPackages');

if (packagesLink && packagesPage) {
    packagesLink.addEventListener('click', (e) => {
        e.preventDefault();
        packagesPage.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (backButtonPackages && packagesPage) {
    backButtonPackages.addEventListener('click', () => {
        packagesPage.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Blog Page Functionality
const blogPage = document.getElementById('blogPage');
const blogLinks = document.querySelectorAll('#blogLink, #blogLinkMobile');
const backButtonBlog = document.getElementById('backButtonBlog');

blogLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        if (blogPage) {
            blogPage.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

if (backButtonBlog && blogPage) {
    backButtonBlog.addEventListener('click', () => {
        blogPage.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Projects Hamburger Menu Functionality
const projectLinks = document.querySelectorAll('.nav-mobile a[data-project]');
projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectUrl = link.getAttribute('href');
        const projectName = link.textContent || link.getAttribute('data-project') || 'Project';
        
        if (projectUrl && projectUrl !== '#') {
            // Open in new window with specific features
            const projectWindow = window.open(projectUrl, `project_${projectName}`, 'width=1200,height=800,scrollbars=yes,resizable=yes');
            
            if (projectWindow) {
                // Add floating back button using postMessage
                projectWindow.addEventListener('load', function() {
                    try {
                        const backButton = projectWindow.document.createElement('button');
                        backButton.innerHTML = '← Back to Main Site';
                        backButton.style.cssText = `
                            position: fixed;
                            top: 20px;
                            left: 20px;
                            z-index: 10000;
                            background: #007bff;
                            color: white;
                            border: none;
                            padding: 12px 20px;
                            border-radius: 25px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: bold;
                            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                            transition: all 0.3s ease;
                            font-family: Arial, sans-serif;
                        `;
                        
                        backButton.onmouseover = function() {
                            this.style.background = '#0056b3';
                            this.style.transform = 'scale(1.05)';
                        };
                        
                        backButton.onmouseout = function() {
                            this.style.background = '#007bff';
                            this.style.transform = 'scale(1)';
                        };
                        
                        backButton.onclick = function() {
                            projectWindow.close();
                        };
                        
                        projectWindow.document.body.appendChild(backButton);
                    } catch (error) {
                        console.log('Could not add back button to external site');
                    }
                });
            }
            
            // Close mobile menu
            if (hamburger && navMobile) {
                hamburger.classList.remove('open');
                navMobile.classList.remove('active');
            }
        }
    });
});

// Blog Detail Pages Functionality - Fixed for all blogs
const readMoreButtons = document.querySelectorAll('.read-more');
readMoreButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const blogId = button.getAttribute('data-blog');
        const blogDetailPage = document.getElementById(`blogDetail${blogId}`);
        
        if (blogDetailPage) {
            blogDetailPage.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Set up back button functionality
            const backButton = document.getElementById(`backButtonBlogDetail${blogId}`);
            if (backButton) {
                // Remove any existing event listeners
                const newBackButton = backButton.cloneNode(true);
                backButton.parentNode.replaceChild(newBackButton, backButton);
                
                // Add new event listener
                newBackButton.addEventListener('click', () => {
                    blogDetailPage.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            }
        }
    });
});

// Initialize all blog detail back buttons
function initializeAllBlogBackButtons() {
    for (let i = 1; i <= 12; i++) {
        const backButton = document.getElementById(`backButtonBlogDetail${i}`);
        const blogDetailPage = document.getElementById(`blogDetail${i}`);
        
        if (backButton && blogDetailPage) {
            backButton.addEventListener('click', () => {
                blogDetailPage.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeAllBlogBackButtons();
    
    // Additional safety checks
    const allModals = document.querySelectorAll('.modal, [id$="Page"]');
    allModals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
});

// Fallback for dynamic content
document.addEventListener('click', function(e) {
    // Blog read more fallback
    if (e.target.classList.contains('read-more')) {
        const blogId = e.target.getAttribute('data-blog');
        const blogDetailPage = document.getElementById(`blogDetail${blogId}`);
        
        if (blogDetailPage && !blogDetailPage.classList.contains('active')) {
            blogDetailPage.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close pages when clicking outside content
    const activePages = document.querySelectorAll('.page-content.active, .modal.active');
    activePages.forEach(page => {
        if (e.target === page) {
            page.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Utility function to send newsletter (can be called from console)
window.sendNewsletter = function(subject, message) {
    if (newsletterSubscribers.length === 0) {
        alert('No subscribers yet!');
        return;
    }
    
    if (confirm(`Send newsletter to ${newsletterSubscribers.length} subscribers?`)) {
        sendNewsletterToSubscribers(subject, message);
    }
};

// View subscribers function
window.viewSubscribers = function() {
    console.log('Newsletter Subscribers:', newsletterSubscribers);
    alert(`Total subscribers: ${newsletterSubscribers.length}\n\nSubscribers: ${newsletterSubscribers.join(', ')}`);
};

// Clear subscribers function (for testing)
window.clearSubscribers = function() {
    if (confirm('Clear all subscribers?')) {
        newsletterSubscribers = [];
        localStorage.setItem('newsletterSubscribers', JSON.stringify([]));
        alert('Subscribers cleared!');
    }
};

// Enhanced email function with fallback
function enhancedSendEmail(to, subject, body) {
    // Try mailto first
    try {
        const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        return true;
    } catch (error) {
        console.error('Mailto failed:', error);
        
        // Fallback: Copy to clipboard
        const fullEmail = `To: ${to}\nSubject: ${subject}\n\n${body}`;
        navigator.clipboard.writeText(fullEmail).then(() => {
            alert('Email content copied to clipboard! Please paste it in your email client.');
        }).catch(() => {
            alert(`Please send email to: ${to}\nSubject: ${subject}\n\nMessage: ${body}`);
        });
        return false;
    }
}

// Make enhanced email function available globally
window.enhancedSendEmail = enhancedSendEmail;

console.log('BeatKingCalty Website JS loaded successfully!');