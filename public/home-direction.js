(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  document.documentElement.classList.add('d-motion');
  const nodes = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    }, {threshold: 0.2});
    nodes.forEach((node) => observer.observe(node));
  } else {
    nodes.forEach((node) => node.classList.add('is-in'));
  }
  const stage = document.querySelector('.d-stage');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!stage || !fine || window.innerWidth < 860) return;
  const slots = ['d-px-0', 'd-px-1', 'd-px-2', 'd-px-3', 'd-px-4', 'd-py-0', 'd-py-1', 'd-py-2', 'd-py-3', 'd-py-4'];
  const bucket = (value) => (value < -0.45 ? 0 : value < -0.15 ? 1 : value < 0.15 ? 2 : value < 0.45 ? 3 : 4);
  const place = (x, y) => {
    stage.classList.remove(...slots);
    stage.classList.add(`d-px-${bucket(x)}`, `d-py-${bucket(y)}`);
  };
  stage.addEventListener('pointermove', (event) => {
    const rect = stage.getBoundingClientRect();
    place((event.clientX - rect.left) / rect.width * 2 - 1, (event.clientY - rect.top) / rect.height * 2 - 1);
  });
  stage.addEventListener('pointerleave', () => place(0, 0));
})();
