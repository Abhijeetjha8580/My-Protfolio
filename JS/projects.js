// ============================================
//  PROJECTS SECTION — Car Navigation
//  FIX: Car positions calculated dynamically
//  based on road width, not hardcoded %
// ============================================

const ProjectsManager = (() => {
  const cards   = document.querySelectorAll('.project-card');
  const car     = document.getElementById('car');
  const prevBtn = document.getElementById('prevProject');
  const nextBtn = document.getElementById('nextProject');
  const counter = document.getElementById('projectCounter');

  const total = cards.length;
  let current    = 0;
  let isAnimating = false;
  let autoPlay   = null;

  function updateCounter(index) {
    if (!counter) return;
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  }

  // FIX: Calculate car left position dynamically based on road's actual pixel width
  function getCarPosition(index) {
    const road = document.querySelector('.road');
    if (!road || !car) return 0;

    const roadWidth  = road.offsetWidth;
    const carWidth   = car.offsetWidth;   // actual rendered car width
    const padding    = 16;                // small padding from edges

    // Distribute positions evenly across the road
    // First stop near left edge, last stop near right edge
    const usable  = roadWidth - carWidth - padding * 2;
    const stepPx  = usable / (total - 1);
    return padding + index * stepPx;
  }

  function moveCar(index) {
    if (!car) return;
    car.style.left = `${getCarPosition(index)}px`;
  }

  function showProject(index) {
    if (isAnimating) return;
    isAnimating = true;

    cards.forEach(c => c.classList.remove('active'));
    moveCar(index);

    setTimeout(() => {
      if (cards[index]) cards[index].classList.add('active');
      updateCounter(index);
      isAnimating = false;
    }, 600);
  }

  function next() {
    current = (current + 1) % total;
    showProject(current);
  }

  function prev() {
    current = (current - 1 + total) % total;
    showProject(current);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlay = setInterval(next, 5000);
  }

  function stopAutoPlay() {
    if (autoPlay) { clearInterval(autoPlay); autoPlay = null; }
  }

  function init() {
    if (!car || cards.length === 0) return;

    // Initial display
    showProject(0);

    // Recalculate on resize so car position stays correct
    window.addEventListener('resize', () => {
      moveCar(current);
    }, { passive: true });

    // Buttons
    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    // Keyboard arrows (only when projects section is in view)
    document.addEventListener('keydown', (e) => {
      const projectSection = document.getElementById('projects');
      if (!projectSection) return;
      const rect = projectSection.getBoundingClientRect();
      if (rect.top >= window.innerHeight || rect.bottom <= 0) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    });

    // Touch swipe on project cards
    let touchStartX = 0;
    const showcase = document.querySelector('.projects-showcase');
    if (showcase) {
      showcase.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      showcase.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
      }, { passive: true });
    }

    // Auto-play: pause on hover over projects section
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.addEventListener('mouseenter', stopAutoPlay);
      projectsEl.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', ProjectsManager.init);