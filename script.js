const portfolio = document.querySelector('#portfolio');
const clock = document.querySelector('#clock');
const date = document.querySelector('#date');
const captionTime = document.querySelector('#caption-time');
const greeting = document.querySelector('#greeting');
const periodLabel = document.querySelector('#period-label');
const backdrop = document.querySelector('#panel-backdrop');
const panel = document.querySelector('.info-panel');
const content = document.querySelector('#panel-content');
const data = window.portfolioData;
let manualLighting = false;
let returnToProjects = false;

function updateTime() {
  const now = new Date();
  const time = new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }).format(now);
  const hour = now.getHours();
  const period = hour >= 5 && hour < 11 ? 'morning' : hour >= 11 && hour < 16 ? 'day' : hour >= 16 && hour < 19 ? 'evening' : 'night';
  clock.textContent = time;
  captionTime.textContent = time;
  date.textContent = new Intl.DateTimeFormat('en', { weekday: 'short', day: '2-digit', month: 'short' }).format(now).toUpperCase();
  greeting.textContent = hour < 11 ? 'Selamat pagi' : hour < 15 ? 'Selamat siang' : hour < 18 ? 'Selamat sore' : 'Selamat malam';
  if (!manualLighting) {
    portfolio.dataset.period = period;
    periodLabel.textContent = ({ morning: 'MORNING GLOW', day: 'DAYLIGHT', evening: 'GOLDEN HOUR', night: 'NIGHT MODE' })[period];
  }
}
updateTime();
setInterval(updateTime, 15000);

function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}
function appendTextSection(parent, title, value) {
  const section = node('section', 'cv-section');
  section.append(node('h3', '', title));
  section.append(node('p', '', value));
  parent.append(section);
}
function projectTitle(project) {
  return project.sub && project.sub.toLocaleLowerCase() !== project.name.toLocaleLowerCase()
    ? `${project.name} · ${project.sub}`
    : project.name;
}
function openPanel({ kicker, title, copy = '', wide = false }) {
  document.querySelector('#panel-kicker').textContent = kicker;
  document.querySelector('#panel-title').textContent = title;
  document.querySelector('#panel-copy').textContent = copy;
  panel.classList.toggle('panel-wide', wide);
  content.replaceChildren();
  backdrop.hidden = false;
  document.querySelector('#panel-close').focus();
}
function renderProjectList() {
  openPanel({ kicker: 'SELECT A CASE STUDY', title: 'Project pilihan', copy: `${data.projects.length} project pilihan dari product design, website, dan branding.`, wide: true });
  const list = node('div', 'project-list');
  data.projects.forEach(project => {
    const card = node('button', 'project-card project-card--button');
    card.type = 'button';
    card.dataset.slug = project.slug;
    if (project.cover) {
      const thumbnail = node('img', 'project-thumb');
      thumbnail.src = project.cover;
      thumbnail.alt = `${projectTitle(project)} preview`;
      thumbnail.loading = 'lazy';
      thumbnail.decoding = 'async';
      card.append(thumbnail);
    }
    const title = node('strong', '', projectTitle(project));
    const summary = node('p', '', project.about || project.items?.join(' · ') || project.co || 'Selected design work.');
    const tags = node('span', 'tag', [project.cat || project.sub, project.co, project.when].filter(Boolean).join('  ·  '));
    card.append(title, summary, tags);
    list.append(card);
  });
  content.append(list);
}
function addListSection(parent, title, items) {
  if (!items?.length) return;
  const section = node('section', 'case-section');
  section.append(node('h3', '', title));
  const list = node('ul');
  items.forEach(item => list.append(node('li', '', item)));
  section.append(list);
  parent.append(section);
}
function renderProject(project) {
  openPanel({ kicker: [project.co, project.when].filter(Boolean).join(' · ') || 'SELECTED WORK', title: projectTitle(project), copy: project.about || '', wide: true });
  const back = node('button', 'back-link', '← Semua project');
  back.type = 'button';
  back.dataset.action = 'projects';
  content.append(back);
  if (project.role) content.append(node('p', 'case-meta', `${project.role}${project.when ? ` · ${project.when}` : ''}`));
  if (project.images?.length) {
    const gallery = node('div', 'project-gallery');
    project.images.forEach(image => {
      const figure = node('figure', 'project-figure');
      const visual = node('img', 'project-image');
      visual.src = image.src;
      visual.alt = image.caption || `${projectTitle(project)} project image`;
      visual.loading = 'lazy';
      visual.decoding = 'async';
      figure.append(visual);
      if (image.caption) figure.append(node('figcaption', '', image.caption));
      gallery.append(figure);
    });
    content.append(gallery);
  }
  if (project.problem) addListSection(content, 'The challenge', project.problem);
  if (project.finding) addListSection(content, 'What we learned', project.finding);
  if (project.proposal) addListSection(content, 'The approach', project.proposal);
  if (project.outcome) addListSection(content, 'Outcome', project.outcome);
  if (project.stats?.length) {
    const section = node('section', 'case-section');
    section.append(node('h3', '', 'Impact'));
    const stats = node('div', 'stats-row');
    project.stats.forEach(([value, label]) => {
      const stat = node('div', 'stat');
      stat.append(node('strong', '', value), node('span', '', label));
      stats.append(stat);
    });
    section.append(stats);
    content.append(section);
  }
  if (project.blocks?.length) {
    project.blocks.forEach(block => appendTextSection(content, block.heading, block.text));
  }
  if (project.process?.length) {
    const section = node('section', 'case-section');
    section.append(node('h3', '', 'Process'));
    const chips = node('div', 'skill-chips');
    project.process.forEach(step => chips.append(node('span', '', step)));
    section.append(chips);
    content.append(section);
  }
  if (project.items?.length) addListSection(content, 'Included work', project.items);
  if (project.note) content.append(node('p', 'case-note', project.note));
}
function renderResume() {
  const cv = data.cv;
  openPanel({ kicker: 'A LITTLE ABOUT MY WORK', title: cv.name, copy: cv.title, wide: true });
  const intro = node('p', 'cv-intro', cv.intro.join(' '));
  content.append(intro);
  const layout = node('div', 'cv-layout');
  const side = node('aside', 'cv-sidebar');
  const contact = node('section', 'cv-section');
  contact.append(node('h3', '', 'Contact'));
  Object.entries(cv.contact).forEach(([key, value]) => {
    const row = node('div', 'cv-contact-row');
    row.append(node('span', '', key === 'phone' ? 'Phone' : 'Email'));
    const link = node('a', '', value.value);
    link.href = value.href;
    row.append(link);
    contact.append(row);
  });
  side.append(contact);
  const education = node('section', 'cv-section');
  education.append(node('h3', '', 'Education'), node('strong', '', cv.education.school), node('p', '', cv.education.degree));
  side.append(education);
  const skills = node('section', 'cv-section');
  skills.append(node('h3', '', 'Skills & expertise'));
  const chips = node('div', 'skill-chips');
  cv.skills.forEach(skill => chips.append(node('span', '', skill)));
  skills.append(chips);
  side.append(skills);
  layout.append(side);
  const experience = node('section', 'experience-list');
  experience.append(node('h3', '', 'Experience'));
  cv.experience.forEach(job => {
    const item = node('article', 'job-entry');
    const head = node('div', 'job-heading');
    head.append(node('h4', '', job.title), node('span', '', job.period));
    item.append(head, node('p', 'job-location', job.location));
    const bullets = node('ul');
    job.bullets.forEach(bullet => bullets.append(node('li', '', bullet)));
    item.append(bullets);
    experience.append(item);
  });
  layout.append(experience);
  content.append(layout);
}

