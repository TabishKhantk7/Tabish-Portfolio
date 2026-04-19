document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it has animated in
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // 2. Interactive Glow, Hero Dots & Custom Cursor
    const hero = document.querySelector('.hero');
    const cursor = document.querySelector('.custom-cursor');

    // Add hover effect for clickables
    if (cursor) {
        const clickables = document.querySelectorAll('a, button, .btn, .project-card, .other-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover-link'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover-link'));
            
            // Navigate to project page if clicking a card
            if (el.classList.contains('project-card') || el.classList.contains('other-card')) {
                el.addEventListener('click', () => {
                    const id   = el.dataset.project     || 'portfolio';
                    const name = el.dataset.projectName || 'Portfolio';
                    window.location.href = `project.html?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`;
                });
            }
        });
    }
    
    document.addEventListener('mousemove', (e) => {
        // Custom Cursor movement
        if (cursor) {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        }

        if (hero) {
            const rect = hero.getBoundingClientRect();
            // Check if mouse is hovering over the hero section
            if (e.clientY <= rect.bottom && e.clientY >= rect.top) {
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                hero.style.setProperty('--mouse-x', `${x}px`);
                hero.style.setProperty('--mouse-y', `${y}px`);
            }
        }
    });

    // Reset mouse position when leaving window
    document.addEventListener('mouseleave', () => {
        if (hero) {
            hero.style.setProperty('--mouse-x', `-1000px`);
            hero.style.setProperty('--mouse-y', `-1000px`);
        }
    });

    // 3. Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Interactive 3D Gallery Rotation
    const showcase = document.querySelector('.gallery-showcase');
    const spinner = document.querySelector('.gallery-spinner');
    const gallerySection = document.querySelector('.gallery');
    
    if (showcase && spinner) {
        let isDown = false;
        let startX, startY;
        let dragAngleY = 0;      // angle from drag
        let scrollAngleY = 0;    // angle from scroll
        let dragAngleX = 0;      // X tilt from drag
        let hoverAngleX = 0;     // X tilt from hover
        let hoverAngleY = 0;     // Y nudge from hover
        const BASE_X = -5;       // base tilt

        // Helper: apply combined transform
        function applyTransform() {
            const totalY = dragAngleY + scrollAngleY + hoverAngleY;
            const totalX = BASE_X + dragAngleX + hoverAngleX;
            const clampedX = Math.max(-30, Math.min(20, totalX));
            spinner.style.transform = `rotateX(${clampedX}deg) rotateY(${totalY}deg)`;
        }

        // ── Drag (mouse) ────────────────────────────────────────────
        let prevDragY = 0, prevDragX = 0;

        showcase.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX;
            startY = e.pageY;
            showcase.style.cursor = 'grabbing';
        });
        
        const finishDrag = () => {
            if (isDown) {
                prevDragY = dragAngleY;
                prevDragX = dragAngleX;
            }
            isDown = false;
            showcase.style.cursor = 'grab';
        };

        showcase.addEventListener('mouseleave', finishDrag);
        window.addEventListener('mouseup', finishDrag);
        
        showcase.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const walkX = (e.pageX - startX) * 0.5;
            const walkY = (e.pageY - startY) * 0.2;
            dragAngleY = prevDragY + walkX;
            dragAngleX = prevDragX - walkY;
            applyTransform();
        });

        // ── Hover tilt (no drag needed) ──────────────────────────────
        showcase.addEventListener('mousemove', (e) => {
            if (isDown) return; // skip during drag
            const rect = showcase.getBoundingClientRect();
            // Normalize: -1 to +1 from center
            const nx = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
            const ny = ((e.clientY - rect.top)  / rect.height) * 2 - 1;
            hoverAngleY = nx * 8;   // max ±8deg Y nudge
            hoverAngleX = -ny * 5;  // max ±5deg X tilt
            applyTransform();
        });

        showcase.addEventListener('mouseleave', () => {
            // Smoothly reset hover angles
            hoverAngleY = 0;
            hoverAngleX = 0;
            if (!isDown) applyTransform();
        });

        // ── Scroll rotation ──────────────────────────────────────────
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            if (!gallerySection) return;
            const rect = gallerySection.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;

            if (inView) {
                const delta = window.scrollY - lastScrollY;
                // Each pixel of scroll ~ 0.12 deg rotation
                scrollAngleY += delta * 0.12;
                applyTransform();
            }
            lastScrollY = window.scrollY;
        }, { passive: true });

        // ── Touch support ────────────────────────────────────────────
        showcase.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
        });
        window.addEventListener('touchend', finishDrag);
        showcase.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const walkX = (e.touches[0].pageX - startX) * 0.8;
            const walkY = (e.touches[0].pageY - startY) * 0.3;
            dragAngleY = prevDragY + walkX;
            dragAngleX = prevDragX - walkY;
            applyTransform();
        });
    }
});
