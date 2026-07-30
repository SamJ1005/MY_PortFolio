import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiDownload, FiGithub, FiLinkedin, FiMail, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import './styles.css';

const navItems = ['About', 'Skills', 'Projects', 'GitHub', 'Education', 'Contact'];

function ThemeToggle({ isDark, onToggle }) {
  return <button className="icon-button" onClick={onToggle} aria-label="Toggle colour theme">
    {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
  </button>;
}

function Header({ isDark, onToggle }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return <header className="site-header">
    <a className="brand" href="#home" aria-label="Sam home">S<span>.</span></a>
    <nav className="desktop-nav" aria-label="Main navigation">
      {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
    </nav>
    <div className="header-actions">
      <ThemeToggle isDark={isDark} onToggle={onToggle} />
      <button className="icon-button menu-button" onClick={() => setMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={isMenuOpen}>
        {isMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
      </button>
    </div>
    {isMenuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
      {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
    </nav>}
  </header>;
}

function Button({ href, children, secondary = false, icon }) {
  return <a className={`button ${secondary ? 'button-secondary' : ''}`} href={href}>{children}{icon}</a>;
}

function Home() {
  return <section className="hero" id="home">
    <div className="hero-copy">
      <motion.p className="eyebrow" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>Computer Science Student</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>Hi, I&apos;m Sam.<br /><span>I build while I learn.</span></motion.h1>
      <motion.p className="hero-lede" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>An aspiring software developer learning through thoughtful projects, from desktop tools to web experiences.</motion.p>
      <motion.div className="button-row" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
        <Button href="#projects" icon={<FiArrowUpRight aria-hidden="true" />}>View projects</Button>
        <Button href="https://github.com/" secondary icon={<FiGithub aria-hidden="true" />}>GitHub</Button>
        <Button href="#contact" secondary icon={<FiDownload aria-hidden="true" />}>Download resume</Button>
      </motion.div>
    </div>
    <div className="hero-visual" aria-hidden="true"><div className="visual-card"><FiGithub /><span>learn<br />by building.</span></div><i className="visual-dot dot-one" /><i className="visual-dot dot-two" /></div>
  </section>;
}

function SectionHeading({ label, title, description }) {
  return <div className="section-heading">
    <p className="eyebrow">{label}</p>
    <h2>{title}</h2>
    {description && <p className="section-description">{description}</p>}
  </div>;
}

function About() {
  return <section className="content-section" id="about">
    <SectionHeading label="01 - About" title="Learning by making useful things." />
    <div className="about-grid">
      <p className="about-lead">I&apos;m a Computer Science student who enjoys understanding how software works by building it.</p>
      <div className="about-copy">
        <p>My interests include desktop applications, web development, React, Python, SQL, and UI/UX. I like the point where a technical idea becomes a clear, usable interface.</p>
        <p>I&apos;m continuously improving my skills through hands-on projects as I prepare for internships and campus placements.</p>
      </div>
    </div>
  </section>;
}

const skills = [
  ['Programming', [['C', 'Comfortable'], ['C++', 'Comfortable'], ['Java', 'Learning'], ['Python', 'Intermediate'], ['JavaScript', 'Intermediate'], ['SQL', 'Comfortable']]],
  ['Framework', [['React', 'Intermediate']]],
  ['UI / UX', [['Figma', 'Comfortable']]],
  ['Tools', [['Git', 'Comfortable'], ['GitHub', 'Comfortable'], ['VS Code', 'Intermediate']]],
];

const projects = [
  { name: 'Bible Presentation App', type: 'Desktop application', tech: 'React · Electron · Firebase', copy: 'A focused desktop tool for finding and presenting Bible verses.', tone: 'violet' },
  { name: 'Solar Project', type: 'Academic project', tech: 'Add technologies used', copy: 'An academic project exploring solar energy concepts. Screenshots can be added here later.', tone: 'amber' },
];

function Skills() {
  return <section className="content-section" id="skills"><SectionHeading label="02 - Skills" title="A practical, growing toolkit." description="An honest view of the technologies I’m currently learning and using." /><motion.article className="skill-card skill-card-all" whileHover={{ y: -4 }} transition={{ duration: .2 }}>{skills.map(([group, items]) => <div className="skill-group" key={group}><h3>{group}</h3><div className="skill-items">{items.map(([name, level]) => <div className="skill-row" key={name}><span>{name}</span><em>{level}</em></div>)}</div></div>)}</motion.article></section>;
}

function Projects() {
  return <section className="content-section" id="projects"><SectionHeading label="03 - Projects" title="Selected work." description="Projects where I’ve explored software, interfaces, and problem-solving." /><div className="projects-grid">{projects.map((project) => <motion.article className="project-card" key={project.name} whileHover={{ y: -5 }} transition={{ duration: .2 }}><div className={`project-art ${project.tone}`}><div className="art-window"><div className="art-dots"><i /><i /><i /></div><div className="art-placeholder">{project.tone === 'violet' ? 'Presentation mode' : 'Solar energy'}</div></div></div><div className="card-content"><p className="card-tag">{project.type}</p><h3>{project.name}</h3><p>{project.copy}</p><p className="project-tech">{project.tech}</p><div className="card-links"><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub <FiArrowUpRight /></a><a href="#contact">Live demo <FiArrowUpRight /></a></div></div></motion.article>)}</div></section>;
}

function Github() {
  const repos = ['Bible App', 'Solar Project'];
  return <section className="content-section" id="github"><SectionHeading label="04 - GitHub" title="Selected work." description="Explore the repositories behind the projects featured above." /><div className="repo-grid">{repos.map((repo, index) => <motion.a className="repo-card" href="https://github.com/" target="_blank" rel="noreferrer" key={repo} whileHover={{ y: -4 }}><span className="repo-number">0{index + 1}</span><FiGithub /><h3>{repo}</h3><span className="text-link">Open GitHub <FiArrowUpRight /></span></motion.a>)}</div></section>;
}

function Education() { return <section className="content-section" id="education"><SectionHeading label="05 - Education" title="The foundation." description="Replace these editable entries with your own education details." /><div className="timeline"><article><span>Present</span><div><h3>Bachelor of Technology in Computer Science</h3><strong>Your University</strong><p>Add your course details and relevant academic context here.</p></div></article><article><span>Before</span><div><h3>Higher Secondary Education</h3><strong>Your School</strong><p>Add your school name and graduation details here.</p></div></article></div></section>; }

function Contact() {
  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio message from ${form.get('name') || 'a visitor'}`);
    const body = encodeURIComponent(`${form.get('message') || ''}\n\nReply to: ${form.get('email') || ''}`);
    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
  }
  return <section className="content-section" id="contact"><SectionHeading label="06 - Contact" title="Let’s start a conversation." description="I’m open to internship opportunities, project discussions, and feedback." /><div className="contact-grid"><div className="contact-links"><a href="mailto:hello@example.com"><FiMail /> hello@example.com <FiArrowUpRight /></a><a href="https://github.com/" target="_blank" rel="noreferrer"><FiGithub /> GitHub <FiArrowUpRight /></a><a href="https://linkedin.com/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn <FiArrowUpRight /></a></div><form onSubmit={handleSubmit}><label>Name<input name="name" placeholder="Your name" /></label><label>Email<input name="email" type="email" placeholder="you@example.com" /></label><label>Message<textarea name="message" rows="4" placeholder="What would you like to talk about?" /></label><button className="button" type="submit">Open email <FiArrowUpRight /></button></form></div></section>;
}

function App() {
  const [isDark, setDark] = useState(true);
  useEffect(() => { document.documentElement.dataset.theme = isDark ? 'dark' : 'light'; }, [isDark]);
  return <><Header isDark={isDark} onToggle={() => setDark(!isDark)} /><Home /><main><About /><Skills /><Projects /><Github /><Education /><Contact /></main><footer>© {new Date().getFullYear()} Sam <span>Designed and built with care.</span></footer></>;
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
