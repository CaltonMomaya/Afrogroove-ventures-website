   // Mobile Navigation
        const hamburger = document.getElementById('hamburger');
        const navMobile = document.getElementById('navMobile');
        const mobileDropdown = document.getElementById('mobileDropdown');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMobile.classList.toggle('active');
        });
        
        mobileDropdown.addEventListener('click', (e) => {
            e.preventDefault();
            mobileDropdown.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.nav-mobile a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navMobile.classList.remove('active');
            });
        });
        
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        });
        
        // Modal
        const enquiryModal = document.getElementById('enquiryModal');
        const closeModal = document.getElementById('closeModal');
        const enquiryLinks = document.querySelectorAll('a[href="#enquiry"]');
        
        enquiryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                enquiryModal.classList.add('active');
            });
        });
        
        closeModal.addEventListener('click', () => {
            enquiryModal.classList.remove('active');
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === enquiryModal) {
                enquiryModal.classList.remove('active');
            }
        });
        
        // Form Submission
        const contactForm = document.getElementById('contactForm');
        const enquiryForm = document.getElementById('enquiryForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
        
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your enquiry! We will get back to you within 24 hours.');
            enquiryForm.reset();
            enquiryModal.classList.remove('active');
        });
        
        // Particle Animation
        const particlesContainer = document.getElementById('particles');
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size and position
            const size = Math.random() * 100 + 50;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            particle.style.width = `${size}px`;
            particle.style.height = '2px';
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Random rotation
            const rotation = Math.random() * 360;
            particle.style.transform = `rotate(${rotation}deg)`;
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }
        
        // Create particles at intervals
        setInterval(createParticle, 300);
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#enquiry') return;
                
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
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
                aboutPage.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        backButtonAbout.addEventListener('click', () => {
            aboutPage.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Packages Page Functionality
        const packagesPage = document.getElementById('packagesPage');
        const packagesLink = document.getElementById('packagesLink');
        const backButtonPackages = document.getElementById('backButtonPackages');
        
        packagesLink.addEventListener('click', (e) => {
            e.preventDefault();
            packagesPage.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        backButtonPackages.addEventListener('click', () => {
            packagesPage.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Blog Page Functionality
        const blogPage = document.getElementById('blogPage');
        const blogLinks = document.querySelectorAll('#blogLink, #blogLinkMobile');
        const backButtonBlog = document.getElementById('backButtonBlog');
        
        blogLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                blogPage.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        backButtonBlog.addEventListener('click', () => {
            blogPage.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Blog Detail Pages Functionality
        const readMoreButtons = document.querySelectorAll('.read-more');
        
        readMoreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const blogId = button.getAttribute('data-blog');
                const blogDetailPage = document.getElementById(`blogDetail${blogId}`);
                const backButton = document.getElementById(`backButtonBlogDetail${blogId}`);
                
                if (blogDetailPage) {
                    blogDetailPage.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    // Set up back button functionality
                    backButton.addEventListener('click', () => {
                        blogDetailPage.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    });
                }
            });
        });