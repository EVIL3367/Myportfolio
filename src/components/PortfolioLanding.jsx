import React, { useEffect, useState } from "react";

const ROLES = [
  "SDET & AUTOMATION ENGINEER",
  "BACKEND DEVELOPER",
  "SECURITY TESTING SPECIALIST",
  "COMPLIANCE TESTER",
  "AI INTEGRATION ENGINEER",
];

const SKILLS = [
  {
    title: "LANGUAGES",
    items: ["Java", "Python", "JavaScript", "TypeScript", "C/C++", "SQL"],
  },
  {
    title: "TEST AUTOMATION",
    items: ["Selenium", "Appium", "TestNG", "Pytest", "REST Assured"],
  },
  {
    title: "BACKEND & APIS",
    items: ["Node.js", "Express.js", "Spring Boot", "Postman", "RESTful APIs", "Mistral API"],
  },
  {
    title: "DEVOPS & TOOLS",
    items: ["Docker", "GitHub Actions", "Git", "CI/CD Pipelines"],
  },
  {
    title: "TESTING PRACTICES",
    items: ["Functional Testing", "Regression Testing", "Smoke Testing", "Agile Scrum", "Defect Lifecycle"],
  },
  {
    title: "PLATFORMS & OTHER",
    items: ["Linux", "Windows", "Oracle Fusion", "Oracle EPM", "MS Office"],
  },
];

const PROJECTS = [
  {
    title: "WARPX",
    desc: "AI doctor simulation with API + UI automation using Python/Pytest. Integrated Mistral API workflows, CI/CD with GitHub Actions & Docker, and Node.js backend.",
    tech: ["Python", "Pytest", "Node.js", "Mistral API", "Docker"],
  },
  {
    title: "CAINZ",
    desc: "Enterprise Selenium WebDriver automation framework with Java & TestNG. Automated 150+ regression and functional test scenarios with reusable scripts.",
    tech: ["Java", "Selenium", "TestNG"],
  },
  {
    title: "PETX",
    desc: "AI-driven mobile app testing across Android & iOS platforms. Automated critical user journeys with Appium and validated AI pet care logic.",
    tech: ["Appium", "Android", "iOS", "Manual Testing"],
  },
  {
    title: "JOURNAL APP",
    desc: "Full-stack journal application with user authentication and CRUD functionality built with the MERN stack.",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
  },
  {
    title: "JOURNAL BACKEND API",
    desc: "RESTful API service with JWT authentication, MongoDB integration, and Docker deployment using Spring Boot.",
    tech: ["Spring Boot", "JWT", "MongoDB", "Docker"],
  },
];

