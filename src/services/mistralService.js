/**
 * Send a user question to the secure backend proxy (/api/ask-mistral)
 * which communicates with the Mistral AI API.
 * 
 * @param {string} question - The user's question
 * @param {AbortSignal} [signal] - Optional abort signal
 * @returns {Promise<string>} - The AI response text
 */
export async function askMistral(question, signal) {
  try {
    const response = await fetch("/api/ask-mistral", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
      signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const msg = errorData?.error || response.statusText;
      return `⚠ Backend Proxy Error (${response.status}): ${msg}`;
    }

    const data = await response.json();
    return data.answer || "No response from AI.";
  } catch (err) {
    if (err.name === "AbortError") {
      return "Request cancelled.";
    }
    return `⚠ Network error: ${err.message}`;
  }
}
