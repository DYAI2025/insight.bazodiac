/**
 * BAZODIAC GSAP Interactions
 * Handles reveals, cursor, and data animations
 */

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const ring = document.getElementById('cursor-ring');
    const lens = document.getElementById('nebula-lens');
    const vig = document.getElementById('vignette');
    
    if (cursor && ring && lens && vig) {
        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
            gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.2 });
            gsap.to(lens, { x: e.clientX, y: e.clientY, duration: 1.2, ease: "power2.out" });
            vig.style.setProperty('--mouse-x', `${e.clientX}px`);
            vig.style.setProperty('--mouse-y', `${e.clientY}px`);
        });
    }

    document.querySelectorAll('.interactive').forEach(el => {
        el.addEventListener('mouseenter', () => ring?.classList.add('active'));
        el.addEventListener('mouseleave', () => ring?.classList.remove('active'));
    });

    // Scramble/Decode Animation
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    document.querySelectorAll('.decode-title').forEach(title => {
        const originalText = title.dataset.text || title.innerText;
        title.dataset.text = originalText; // Ensure it's set
        ScrollTrigger.create({
            trigger: title,
            start: "top 90%",
            onEnter: () => {
                let iteration = 0;
                const interval = setInterval(() => {
                    title.innerText = originalText.split("").map((char, index) => {
                        if(index < iteration) return originalText[index];
                        return chars[Math.floor(Math.random() * 44)];
                    }).join("");
                    if(iteration >= originalText.length) clearInterval(interval);
                    iteration += 1 / 3;
                }, 30);
            }
        });
    });

    // Coherence Index Simulation
    const coh = document.getElementById('coherence-indicator');
    if (coh) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const speed = Math.abs(window.scrollY - lastScroll);
            const val = (0.94 + (speed / 1000) + (new Date().getSeconds() / 1000)).toFixed(4);
            coh.innerText = `H: ${val}`;
            lastScroll = window.scrollY;
        });
    }

    // Initial Entrance
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 }});
    tl.to('.tech-label', { opacity: 1, y: 0, stagger: 0.2, delay: 0.5 })
      .to('.hero-title', { opacity: 1, y: 0 }, "-=1")
      .to('.hero-rule', { opacity: 1, width: 120 }, "-=0.8")
      .to('.hero-sub', { opacity: 1, y: 0 }, "-=0.8")
      .to('.hero-cta', { opacity: 1, y: 0 }, "-=0.8");

    // Generic Reveal Up
    document.querySelectorAll('.reveal-up').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Count Up
    document.querySelectorAll('.data-number').forEach(num => {
        const target = parseFloat(num.dataset.target);
        gsap.to({ val: 0 }, {
            scrollTrigger: { trigger: num, start: "top 90%" },
            val: target, duration: 2.5,
            onUpdate: function() {
                const decimals = (num.dataset.target || '').includes('.') ? (num.dataset.target.split('.')[1] || '').length : 0;
                num.innerText = `${num.dataset.prefix || ''}${this.targets()[0].val.toFixed(Math.max(decimals, 1))}${num.dataset.suffix || ''}`;
            }
        });
    });
});
