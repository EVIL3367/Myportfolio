// src/components/TerminalView.jsx
import React, { useEffect, useRef, useState } from "react";
import { askMistral } from "../services/mistralService";

// Static command responses
const STATIC_COMMANDS = {
  help: `Available commands:
  ls          — List all commands
  about       — About Shivansh Mehrotra
  skills      — Technical skills
  projects    — Project highlights
  experience  — Work experience
  education   — Education details
  contact     — Contact information
  ask <query> — Ask the AI anything about Shivansh
  clear       — Clear terminal history
  exit        — Return to portfolio landing page`,

  ls: "help  about  skills  projects  experience  education  contact  ask  clear  exit",

  about: `Hi! I'm Shivansh Mehrotra 👋
Software Engineer at Evolution Software Solution, Noida.
I specialize in Test Automation, Security Testing, Backend Development,
and AI-integrated workflows. I love Linux, building robust automation
frameworks, and shipping reliable software.`,

  skills: `Languages:       Java, Python, JavaScript, TypeScript, C/C++, SQL
Test Automation:  Selenium, Appium, TestNG, Pytest, REST Assured
Backend:          Node.js, Express.js, Spring Boot
API Tools:        Postman, Mistral API, RESTful APIs
DevOps:           Docker, GitHub Actions, Git
Platforms:        Linux, Windows`,

  projects: `1. WarpX      — Python/Pytest + Mistral API + Docker + GitHub Actions
2. Cainz      — Java/Selenium/TestNG — 150+ automated test scenarios
3. PetX       — Appium mobile testing (Android + iOS)
4. Journal    — MERN stack full-stack app with auth
5. Journal API — Spring Boot + JWT + MongoDB + Docker`,

  experience: `Software Engineer — SDET / Backend Developer
Evolution Software Solution | Noida, Sector 62 | Jul 2024 – Present

• Cainz: Selenium/Java automation, 150+ test scenarios, Agile Scrum
• PetX: Mobile testing with Appium on Android/iOS
• WarpX: Python/Pytest API automation, Mistral API, CI/CD, Node.js backend`,

  education: `B.Tech, Computer Science
Feroze Gandhi Institute of Engineering and Technology
Raebareli, India | Nov 2020 – Jul 2024 | GPA: 8.6`,

  contact: `Email:    shivanshmehrotra308@gmail.com
GitHub:   https://github.com/EVIL3367
LinkedIn: https://linkedin.com/in/`,
};

export default function TerminalView({ onExit }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typedOutput, setTypedOutput] = useState("");
  const typingIndex = useRef(0);
  const typingTimeout = useRef(null);
  const abortRef = useRef(null);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, typedOutput, loading]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const typeOutput = (output, cmd, isAI = false) => {
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    const speed = isAI ? 12 : 8;

    if (typingIndex.current < output.length) {
      setTypedOutput((prev) => prev + output[typingIndex.current]);
      typingIndex.current += 1;
      typingTimeout.current = setTimeout(() => typeOutput(output, cmd, isAI), speed);
    } else {
      setHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { cmd, res: output, isAI };
        return updated;
      });
      setTyping(false);
      setTypedOutput("");
      inputRef.current?.focus();
    }
  };

  const startTypingEffect = (output, cmd, isAI = false) => {
    setHistory((prev) => [...prev, { cmd, res: "", isAI }]);
    setInput("");
    setTyping(true);
    setTypedOutput("");
    typingIndex.current = 0;
    typeOutput(output, cmd, isAI);
  };

  const handleCommand = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed === "" || typing || loading) return;

    const lower = trimmed.toLowerCase();

    // Clear
    if (lower === "clear") {
      setHistory([]);
      setInput("");
      setTypedOutput("");
      return;
    }

    // Exit
    if (lower === "exit") {
      onExit();
      return;
    }

    // AI ask command
    if (lower.startsWith("ask ")) {
      const question = trimmed.substring(4).trim();
      if (!question) {
        startTypingEffect("Usage: ask <your question>\nExample: ask What projects has Shivansh worked on?", trimmed);
        return;
      }

      setHistory((prev) => [...prev, { cmd: trimmed, res: "", isAI: true }]);
      setInput("");
      setLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      const response = await askMistral(question, controller.signal);
      abortRef.current = null;
      setLoading(false);

      // Update the last history entry with AI response and type it out
      setHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { cmd: trimmed, res: "", isAI: true };
        return updated;
      });
      setTyping(true);
      setTypedOutput("");
      typingIndex.current = 0;
      typeOutput(response, trimmed, true);
      return;
    }

    // Static commands
    const output = STATIC_COMMANDS[lower];
    if (output !== undefined) {
      startTypingEffect(output, trimmed);
    } else {
      startTypingEffect(
        `Command not found: ${trimmed}\nType 'help' for available commands.`,
        trimmed
      );
    }
  };

  const handleTerminalClick = () => {
    if (!typing && !loading) {
      inputRef.current?.focus();
    }
  };

  return (
    <div className="terminal-container page-enter">
      <div className="terminal-window">
        {/* macOS-style chrome */}
        <div className="terminal-chrome">
          <div className="terminal-dot red" />
          <div className="terminal-dot yellow" />
          <div className="terminal-dot green" />
          <span className="terminal-chrome-title">shivansh@portfolio ~ %</span>
        </div>

        {/* Terminal body */}
        <div
          className="terminal-body"
          ref={terminalRef}
          onClick={handleTerminalClick}
        >
          {/* Welcome message */}
          <div className="terminal-welcome">
            <p>Welcome to Shivansh's Portfolio Terminal! 🚀</p>
            <p>Type <span style={{ color: "var(--accent-green)" }}>help</span> to see available commands or <span style={{ color: "var(--accent-purple)" }}>ask &lt;question&gt;</span> to chat with AI.</p>
          </div>

          {/* Command history */}
          {history.map((item, idx) => (
            <div key={idx}>
              <div className="terminal-history-cmd">
                <span className="prompt">shivansh@portfolio</span> ~ % {item.cmd}
              </div>
              <div className={`terminal-history-res${item.isAI ? " ai" : ""}`}>
                {idx === history.length - 1 && (typing || loading)
                  ? loading
                    ? ""
                    : typedOutput
                  : item.res}
              </div>
            </div>
          ))}

          {/* Loading indicator for AI */}
          {loading && (
            <div className="terminal-loading">
              ⏳ Thinking<span className="terminal-loading-dots" />
            </div>
          )}

          {/* Input line */}
          <form onSubmit={handleCommand} className="terminal-input-row">
            <span className="terminal-prompt">shivansh@portfolio ~ %</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="terminal-input"
              placeholder="type a command..."
              autoFocus
              disabled={typing || loading}
              id="terminal-command-input"
            />
          </form>

          {/* Exit button */}
          <button
            onClick={onExit}
            className="terminal-exit-btn"
            disabled={typing || loading}
            id="terminal-exit-btn"
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
