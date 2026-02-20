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

const caseStudyData = {

  // ── PROJECT 01: Nike ────────────────────────────────────
  nike: {
    bgText:    'NIKE AIR MAX',
    eyebrow:   'Project 01 · UI/UX · Figma',
    title:     'Air Max — Nike Landing Page',
    tags:      ['UI/UX Design', 'Figma', 'Hero Page'],
    imgSrc:    'Assets/Nikeclone.png',
    status:    null,
    stats: [
      { value: '1',     label: 'Hero Frame Designed' },
      { value: '2024',  label: 'Year'                },
      { value: 'Figma', label: 'Primary Tool'        },
    ],
    problemTitle: 'What was the design challenge?',
    problemBody:  `Most Nike fan recreations look either too amateur or miss the brand energy entirely.
      The challenge here was to study and understand Nike's visual language — their use of bold typography,
      negative space, and product-first hierarchy — and reproduce it faithfully in Figma as a
      foundational learning exercise, while getting comfortable with colour hierarchy and layout
      fundamentals for the very first time.`,
    steps: [
      {
        title: 'Studying the Original',
        desc:  `Analysed Nike's real website hero section closely — breaking down the layout structure,
                font weight choices, spacing ratios, and how they use colour contrast to draw
                the eye to the product first and the CTA second.`
      },
      {
        title: 'Designing in a Single Frame',
        desc:  `Designed the entire hero page within one Figma frame — a constraint that forced clear
                thinking about visual hierarchy without over-complicating the layout.
                Everything had to feel intentional within that single canvas.`
      },
      {
        title: 'Mastering Colour Hierarchy',
        desc:  `This was a first serious attempt at using colour with intention. Experimented with
                background-to-product contrast and text placement until the shoe became the undeniable
                focal point — learning that colour directs attention before type does.`
      },
      {
        title: 'Comparison & Iteration',
        desc:  `Side-by-side compared the design against Nike's actual page. Identified gaps in spacing,
                font weight, and shadow and iterated until the result was nearly a replica —
                which was exactly the goal of this learning project.`
      }
    ],
    tools:    ['Figma', 'Typography Systems', 'Colour Hierarchy', 'Layout Grids', 'Visual Composition'],
    result:   `The final design achieved a near-replica of Nike's hero page —
      <strong>proving a solid grasp of brand-accurate design from scratch.</strong>
      More importantly, this project built the Figma confidence that underpins every design project since.
      Getting the colour hierarchy right — making the Air Max the hero of the frame —
      taught that <strong>great UI is about controlling where the eye goes, not filling space.</strong>`,
    learnings: ['Colour hierarchy', 'Single-frame thinking', 'Brand accuracy', 'Negative space', 'Figma fundamentals', 'Typography contrast'],
    demoLink:   '#',
    githubLink: '#',
  },

  // ── PROJECT 02: KrishiHelp ──────────────────────────────
  krishihelp: {
    bgText:    'KRISHI HELP',
    eyebrow:   'Project 02 · Web App · SIH Hackathon 2024',
    title:     'KrishiHelp — Smart Farming Platform',
    tags:      ['UI/UX Design', 'HTML/CSS/JS', 'AgriTech', 'Hackathon'],
    imgSrc:    'Assets/krishihelpimg.png',
    status:    { type: 'wip', label: 'SIH Hackathon Project · 2024' },
    stats: [
      { value: 'SIH',   label: 'Built For'       },
      { value: 'UI/UX', label: 'My Role'         },
      { value: '2024',  label: 'Year'            },
    ],
    problemTitle: 'What problem does Indian farming face?',
    problemBody:  `Millions of farmers in rural India make crop decisions based on habit or word-of-mouth,
      often growing the wrong crops for their soil and losing profit as a result.
      Most digital solutions require smartphones they don't own or literacy levels they don't have.
      KrishiHelp was built for SIH to change this — giving farmers personalised, actionable
      crop guidance accessible from even a basic keypad phone.`,
    steps: [
      {
        title: 'Understanding the Real User',
        desc:  `Researched the actual constraints of rural Indian farmers — basic keypad phones,
                limited internet, low digital literacy, and deep distrust of complicated technology.
                The design had to work for someone who has never used an app before.`
      },
      {
        title: 'Leading the UI/UX Design',
        desc:  `Took ownership of the complete UI/UX for the platform. Every screen was stripped
                to its absolute minimum — large touch targets, simple icons, minimal text — so
                the interface felt immediately familiar rather than foreign or technical.`
      },
      {
        title: 'Designing the Core Feature',
        desc:  `Designed the crop recommendation flow — the heart of the product.
                Farmers input basic land details and the platform tells them what to grow,
                how much area to give each crop, and what they're currently growing wrong.
                Simple input. Powerful, profitable output.`
      },
      {
        title: 'Hackathon Execution Under Pressure',
        desc:  `Built and presented the complete concept as part of Smart India Hackathon 2024.
                Worked under intense time constraints to bring an idea from concept to
                a fully designed, presentable prototype that clearly communicated
                the solution to judges.`
      }
    ],
    tools:    ['Figma', 'HTML', 'CSS', 'JavaScript', 'User Research', 'Accessibility Design'],
    result:   `KrishiHelp tackled a genuinely underserved problem with a beautifully simple solution.
      The platform's core value is <strong>radical simplicity</strong> — enter your land details,
      get told exactly what to grow and how to maximise profit.
      <strong>No agricultural degree required, no smartphone needed.</strong>
      This project fundamentally changed how I design — forcing empathy-first thinking
      over aesthetics-first, which made me a <strong>significantly stronger UI/UX designer.</strong>`,
    learnings: ['Empathy-driven design', 'Low-literacy UX', 'Hackathon execution', 'Feature prioritisation', 'Accessibility thinking', 'AgriTech problem space'],
    demoLink:   '#',
    githubLink: '#',
  },

  // ── PROJECT 03: DualSense ───────────────────────────────
  dualsense: {
    bgText:    'DUAL SENSE',
    eyebrow:   'Project 03 · UI/UX · Figma Prototype',
    title:     'DualSense — PlayStation Controller Page',
    tags:      ['UI/UX Design', 'Figma', 'Cinematic UI', 'Gaming'],
    imgSrc:    'Assets/controller.png',
    status:    { type: 'wip', label: 'Interactions Planned — Next Iteration' },
    stats: [
      { value: '1',        label: 'Hero Section'    },
      { value: 'Dark',     label: 'Cinematic Theme' },
      { value: '2024',     label: 'Year'            },
    ],
    problemTitle: 'What was the design challenge?',
    problemBody:  `Gaming product pages too often play it safe — generic dark backgrounds,
      feature bullet lists, and a buy button. The challenge was to design a hero page
      for Sony's DualSense controller that felt genuinely cinematic — matching the
      immersive, high-stakes feeling of PlayStation gaming itself rather than
      looking like just another product listing.`,
    steps: [
      {
        title: 'Choosing the Cinematic Direction',
        desc:  `Committed to a cinematic dark aesthetic as the core design direction — deep blacks,
                dramatic atmospheric lighting, and a single product spotlight.
                The goal was to make the DualSense feel like the centrepiece of a film poster,
                not a retail page.`
      },
      {
        title: 'Designing the Hero Section',
        desc:  `Built the full hero in Figma — bold display typography, the DualSense controller
                rendered with dramatic shadow and glow, and a layout that forces the eye
                directly onto the product before the viewer reads a single word of copy.`
      },
      {
        title: 'Brand Study vs Original Direction',
        desc:  `Studied Sony's actual DualSense page for brand guidelines and colour language,
                then pushed the visual mood darker and more dramatic than Sony's official direction —
                creating something inspired by the brand but distinctly more editorial and intense.`
      },
      {
        title: 'Prototype Foundation',
        desc:  `Laid the design groundwork for future Figma interactions — hover state reveals,
                feature spotlight animations, and scroll-triggered transitions are all
                planned for the next iteration of this prototype.`
      }
    ],
    tools:    ['Figma', 'Cinematic Composition', 'Dark UI Design', 'Visual Lighting Effects', 'Brand Study'],
    result:   `The result is a hero section that immediately communicates premium gaming —
      <strong>dark, dramatic, and product-first.</strong>
      The design demonstrates a clear understanding of how lighting, negative space,
      and typography weight work together to create emotional impact without a single word.
      While interactions are still in development, the static design alone
      <strong>communicates a confident visual voice and strong cinematic UI instinct.</strong>`,
    learnings: ['Cinematic UI design', 'Dark theme mastery', 'Product-first composition', 'Brand study & deviation', 'Lighting in flat design', 'Gaming UI language'],
    demoLink:   '#',
    githubLink: '#',
  },

  // ── PROJECT 04: Portfolio Builder ──────────────────────
  portfolio: {
    bgText:    'PORTFOLIO BUILDER',
    eyebrow:   'Project 04 · Web App · In Development',
    title:     'Portfolio Builder — Digital Identity Platform',
    tags:      ['UI/UX Design', 'HTML/CSS/JS', 'Web App', 'In Progress'],
    imgSrc:    'Assets/CustomPortfolio.png',
    status:    { type: 'wip', label: 'UI/UX Complete · Frontend In Progress' },
    stats: [
      { value: 'WIP',   label: 'Current Status' },
      { value: 'All',   label: 'Target Audience' },
      { value: '2025',  label: 'Year'            },
    ],
    problemTitle: 'What problem does this solve?',
    problemBody:  `Building a portfolio from scratch takes days of decisions that have nothing to do
      with your actual work — layouts, colour schemes, fonts, section structures.
      Most students and early professionals either use a generic LinkedIn profile or
      skip having a portfolio entirely. Portfolio Builder removes all that friction:
      visit the platform, fill in your details, and walk away with a
      fully polished, professional portfolio — no coding or design skill required.`,
    steps: [
      {
        title: 'Identifying the Problem from Experience',
        desc:  `Having built this portfolio from scratch, I experienced firsthand how much time
                goes into decisions unrelated to your actual work. I wanted to remove that
                entire barrier for other students and professionals.`
      },
      {
        title: 'UI/UX Design in Figma',
        desc:  `Designed the complete interface — an editor where anyone can fill in their name,
                education, skills, projects, and other sections into a beautiful pre-built template.
                The editing experience was designed to feel as simple as filling out a form.`
      },
      {
        title: 'Frontend Development',
        desc:  `Currently building the HTML/CSS/JS implementation from the Figma designs.
                The core flow: user arrives at the template, edits each section with their own
                details, and ends up with a professional portfolio page that is uniquely theirs.`
      },
      {
        title: 'Designed for Students & Professionals',
        desc:  `Primary audience is students and early-career professionals who need
                to present themselves online but lack the time or technical skill to build
                from scratch. The template is designed to look professional out of the box —
                zero design decisions required from the user.`
      }
    ],
    tools:    ['Figma', 'HTML', 'CSS', 'JavaScript', 'Template Architecture', 'UX Writing'],
    result:   `Portfolio Builder is in active development — the UI/UX design is complete
      and the frontend implementation is underway.
      <strong>The idea is simple but genuinely useful:</strong> give someone a portfolio
      that already looks great, and let them make it theirs just by filling in their details.
      This project reflects the full design-to-code workflow —
      <strong>identifying a real problem, designing the solution, and building it.</strong>
      Not just mockups. Real product thinking.`,
    learnings: ['Product thinking', 'Template architecture', 'UX for non-technical users', 'Design-to-code workflow', 'Editable UI systems', 'Real problem solving'],
    demoLink:   '#',
    githubLink: '#',
  }

};


