// ============================================
// Reduced Motion Check
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// ============================================
// Cursor Glow
// ============================================
(function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow || prefersReducedMotion.matches) return;

    // Hide on touch devices
    if ('ontouchstart' in window) return;

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        if (!glow.classList.contains('visible')) {
            glow.classList.add('visible');
        }
    });

    document.addEventListener('mouseleave', () => {
        glow.classList.remove('visible');
    });
})();

// ============================================
// Navigation: Show/Hide on Scroll
// ============================================
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hero = document.querySelector('.hero');
    if (!navbar || !hero) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                navbar.classList.remove('visible');
            } else {
                navbar.classList.add('visible');
            }
        },
        { threshold: 0.1 }
    );

    observer.observe(hero);
})();

// ============================================
// Smooth Scrolling
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (!target) return;

        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const isHero = targetId === '#hero';
        const offset = isHero ? 0 : target.offsetTop - navbarHeight;

        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    });
});

// ============================================
// Active Nav Link on Scroll
// ============================================
(function initActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    function updateActive() {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        let current = '';

        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - navbarHeight - 100) {
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

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
})();

// ============================================
// Scroll Reveal
// ============================================
(function initReveal() {
    const revealElements = Array.from(document.querySelectorAll('.reveal'));

    if (prefersReducedMotion.matches) {
        revealElements.forEach(el => el.classList.add('revealed'));
        return;
    }

    // Assign stagger index: group by parent, index within group
    const groups = new Map();
    revealElements.forEach(el => {
        const parent = el.parentElement;
        if (!groups.has(parent)) groups.set(parent, []);
        groups.get(parent).push(el);
    });
    groups.forEach(children => {
        children.forEach((child, i) => {
            child.dataset.revealIndex = i;
        });
    });

    let pending = new Set(revealElements);

    function checkReveals() {
        if (pending.size === 0) return;
        const vh = window.innerHeight;

        pending.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < vh + 50 && rect.bottom > -50) {
                const idx = parseInt(el.dataset.revealIndex) || 0;
                el.style.transitionDelay = (idx * 0.08) + 's';
                el.classList.add('revealed');
                pending.delete(el);
            }
        });

        if (pending.size === 0) {
            window.removeEventListener('scroll', onScroll);
        }
    }

    function onScroll() {
        requestAnimationFrame(checkReveals);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Check immediately on load
    checkReveals();
})();

// ============================================
// Stat Counter Animation
// ============================================
(function initCounters() {
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('.stat-callout').forEach(el => {
            const target = parseFloat(el.dataset.target);
            const prefix = el.dataset.prefix || '';
            const suffix = el.dataset.suffix || '';
            const decimals = parseInt(el.dataset.decimals) || 0;
            el.querySelector('.stat-number').textContent = prefix + target.toFixed(decimals) + suffix;
        });
        return;
    }

    const counters = document.querySelectorAll('.stat-callout');

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function animateCounter(el) {
        const target = parseFloat(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const decimals = parseInt(el.dataset.decimals) || 0;
        const duration = 2000;
        const numberEl = el.querySelector('.stat-number');
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            const current = target * eased;

            numberEl.textContent = prefix + current.toFixed(decimals) + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(el => observer.observe(el));
})();

// ============================================
// Project Card 3D Tilt
// ============================================
(function initTilt() {
    if (prefersReducedMotion.matches) return;

    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const rotateX = (y - 0.5) * -10;
            const rotateY = (x - 0.5) * 10;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            // Update glow position
            const glow = card.querySelector('.project-card-glow');
            if (glow) {
                glow.style.setProperty('--mouse-x', (x * 100) + '%');
                glow.style.setProperty('--mouse-y', (y * 100) + '%');
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
            card.style.transition = 'transform 0.4s ease';

            setTimeout(() => {
                card.style.transition = '';
            }, 400);
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = '';
        });
    });
})();

// ============================================
// Initialize
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
