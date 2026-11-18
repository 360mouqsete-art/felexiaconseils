(() => {
  if (document.body.classList.contains('fx-home')) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('d-motion');
  const nodes = document.querySelectorAll('.d-reveal');
  if (!nodes.length) return;
  if (!('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('is-in'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    }
  }, {threshold: 0.16});
  nodes.forEach((node) => observer.observe(node));
})();
