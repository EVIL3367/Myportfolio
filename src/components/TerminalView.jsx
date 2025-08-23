// src/components/TerminalView.jsx
import React, { useEffect, useRef, useState } from "react";

const commands = {
  ls: "Available commands: ls, about, skills, projects, contact, clear",
  about: "Hi, I'm Shivansh Mehrotra, a passionate developer who loves Linux and building intuitive web experiences.",
  skills: "JavaScript, React, Node.js, Python, Linux, Bash, Git, SQL",
  projects: "GitHub: https://github.com/yourusername",
  contact: "Email: your.email@example.com | LinkedIn: https://linkedin.com/in/yourprofile",
  clear: ""
};

export default function TerminalView({ onExit }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [typedOutput, setTypedOutput] = useState("");
  const typingIndex = useRef(0);
  const typingTimeout = useRef(null);

  // Scroll to bottom on new output
  const terminalRef = useRef(null);
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, typedOutput]);

  const handleCommand = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed === "") return;

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      setTypedOutput("");
      return;
    }

    const output = commands[trimmed.toLowerCase()] || `Command not found: ${trimmed}`;
    setHistory([...history, { cmd: trimmed, res: "" }]);
    setInput("");
    setTyping(true);
    setTypedOutput("");
    typingIndex.current = 0;

    // Start typing effect
    typeOutput(output, trimmed);
  };

  const typeOutput = (output, cmd) => {
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    if (typingIndex.current < output.length) {
      setTypedOutput((prev) => prev + output[typingIndex.current]);
      typingIndex.current += 1;
      typingTimeout.current = setTimeout(() => typeOutput(output, cmd), 20); // Adjust speed here
    } else {
      // Update last history entry with full output
      setHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = { cmd, res: output };
        return newHistory;
      });
      setTyping(false);
      setTypedOutput("");
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <p>Welcome to Shivansh's Portfolio Terminal!</p>
          <p>Type <code>help</code> to get started or <code>clear</code> to reset.</p>
        </div>
        <div
          className="bg-zinc-900 rounded-lg p-4 shadow-md h-[60vh] overflow-y-auto"
          ref={terminalRef}
        >
          {history.map((item, idx) => (
            <div key={idx} className="mb-2">
              <p className="text-green-300">$ {item.cmd}</p>
              <p className="text-green-500">{idx === history.length - 1 && typing ? typedOutput : item.res}</p>
            </div>
          ))}
          <form onSubmit={handleCommand} className="flex items-center mt-2">
            <span className="mr-2 text-green-300">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none border-none text-green-400 placeholder-green-600"
              placeholder="Enter command..."
              autoFocus
              disabled={typing}
            />
          </form>
          <button
            onClick={onExit}
            className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={typing}
          >
            Exit Terminal
          </button>
        </div>
      </div>
    </div>
  );
}
