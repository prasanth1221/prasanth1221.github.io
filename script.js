// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
            // Start animations
            animateOnScroll();
            typeEffect();
        }, 500);
    }, 1000);
});

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);
    
    // Update scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    scrollIndicator.style.width = progress + '%';
    
    // Reveal elements on scroll
    animateOnScroll();
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

document.querySelectorAll('.navbar a').forEach(item => {
    item.addEventListener('click', () => {
        menuToggle.checked = false;
    });
});

// Scroll Reveal Animation
function animateOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add preloader to body
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.prepend(preloader);
    
    // Add scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.prepend(scrollIndicator);
    
    // Add reveal class to section headings and content
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
    });
    
    document.querySelectorAll('.skills-box, .portfolio-box').forEach(box => {
        box.classList.add('reveal');
    });
});

// Typing effect for occupation
function typeEffect() {
    const occupations = ["AIML Engineer", "Web Developer", "Problem Solver", "Tech Enthusiast"];
    const element = document.querySelector('.home-content h3:nth-of-type(2) span');
    element.classList.add('typing');
    
    let occupationIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;
    
    function type() {
        const currentOccupation = occupations[occupationIndex];
        
        if (isDeleting) {
            element.textContent = currentOccupation.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 100;
        } else {
            element.textContent = currentOccupation.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 200;
        }
        
        if (!isDeleting && charIndex === currentOccupation.length) {
            isDeleting = true;
            typingDelay = 1000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            occupationIndex = (occupationIndex + 1) % occupations.length;
            typingDelay = 500; // Pause before typing next word
        }
        
        setTimeout(type, typingDelay);
    }
    
    setTimeout(type, 1000); // Start typing after 1 second
}

// Form submission
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const subject = this.querySelector('input[placeholder="Email Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Validate form (simple validation)
        if (!name || !email || !phone || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would normally send the form data to a server
        // For demonstration purposes, we'll just show a success message
        const submitBtn = this.querySelector('.btn');
        const originalText = submitBtn.value || submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate form submission
        setTimeout(() => {
            this.reset();
            submitBtn.textContent = 'Message Sent!';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 3000);
        }, 1500);
    });
}

// Project filtering for portfolio (optional functionality)
const portfolioContainer = document.querySelector('.portfolio-container');
if (portfolioContainer) {
    // Add filter buttons functionality if needed
    // For example, add filter buttons above portfolio-container
    const filterButtons = document.createElement('div');
    filterButtons.className = 'portfolio-filter';
    filterButtons.innerHTML = `
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="web">Web</button>
        <button class="filter-btn" data-filter="ml">ML/AI</button>
        <button class="filter-btn" data-filter="app">Apps</button>
    `;
    
    portfolioContainer.parentNode.insertBefore(filterButtons, portfolioContainer);
    
    // Add data-category attributes to portfolio boxes
    const categories = ['web', 'ml', 'app', 'web', 'ml', 'web'];
    document.querySelectorAll('.portfolio-box').forEach((box, index) => {
        if (categories[index]) {
            box.setAttribute('data-category', categories[index]);
        }
    });
    
    // Filter functionality
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            document.querySelectorAll('.portfolio-box').forEach(box => {
                if (filter === 'all' || box.getAttribute('data-category') === filter) {
                    box.style.display = 'block';
                } else {
                    box.style.display = 'none';
                }
            });
        });
    });
}

// Add skill progress animation
window.addEventListener('scroll', function() {
    const skillsSection = document.querySelector('.skills');
    
    if (!skillsSection) return;
    
    const sectionPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (sectionPosition < screenPosition) {
        document.querySelectorAll('.skill-progress').forEach(progress => {
            progress.style.width = progress.parentElement.getAttribute('data-progress') || progress.style.width;
        });
    }
});
