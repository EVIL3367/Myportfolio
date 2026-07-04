import React, { useState } from "react";
import PortfolioLanding from "./components/PortfolioLanding";
import MatrixLoader from "./components/MatrixLoader";
import TerminalView from "./components/TerminalView";

export default function App() {
  // 'landing' | 'loading' | 'terminal'
  const [view, setView] = useState("landing");

  return (
    <div className="page-enter">
      {view === "landing" && <PortfolioLanding onEnter={() => setView("loading")} />}
      {view === "loading" && <MatrixLoader onComplete={() => setView("terminal")} />}
      {view === "terminal" && <TerminalView onExit={() => setView("landing")} />}
    </div>
  );
}
