
(() => {
  const body = document.body;
  const cursor = document.getElementById('custom-cursor');
  const ring = document.getElementById('cursor-ring');
  const lens = document.getElementById('nebula-lens');
  const vignette = document.getElementById('vignette');

  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  if (!isCoarse && cursor && ring) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      ring.style.left = e.clientX + 'px';
      ring.style.top = e.clientY + 'px';
      if (lens) {
        lens.style.left = e.clientX + 'px';
        lens.style.top = e.clientY + 'px';
      }
      if (vignette) {
        body.style.setProperty('--mouse-x', `${e.clientX}px`);
        body.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    });

    document.querySelectorAll('a, button, .interactive').forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('active'));
      el.addEventListener('mouseleave', () => ring.classList.remove('active'));
    });
  }

  const reveals = document.querySelectorAll('.reveal-up');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.animate([
          { opacity: 0, transform: 'translateY(24px)' },
          { opacity: 1, transform: 'translateY(0px)' }
        ], { duration: 720, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' });
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach((el) => io.observe(el));
})();
