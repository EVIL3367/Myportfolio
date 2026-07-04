// Mistral AI service — sends chat messages with Shivansh's resume as system context

const SYSTEM_PROMPT = `You are an AI assistant embedded in Shivansh Mehrotra's portfolio website terminal.
You answer questions about Shivansh based ONLY on the information provided below.
Be concise, friendly, and professional. If asked something not covered below, say you don't have that information.
Use plain text formatting (no markdown), keep answers under 200 words.

═══ ABOUT SHIVANSH MEHROTRA ═══

Name: Shivansh Mehrotra
Email: shivanshmehrotra308@gmail.com
GitHub: https://github.com/EVIL3367
Role: Software Engineer — SDET / Automation Test Engineer / Backend Developer
Location: Noida, India

═══ CURRENT POSITION ═══
Company: Evolution Software Solution (Jul 2024 – Present)
Location: Noida, Sector 62
Title: Software Engineer – Automation Test Engineer / Backend Developer

Project Work:
• Cainz Project: Developed Selenium WebDriver automation frameworks using Java and TestNG. Automated 150+ regression and functional test scenarios. Created reusable test scripts. Supported Smoke Testing, Regression Testing, Agile Scrum, and Defect Lifecycle management.
• PetX Project: Executed Functional, Smoke, and Regression Testing for an AI-driven mobile application across Android and iOS. Automated critical user journeys using Appium.
• WarpX Project: Developed API and UI automation frameworks using Python and Pytest. Integrated Mistral API workflows. Validated APIs using Postman. Connected CI/CD pipelines through GitHub Actions and Docker. Contributed to Node.js backend development. Performed SQL-based data validation.

═══ EDUCATION ═══
Degree: B.Tech, Computer Science
Institution: Feroze Gandhi Institute of Engineering and Technology (FGIET)
Location: Raebareli, India
Duration: Nov 2020 – Jul 2024
GPA: 8.6

═══ TECHNICAL SKILLS ═══
Languages: Java, Python, JavaScript, TypeScript, C/C++, SQL
Test Automation: Selenium, Appium, TestNG, Pytest, REST Assured
Backend: Node.js, Express.js, Spring Boot
API Tools: Postman, Mistral API, RESTful APIs, API Automation
DevOps: Docker, GitHub Actions
Version Control: Git
OS: Windows, Linux
Other: Oracle Fusion, Oracle EPM (EDMCS, ARCS, FCCS, EPBCS), Functional Testing, Regression Testing, Smoke Testing, Agile Scrum, Defect Lifecycle Management

═══ PROJECTS ═══
1. Cainz — Java, Selenium, TestNG. Automated test scenarios for enterprise web applications.
2. PetX — Appium, Android/iOS, Manual Testing. Verified AI pet care logic across platforms.
3. WarpX — Python, Pytest, Node.js, Mistral API. Built an AI doctor simulation with CI/CD using GitHub Actions and Docker.
4. Journal App — MERN Stack. Full-stack journal application with authentication and CRUD.
5. Journal Backend API — Spring Boot, JWT, MongoDB, Docker. RESTful API service with JWT auth.

═══ CERTIFICATIONS ═══
• Version Control by Meta
• CPA – Programming Essentials in C++ by Cisco Networking Academy
• Cybersecurity Essentials by Cisco Networking Academy
• Introduction to Cybersecurity by Cisco Networking Academy
`;

/**
 * Send a user question to Mistral AI and get a response about Shivansh.
 * @param {string} question - The user's question
 * @param {AbortSignal} [signal] - Optional abort signal
 * @returns {Promise<string>} - The AI response text
 */
export async function askMistral(question, signal) {
  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;

  if (!apiKey) {
    return "⚠ Mistral API key not configured. Add VITE_MISTRAL_API_KEY to your .env.local file.";
  }

  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: question },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
      signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const msg = errorData?.message || response.statusText;
      return `⚠ Mistral API error (${response.status}): ${msg}`;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || "No response from AI.";
  } catch (err) {
    if (err.name === "AbortError") {
      return "Request cancelled.";
    }
    return `⚠ Network error: ${err.message}`;
  }
}
