/**
 * BAZODIAC GSAP Interactions
 * Handles reveals, cursor, and data animations
 */

gsap.registerPlugin(ScrollTrigger);


const cursor = document.getElementById('custom-cursor');
const lens = document.getElementById('nebula-lens');

window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to(lens, { x: e.clientX, y: e.clientY, duration: 1.2, ease: "power2.out" });
});

document.querySelectorAll('.interactive').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});


const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 }});
tl.to('.badge', { opacity: 1, y: 0, delay: 0.5 })
  .to('.hero-title', { opacity: 1, y: 0 }, "-=0.6")
  .to('.hero-title + div', { scaleX: 1, opacity: 1 }, "-=0.8")
  .to('.hero-sub', { opacity: 1, y: 0 }, "-=0.6")
  .to('.hero-cta', { opacity: 1, y: 0 }, "-=0.6");


const revealElements = document.querySelectorAll('.reveal-up, .section-title, .glass-card');
revealElements.forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15
    });
});


const dataNumbers = document.querySelectorAll('.data-number');
dataNumbers.forEach(num => {
    const target = parseFloat(num.getAttribute('data-target'));
    gsap.to(num, {
        scrollTrigger: {
            trigger: num,
            start: "top 90%"
        },
        innerText: target,
        duration: 2.5,
        ease: "power2.out",
        snap: { innerText: 0.1 },
        onUpdate: function() {
            num.innerText = '$' + parseFloat(num.innerText).toFixed(1) + 'B';
        }
    });
});


document.querySelectorAll('.architecture-layer').forEach(layer => {
    layer.addEventListener('mouseenter', () => {
        gsap.to(layer.querySelector('h4'), { color: '#D4AF37', x: 10, duration: 0.4 });
    });
    layer.addEventListener('mouseleave', () => {
        gsap.to(layer.querySelector('h4'), { color: '', x: 0, duration: 0.4 });
    });
});
