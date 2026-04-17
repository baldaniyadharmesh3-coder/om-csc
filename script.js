/**
 * Om CSC & Mobile Accessories
 * WhatsApp notifications → +91 9409481234
 */

const WA = '919409481234';

document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    body.className = savedTheme;
    updateIcons(savedTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = body.className === 'light-mode' ? 'dark-mode' : 'light-mode';
        body.className = newTheme;
        localStorage.setItem('theme', newTheme);
        updateIcons(newTheme);
    });

    function updateIcons(theme) {
        sunIcon.style.display  = theme === 'dark-mode' ? 'none'  : 'block';
        moonIcon.style.display = theme === 'dark-mode' ? 'block' : 'none';
        lucide.createIcons();
    }

    // --- FAQ Accordion ---
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            document.querySelectorAll('.faq-item').forEach(i => { if (i !== item) i.classList.remove('active'); });
            item.classList.toggle('active');
        });
    });

    // --- Appointment Form → WhatsApp ---
    const apptForm = document.getElementById('appointment-form');
    if (apptForm) {
        apptForm.addEventListener('submit', e => {
            e.preventDefault();
            const name    = document.getElementById('name').value.trim();
            const phone   = document.getElementById('phone').value.trim();
            const service = document.getElementById('service');
            const date    = document.getElementById('date').value;
            const time    = document.getElementById('time').value;
            const serviceText = service.options[service.selectedIndex].text;

            // Format date & time
            const d = new Date(date);
            const dateStr = isNaN(d) ? date : d.toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
            let timeStr = time;
            if (time) {
                const [h, m] = time.split(':');
                const hr = parseInt(h);
                timeStr = `${hr % 12 || 12}:${m} ${hr >= 12 ? 'PM' : 'AM'}`;
            }

            const msg =
                `🗓️ *NEW APPOINTMENT – Om CSC*\n\n` +
                `👤 Name: ${name}\n` +
                `📞 Phone: ${phone}\n` +
                `🛠️ Service: ${serviceText}\n` +
                `📅 Date: ${dateStr}\n` +
                `⏰ Time: ${timeStr}\n\n` +
                `_Sent from om-csc.vercel.app_`;

            toast(`✅ Booking submitted! Opening WhatsApp…`);
            apptForm.reset();
            setTimeout(() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank'), 700);
        });
    }

    // --- Parts Order Form → WhatsApp ---
    const partsForm = document.getElementById('parts-form');
    if (partsForm) {
        partsForm.addEventListener('submit', e => {
            e.preventDefault();
            const part  = document.getElementById('part-type');
            const model = document.getElementById('phone-model').value.trim();
            const desc  = document.getElementById('order-desc').value.trim();
            const partText = part.options[part.selectedIndex].text;

            const msg =
                `📦 *NEW PARTS ORDER – Om CSC*\n\n` +
                `📱 Phone Model: ${model}\n` +
                `🔩 Part Needed: ${partText}\n` +
                (desc ? `📝 Details: ${desc}\n` : '') +
                `\n_Sent from om-csc.vercel.app_`;

            toast(`✅ Parts inquiry sent for ${model}! Opening WhatsApp…`);
            partsForm.reset();
            setTimeout(() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank'), 700);
        });
    }

    // --- Order Parts Button → scroll to form ---
    const orderBtn = document.getElementById('order-parts-btn');
    if (orderBtn) {
        orderBtn.addEventListener('click', () => {
            const card = document.getElementById('parts-order-card');
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                card.style.outline = '3px solid var(--primary)';
                setTimeout(() => card.style.outline = '', 2000);
            }
        });
    }

    // --- Scroll Reveal ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .product-item, .form-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // --- Mobile Menu ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            const open = navLinks.style.display === 'flex';
            navLinks.style.display = open ? 'none' : 'flex';
            if (!open) {
                Object.assign(navLinks.style, {
                    position: 'absolute', top: '100%', left: '0',
                    width: '100%', backgroundColor: 'var(--bg-card)',
                    flexDirection: 'column', padding: '2rem',
                    borderBottom: '1px solid var(--border)'
                });
            }
        });
    }

    // --- Toast Helper ---
    function toast(msg) {
        const t = document.createElement('div');
        Object.assign(t.style, {
            position: 'fixed', bottom: '110px', left: '50%',
            transform: 'translateX(-50%)',
            background: '#25D366', color: '#fff',
            padding: '0.9rem 2rem', borderRadius: '50px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            zIndex: '9999', fontWeight: '600', fontSize: '0.95rem',
            whiteSpace: 'nowrap', maxWidth: '90vw', textAlign: 'center'
        });
        t.innerText = msg;
        document.body.appendChild(t);
        setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.5s'; setTimeout(() => t.remove(), 500); }, 3000);
    }
});
