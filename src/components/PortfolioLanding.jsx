import React, { useEffect, useState } from "react";
import ParticleCanvas from "./ParticleCanvas";

const ROLES = [
  "SDET & Automation Engineer",
  "Backend Developer",
  "Security Testing Specialist",
  "Compliance Tester",
  "AI Integration Engineer",
];

const SKILLS = [
  {
    icon: "💻",
    title: "Languages",
    color: "",
    items: ["Java", "Python", "JavaScript", "TypeScript", "C/C++", "SQL"],
  },
  {
    icon: "🧪",
    title: "Test Automation",
    color: "purple",
    items: ["Selenium", "Appium", "TestNG", "Pytest", "REST Assured"],
  },
  {
    icon: "🔧",
    title: "Backend & APIs",
    color: "green",
    items: ["Node.js", "Express.js", "Spring Boot", "Postman", "RESTful APIs", "Mistral API"],
  },
  {
    icon: "🚀",
    title: "DevOps & Tools",
    color: "amber",
    items: ["Docker", "GitHub Actions", "Git", "CI/CD Pipelines"],
  },
  {
    icon: "🛡️",
    title: "Testing Practices",
    color: "rose",
    items: ["Functional Testing", "Regression Testing", "Smoke Testing", "Agile Scrum", "Defect Lifecycle"],
  },
  {
    icon: "🖥️",
    title: "Platforms & Other",
    color: "blue",
    items: ["Linux", "Windows", "Oracle Fusion", "Oracle EPM", "MS Office"],
  },
];

const PROJECTS = [
  {
    title: "WarpX",
    desc: "AI doctor simulation with API + UI automation using Python/Pytest. Integrated Mistral API workflows, CI/CD with GitHub Actions & Docker, and Node.js backend.",
    tech: ["Python", "Pytest", "Node.js", "Mistral API", "Docker"],
  },
  {
    title: "Cainz",
    desc: "Enterprise Selenium WebDriver automation framework with Java & TestNG. Automated 150+ regression and functional test scenarios with reusable scripts.",
    tech: ["Java", "Selenium", "TestNG"],
  },
  {
    title: "PetX",
    desc: "AI-driven mobile app testing across Android & iOS platforms. Automated critical user journeys with Appium and validated AI pet care logic.",
    tech: ["Appium", "Android", "iOS", "Manual Testing"],
  },
  {
    title: "Journal App",
    desc: "Full-stack journal application with user authentication and CRUD functionality built with the MERN stack.",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
  },
  {
    title: "Journal Backend API",
    desc: "RESTful API service with JWT authentication, MongoDB integration, and Docker deployment using Spring Boot.",
    tech: ["Spring Boot", "JWT", "MongoDB", "Docker"],
  },
];