const views = {
  projects: renderProjectList,
  resume: renderResume,
  about: () => {
    openPanel({ kicker: 'A LITTLE ABOUT ME', title: 'Ini kamarku.', copy: 'Tempat paling nyaman untuk merancang sesuatu, merawat tanaman, dan sesekali menatap langit dari jendela.' });
    const badges = node('div', 'about-stats');
    ['COFFEE LOVER', 'PLANT PARENT', 'CASUAL GAMER', 'JAKARTA'].forEach(label => badges.append(node('span', '', label)));
    content.append(badges);
  }
};

document.querySelectorAll('.hotspot').forEach(button => button.addEventListener('click', () => views[button.dataset.panel]?.()));
content.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.action === 'projects') return renderProjectList();
  const project = data.projects.find(item => item.slug === button.dataset.slug);
  if (project) renderProject(project);
});
function closePanel() { backdrop.hidden = true; }
document.querySelector('#panel-close').addEventListener('click', closePanel);
backdrop.addEventListener('click', event => { if (event.target === backdrop) closePanel(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !backdrop.hidden) closePanel(); });

document.querySelector('#lighting-toggle').addEventListener('click', () => {
  const modes = ['morning', 'day', 'evening', 'night'];
  manualLighting = true;
  const next = modes[(modes.indexOf(portfolio.dataset.period) + 1) % modes.length];
  portfolio.dataset.period = next;
  periodLabel.textContent = ({ morning: 'MORNING GLOW', day: 'DAYLIGHT', evening: 'GOLDEN HOUR', night: 'NIGHT MODE' })[next];
  document.querySelector('.toggle-label').textContent = next.toUpperCase() + ' LIGHT';
  document.querySelector('#lighting-toggle').title = 'Mode saat ini: ' + next + '. Klik untuk ganti.';
});