const CERTIFICATIONS = [
  { title: "VERSION CONTROL", issuer: "Meta" },
  { title: "CPA – PROGRAMMING ESSENTIALS IN C++", issuer: "Cisco Networking Academy" },
  { title: "CYBERSECURITY ESSENTIALS", issuer: "Cisco Networking Academy" },
  { title: "INTRODUCTION TO CYBERSECURITY", issuer: "Cisco Networking Academy" },
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
      {/* Navigation */}
      <nav className="landing-nav">
        <a href="#hero" className="nav-logo">
          SHIVANSH MEHROTRA
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
        <div className="container">
          <div className="hero-content">
            <span className="hero-subtitle animate-fade-in-up">
              {roleText}
              <span className="cursor" style={{ opacity: isDeleting ? 0 : 1, marginLeft: '4px' }}>|</span>
            </span>
            <h1 className="hero-name animate-fade-in-up delay-100">
              SOFTWARE ENGINEER<br />& AUTOMATION TESTER
            </h1>
            <p className="hero-description animate-fade-in-up delay-200">
              I specialize in robust test automation, security testing, and backend development. 
              Currently building reliable software with AI-integrated workflows at Evolution Software Solution.
            </p>
            <div className="hero-buttons animate-fade-in-up delay-300">
              <button onClick={onEnter} className="btn-primary" id="enter-terminal-btn">
                WANT TO KNOW MORE ABOUT ME?
              </button>
              <a href="#projects" className="btn-secondary">
                View Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className={`section section-alt ${isVisible("skills") ? "animate-fade-in-up" : ""}`} style={{ opacity: isVisible("skills") ? 1 : 0 }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">01 / Technical Stack</span>
            <h2 className="section-title">SKILLS & TECHNOLOGIES</h2>
          </div>
          <div className="grid-layout">
            {SKILLS.map((group, i) => (
              <div
                key={group.title}
                className={`swiss-card ${isVisible("skills") ? "animate-fade-in-up" : ""}`}
                style={{ animationDelay: `${i * 0.1}s`, opacity: isVisible("skills") ? undefined : 0 }}
              >
                <h3 className="card-title">{group.title}</h3>
                <div className="tags-wrapper">
                  {group.items.map((item) => (
                    <span key={item} className="swiss-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className={`section ${isVisible("experience") ? "animate-fade-in-up" : ""}`} style={{ opacity: isVisible("experience") ? 1 : 0 }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">02 / Professional Journey</span>
            <h2 className="section-title">EXPERIENCE</h2>
          </div>
          
          <div className="experience-list">
            <div className="experience-item">
              <div className="exp-date">JUL 2024 — PRESENT</div>
              <div className="exp-role">Software Engineer — Automation Test Engineer / Backend Developer</div>
              <div className="exp-company">Evolution Software Solution · Noida</div>
              <ul className="exp-details">
                <li><strong>Cainz:</strong> Developed Selenium WebDriver automation frameworks with Java & TestNG, automating 150+ regression and functional test scenarios.</li>
                <li><strong>PetX:</strong> Executed Functional, Smoke & Regression Testing for an AI-driven mobile app across Android & iOS using Appium.</li>
                <li><strong>WarpX:</strong> Built API & UI automation with Python/Pytest, integrated Mistral API, connected CI/CD via GitHub Actions & Docker.</li>
              </ul>
            </div>

            <div className="experience-item">
              <div className="exp-date">NOV 2020 — JUL 2024</div>
              <div className="exp-role">B.Tech, Computer Science</div>
              <div className="exp-company">Feroze Gandhi Institute of Engineering and Technology · Raebareli</div>
              <ul className="exp-details">
                <li>Graduated with a GPA of 8.6 / 10</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className={`section section-alt ${isVisible("projects") ? "animate-fade-in-up" : ""}`} style={{ opacity: isVisible("projects") ? 1 : 0 }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">03 / Selected Work</span>
            <h2 className="section-title">PROJECTS</h2>
          </div>
          
          <div className="grid-layout">
            {PROJECTS.map((project, i) => (
              <div
                key={project.title}
                className={`swiss-card ${isVisible("projects") ? "animate-fade-in-up" : ""}`}
                style={{ animationDelay: `${i * 0.1}s`, opacity: isVisible("projects") ? undefined : 0 }}
              >
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{project.desc}</p>
                <div className="tags-wrapper">
                  {project.tech.map((t) => (
                    <span key={t} className="swiss-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className={`section ${isVisible("certifications") ? "animate-fade-in-up" : ""}`} style={{ opacity: isVisible("certifications") ? 1 : 0 }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">04 / Credentials</span>
            <h2 className="section-title">CERTIFICATIONS</h2>
          </div>
          
          <div className="grid-layout">
            {CERTIFICATIONS.map((cert, i) => (
              <div
                key={cert.title}
                className={`swiss-card ${isVisible("certifications") ? "animate-fade-in-up" : ""}`}
                style={{ animationDelay: `${i * 0.1}s`, opacity: isVisible("certifications") ? undefined : 0 }}
              >
                <h3 className="card-title">{cert.title}</h3>
                <p className="card-desc">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={`section contact-section ${isVisible("contact") ? "animate-fade-in-up" : ""}`} style={{ opacity: isVisible("contact") ? 1 : 0 }}>
        <div className="container">
          <span className="section-label">05 / Connect</span>
          <h2 className="section-title">GET IN TOUCH</h2>
          
          <div className="contact-links">
            <a href="mailto:shivanshmehrotra308@gmail.com" className="contact-link" id="contact-email">
              EMAIL
            </a>
            <a href="https://github.com/EVIL3367" target="_blank" rel="noopener noreferrer" className="contact-link" id="contact-github">
              GITHUB
            </a>
            <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="contact-link" id="contact-linkedin">
              LINKEDIN
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} SHIVANSH MEHROTRA · BUILT WITH REACT
      </footer>
    </div>
  );
}