// ============================================================
//  MODAL ENGINE — open, populate, close, scroll progress
// ============================================================

function openCaseStudy(key) {
  const data = caseStudyData[key];
  if (!data) return;

  const overlay = document.getElementById('caseStudyModal');

  // hero
  document.getElementById('csBgText').textContent = data.bgText;
  const heroImg  = document.getElementById('csHeroImg');
  const heroPh   = document.getElementById('csHeroPlaceholder');
  if (data.imgSrc) {
    heroImg.src = data.imgSrc;
    heroImg.alt = data.title;
    heroImg.style.display = 'block';
    heroPh.style.display  = 'none';
  } else {
    heroImg.style.display = 'none';
    heroPh.style.display  = 'flex';
    heroPh.textContent    = data.bgText;
  }

  // header
  document.getElementById('csEyebrow').textContent = data.eyebrow;
  document.getElementById('csTitle').textContent   = data.title;
  document.getElementById('csTags').innerHTML      = data.tags.map(t => `<span>${t}</span>`).join('');

  // status badge
  const badge = document.getElementById('csStatusBadge');
  badge.innerHTML = data.status
    ? `<div class="cs-status-badge ${data.status.type}">${data.status.label}</div>`
    : '';

  // stats
  document.getElementById('csStats').innerHTML = data.stats.map(s => `
    <div class="cs-stat-item">
      <div class="cs-stat-value">${s.value}</div>
      <div class="cs-stat-label">${s.label}</div>
    </div>`).join('');

  // problem
  document.getElementById('csProblemTitle').textContent = data.problemTitle;
  document.getElementById('csProblemBody').textContent  = data.problemBody;

  // steps
  document.getElementById('csSteps').innerHTML = data.steps.map((s, i) => `
    <div class="cs-step">
      <div class="cs-step-num">${i + 1}</div>
      <div class="cs-step-content">
        <strong>${s.title}</strong>
        <p>${s.desc}</p>
      </div>
    </div>`).join('');

  // tools
  document.getElementById('csTools').innerHTML = data.tools.map(t =>
    `<div class="cs-tool"><div class="cs-tool-dot"></div>${t}</div>`).join('');

  // result + learnings
  document.getElementById('csResult').innerHTML   = data.result;
  document.getElementById('csLearnings').innerHTML = data.learnings.map(l =>
    `<span class="cs-chip">${l}</span>`).join('');

  // footer links
  document.getElementById('csDemoBtn').href   = data.demoLink   || '#';
  document.getElementById('csGithubBtn').href = data.githubLink || '#';

  // open
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('csScrollFill').style.width = '0%';
  overlay.scrollTop = 0;
}

function closeCaseStudy() {
  document.getElementById('caseStudyModal').classList.remove('open');
  document.body.style.overflow = '';
}

// close on X button
document.getElementById('csModalClose').addEventListener('click', closeCaseStudy);

// close on backdrop click
document.getElementById('caseStudyModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeCaseStudy();
});

// close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCaseStudy();
});

// scroll progress bar
document.getElementById('caseStudyModal').addEventListener('scroll', (e) => {
  const el    = e.target;
  const panel = document.getElementById('csModalPanel');
  const total = panel.offsetHeight - el.offsetHeight;
  const pct   = total > 0 ? Math.min((el.scrollTop / total) * 100, 100) : 0;
  document.getElementById('csScrollFill').style.width = pct + '%';
});

