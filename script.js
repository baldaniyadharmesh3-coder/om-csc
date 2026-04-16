/**
 * Om CSC & Mobile Accessories - Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const body = document.body;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    body.className = savedTheme;
    updateThemeIcons(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.className;
        const newTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode';
        
        body.className = newTheme;
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    });

    function updateThemeIcons(theme) {
        if (theme === 'dark-mode') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
        lucide.createIcons(); // Re-initialize icons if needed
    }

    // 3. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // 4. Form Submissions
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(appointmentForm);
            const name = formData.get('name') || document.getElementById('name').value;
            
            // Show premium success feedback
            showFeedback(`Thank you, ${name}! Your booking request has been sent. We will call you soon.`);
            appointmentForm.reset();
        });
    }

    const partsForm = document.getElementById('parts-form');
    if (partsForm) {
        partsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const model = document.getElementById('phone-model').value;
            
            showFeedback(`Inquiry for ${model} parts received. Our team will check availability and notify you.`);
            partsForm.reset();
        });
    }

    // 5. Scroll Reveal Animation (Simple)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.service-card, .product-item, .form-card');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // 6. Mobile Menu (Simple toggle)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'var(--bg-card)';
                navLinks.style.flexDirection = 'column';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid var(--border)';
            }
        });
    }

    // Helper: Feedback Toast
    function showFeedback(message) {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '100px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = 'var(--primary)';
        toast.style.color = 'white';
        toast.style.padding = '1rem 2rem';
        toast.style.borderRadius = '50px';
        toast.style.boxShadow = 'var(--shadow)';
        toast.style.zIndex = '2000';
        toast.innerText = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
});