const CERTIFICATIONS = [
  { icon: "🏅", title: "Version Control", issuer: "Meta" },
  { icon: "🏅", title: "CPA – Programming Essentials in C++", issuer: "Cisco Networking Academy" },
  { icon: "🛡️", title: "Cybersecurity Essentials", issuer: "Cisco Networking Academy" },
  { icon: "🔐", title: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy" },
];

export default function PortfolioLanding({ onEnter }) {
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());

  // Typing animation for roles
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setRoleText(current.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 60);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setRoleText(current.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 30);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((roleIndex + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".section").forEach((el) => {
      if (el.id) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (id) => visibleSections.has(id);

  return (
    <div className="landing-page">
      <ParticleCanvas />

      {/* Navigation */}
      <nav className="landing-nav">
        <a href="#hero" className="nav-logo">
          SM<span>.dev</span>
        </a>
        <ul className="nav-links">
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#certifications">Certifications</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <p className="hero-greeting animate-fade-in-up">👋 Hello, I'm</p>
          <h1 className="hero-name animate-fade-in-up delay-100">
            Shivansh Mehrotra
          </h1>
          <p className="hero-role animate-fade-in-up delay-200">
            {roleText}
            <span className="cursor" />
          </p>
          <p className="hero-description animate-fade-in-up delay-300">
            Software Engineer at Evolution Software Solution, specializing in test automation,
            security testing, and backend development. Building reliable software through
            robust automation frameworks and AI-integrated workflows.
          </p>
          <div className="hero-buttons animate-fade-in-up delay-400">
            <button onClick={onEnter} className="btn-primary" id="enter-terminal-btn">
              ⌨ Enter Terminal
            </button>
            <a href="#projects" className="btn-secondary">
              ↓ View Projects
            </a>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className={`section ${isVisible("skills") ? "animate-fade-in-up" : ""}`} style={{ opacity: isVisible("skills") ? 1 : 0 }}>
        <p className="section-label">// what I work with</p>
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">
          A blend of testing expertise, backend development, and DevOps tooling.
        </p>
        <div className="skills-grid">
          {SKILLS.map((group, i) => (
            <div
              key={group.title}
              className={`glass-card skill-card ${isVisible("skills") ? "animate-scale-in" : ""}`}
              style={{ animationDelay: `${i * 0.1}s`, opacity: isVisible("skills") ? undefined : 0 }}
            >
              <div className="skill-card-icon">{group.icon}</div>
              <div className="skill-card-title">{group.title}</div>
              <div className="skill-card-items">
                {group.items.map((item) => (
                  <span key={item} className={`skill-tag ${group.color}`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className={`section ${isVisible("experience") ? "animate-fade-in-up" : ""}`} style={{ opacity: isVisible("experience") ? 1 : 0 }}>
        <p className="section-label">// where I've worked</p>
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">
          Building automation frameworks and backend systems at scale.
        </p>
        <div className="timeline">
          <div className={`glass-card timeline-item ${isVisible("experience") ? "animate-slide-in-left" : ""}`} style={{ opacity: isVisible("experience") ? undefined : 0 }}>
            <div className="timeline-date">Jul 2024 — Present</div>
            <div className="timeline-role">Software Engineer — Automation Test Engineer / Backend Developer</div>
            <div className="timeline-company">Evolution Software Solution · Noida, Sector 62</div>
            <ul className="timeline-desc">
              <li>
                <strong>Cainz:</strong> Developed Selenium WebDriver automation frameworks with Java & TestNG, automating 150+ regression and functional test scenarios.
              </li>
              <li>
                <strong>PetX:</strong> Executed Functional, Smoke & Regression Testing for an AI-driven mobile app across Android & iOS using Appium.
              </li>
              <li>
                <strong>WarpX:</strong> Built API & UI automation with Python/Pytest, integrated Mistral API, connected CI/CD via GitHub Actions & Docker.
              </li>
            </ul>
          </div>

          <div className={`glass-card timeline-item ${isVisible("experience") ? "animate-slide-in-left delay-200" : ""}`} style={{ opacity: isVisible("experience") ? undefined : 0 }}>
            <div className="timeline-date">Nov 2020 — Jul 2024</div>
            <div className="timeline-role">B.Tech, Computer Science</div>
            <div className="timeline-company">Feroze Gandhi Institute of Engineering and Technology · Raebareli, India</div>
            <ul className="timeline-desc">
              <li>GPA: 8.6 / 10</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className={`section ${isVisible("projects") ? "animate-fade-in-up" : ""}`} style={{ opacity: isVisible("projects") ? 1 : 0 }}>
        <p className="section-label">// what I've built</p>
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          Automation frameworks, full-stack apps, and AI integrations.
        </p>
        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className={`glass-card project-card ${isVisible("projects") ? "animate-scale-in" : ""}`}
              style={{ animationDelay: `${i * 0.1}s`, opacity: isVisible("projects") ? undefined : 0 }}
            >
              <div className="project-card-title">{project.title}</div>
              <div className="project-card-desc">{project.desc}</div>
              <div className="project-card-tech">
                {project.tech.map((t) => (
                  <span key={t} className="skill-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className={`section ${isVisible("certifications") ? "animate-fade-in-up" : ""}`} style={{ opacity: isVisible("certifications") ? 1 : 0 }}>
        <p className="section-label">// credentials</p>
        <h2 className="section-title">Certifications</h2>
        <div className="certs-grid">
          {CERTIFICATIONS.map((cert, i) => (
            <div
              key={cert.title}
              className={`glass-card cert-card ${isVisible("certifications") ? "animate-scale-in" : ""}`}
              style={{ animationDelay: `${i * 0.1}s`, opacity: isVisible("certifications") ? undefined : 0 }}
            >
              <span className="cert-icon">{cert.icon}</span>
              <div>
                <div className="cert-title">{cert.title}</div>
                <div className="cert-issuer">{cert.issuer}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={`section contact-section ${isVisible("contact") ? "animate-fade-in-up" : ""}`} style={{ opacity: isVisible("contact") ? 1 : 0 }}>
        <p className="section-label">// let's connect</p>
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle" style={{ margin: "0 auto 2rem" }}>
          Interested in working together or just want to say hi? Feel free to reach out!
        </p>
        <div className="contact-links">
          <a href="mailto:shivanshmehrotra308@gmail.com" className="glass-card contact-link" id="contact-email">
            ✉ shivanshmehrotra308@gmail.com
          </a>
          <a href="https://github.com/EVIL3367" target="_blank" rel="noopener noreferrer" className="glass-card contact-link" id="contact-github">
            ⌂ GitHub
          </a>
          <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="glass-card contact-link" id="contact-linkedin">
            ∞ LinkedIn
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} Shivansh Mehrotra · Built with React & ☕</p>
      </footer>
    </div>
  );
}