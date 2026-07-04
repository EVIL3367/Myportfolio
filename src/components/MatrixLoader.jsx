import React, { useEffect, useRef } from "react";

export default function MatrixLoader({ onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters to display in the matrix (Katakana + Latin + Numerals)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // Black background with slight opacity for trailing effect
      ctx.fillStyle = "rgba(26, 26, 26, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));

        // Use Swiss Red (#e61628) or White
        ctx.fillStyle = Math.random() > 0.9 ? "#ffffff" : "#e61628";
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    // Call onComplete after 2.5 seconds
    const timeout = setTimeout(() => {
      onComplete();
    }, 2500);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [onComplete]);

  return (
    <div style={{ background: "#1a1a1a", height: "100vh", width: "100vw", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <div 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#ffffff",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "1.5rem",
          fontWeight: "700",
          letterSpacing: "2px",
          background: "rgba(26, 26, 26, 0.8)",
          padding: "1rem 2rem",
          border: "1px solid #e61628",
          textTransform: "uppercase"
        }}
      >
        Connecting to Terminal...
      </div>
    </div>
  );
}
