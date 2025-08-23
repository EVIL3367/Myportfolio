import React, { useState } from "react";
import TerminalView from "./components/TerminalView";
import PortfolioLanding from "./components/PortfolioLanding";

export default function App() {
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <div className="min-h-screen">
      {!showTerminal ? (
        <PortfolioLanding onEnter={() => setShowTerminal(true)} />
      ) : (
        <TerminalView onExit={() => setShowTerminal(false)} />
      )}
    </div>
  );
}
