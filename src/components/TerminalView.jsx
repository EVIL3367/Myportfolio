// src/components/TerminalView.jsx
import React, { useState } from "react";

const commands = {
  help: "Available commands: help, about, skills, projects, contact, clear",
  about: "Hi, I'm Shivansh Mehrotra, a passionate developer who loves Linux and building intuitive web experiences.",
  skills: "JavaScript, React, Node.js, Python, Linux, Bash, Git, SQL",
  projects: "GitHub: https://github.com/yourusername",
  contact: "Email: your.email@example.com | LinkedIn: https://linkedin.com/in/yourprofile",
  clear: ""
};

export default function TerminalView({ onExit }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");

  const handleCommand = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed === "") return;

    if (trimmed === "clear") {
      setHistory([]);
    } else {
      const output = commands[trimmed.toLowerCase()] || `Command not found: ${trimmed}`;
      setHistory([...history, { cmd: trimmed, res: output }]);
    }
    setInput("");
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <p>Welcome to Shivansh's Portfolio Terminal!</p>
          <p>Type <code>help</code> to get started or <code>clear</code> to reset.</p>
        </div>
        <div className="bg-zinc-900 rounded-lg p-4 shadow-md">
          {history.map((item, idx) => (
            <div key={idx} className="mb-2">
              <p className="text-green-300">$ {item.cmd}</p>
              <p className="text-green-500">{item.res}</p>
            </div>
          ))}
          <form onSubmit={handleCommand} className="flex items-center">
            <span className="mr-2 text-green-300">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none border-none text-green-400 placeholder-green-600"
              placeholder="Enter command..."
              autoFocus
            />
          </form>
          <button
            onClick={onExit}
            className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Exit Terminal
          </button>
        </div>
      </div>
    </div>
  );
}
