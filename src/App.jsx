import React, { useState } from "react";
import TerminalView from "./components/TerminalView";
import PortfolioLanding from "./components/PortfolioLanding";

export default function App() {
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <div className="page-enter">
      {!showTerminal ? (
        <PortfolioLanding onEnter={() => setShowTerminal(true)} />
      ) : (
        <TerminalView onExit={() => setShowTerminal(false)} />
      )}
    </div>
  );
}
