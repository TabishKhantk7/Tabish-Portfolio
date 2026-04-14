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
        const clickables = document.querySelectorAll('a, button, .btn');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover-link'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover-link'));
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
    
    if (showcase && spinner) {
        let isDown = false;
        let startX, startY;
        let currentAngleY = 0;
        let prevAngleY = 0;
        let currentAngleX = -5; // Base tilt
        let prevAngleX = -5;

        showcase.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX;
            startY = e.pageY;
            showcase.style.cursor = 'grabbing';
        });
        
        const finishDrag = () => {
            if(isDown) {
                prevAngleY = currentAngleY;
                prevAngleX = currentAngleX;
            }
            isDown = false;
            showcase.style.cursor = 'grab';
        };

        showcase.addEventListener('mouseleave', finishDrag);
        window.addEventListener('mouseup', finishDrag);
        
        showcase.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX;
            const y = e.pageY;
            const walkX = (x - startX) * 0.5;
            const walkY = (y - startY) * 0.2; // Less sensitive for vertical tilt
            
            currentAngleY = prevAngleY + walkX;
            currentAngleX = prevAngleX - walkY; // Invert for natural tilt
            
            // Clamp X rotation to avoid flipping completely
            currentAngleX = Math.max(-25, Math.min(15, currentAngleX));
            
            spinner.style.transform = `rotateX(${currentAngleX}deg) rotateY(${currentAngleY}deg)`;
        });

        // Touch support
        showcase.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
        });
        window.addEventListener('touchend', finishDrag);
        showcase.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX;
            const y = e.touches[0].pageY;
            const walkX = (x - startX) * 0.8;
            const walkY = (y - startY) * 0.3;
            
            currentAngleY = prevAngleY + walkX;
            currentAngleX = prevAngleX - walkY;
            currentAngleX = Math.max(-25, Math.min(15, currentAngleX));
            
            spinner.style.transform = `rotateX(${currentAngleX}deg) rotateY(${currentAngleY}deg)`;
        });
    }
});
