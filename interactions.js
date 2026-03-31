import { ConnectedVortex, ZodiacRing, RadarChart, FusionRing } from './engine.js';

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const cursor = document.getElementById('custom-cursor');
    const ring = document.getElementById('cursor-ring');
    const lens = document.getElementById('nebula-lens');
    const vig = document.getElementById('vignette');
    
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
        gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.2 });
        gsap.to(lens, { x: e.clientX, y: e.clientY, duration: 1.2, ease: "power2.out" });
        if (vig) {
            vig.style.setProperty('--mouse-x', `${e.clientX}px`);
            vig.style.setProperty('--mouse-y', `${e.clientY}px`);
        }
    });

    // Scramble/Decode Animation
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    document.querySelectorAll('.decode-title').forEach(title => {
        const originalText = title.dataset.text;
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

    // Count Up
    document.querySelectorAll('.data-number').forEach(num => {
        const target = parseFloat(num.dataset.target);
        gsap.to({ val: 0 }, {
            scrollTrigger: { trigger: num, start: "top 90%" },
            val: target, duration: 2.5,
            onUpdate: function() {
                const prefix = num.dataset.prefix || '';
                const suffix = num.dataset.suffix || '';
                const decimals = (num.dataset.target || '').includes('.') ? (num.dataset.target.split('.')[1] || '').length : 0;
                num.innerText = `${prefix}${this.targets()[0].val.toFixed(Math.max(decimals, 1))}${suffix}`;
            }
        });
    });

    // Initialize Canvas Components
    new ConnectedVortex('hero-vortex');
    new ConnectedVortex('cta-vortex', { dotColor: '212, 175, 55', cursorLineColor: '212, 175, 55' });
    new ZodiacRing('zodiac-ring');
    new ZodiacRing('cta-ring');
    new RadarChart('fufire-radar');
    if (document.getElementById('fusion-ring')) {
        new FusionRing('fusion-ring');
    }
});
