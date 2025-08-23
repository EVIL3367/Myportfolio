import React from "react";

export default function PortfolioLanding({ onEnter }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4 bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Welcome to Shivansh's Portfolio</h1>
      <p className="mb-6">Explore my skills and experience in a unique terminal interface.</p>
      <button
        onClick={onEnter}
        className="bg-black text-green-400 px-6 py-2 rounded hover:bg-zinc-800"
      >
        Enter Terminal View
      </button>
    </div>
  );
}