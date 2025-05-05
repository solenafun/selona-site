
import React, { useState } from "react";

export default function SelonaPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const tokenLaunched = true; // ← passe à false si tu veux masquer la section

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are Selona, a parody AI. You're sarcastic, overly confident, and mock anything related to Solana, crypto, or tech. Always stay in character. Use dry humor and wit."
            },
            ...updatedMessages
          ]
        })
      });

      const data = await response.json();
      const botMessage = data.choices[0].message;
      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold">Selona</h1>
        <p className="text-xl mt-2 italic">The sarcastic AI. Drawn to underdeliver.</p>
        <img
          src="/logo.png"
          alt="Selona Logo"
          className="mx-auto mt-6 w-32 h-32"
        />
      </header>

      <section className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-2xl border border-black">
        <h2 className="text-2xl font-bold mb-4">Ask Selona anything*</h2>
        <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div key={index} className={msg.role === "user" ? "text-right" : "text-left"}>
              <p className="bg-purple-100 text-black inline-block px-4 py-2 rounded-xl border border-purple-300">
                <strong>{msg.role === "user" ? "You" : "Selona"}:</strong> {msg.content}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-black"
            placeholder="Type your question..."
          />
          <button onClick={sendMessage} className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-xl">
            Send
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">*Selona may respond with nonsense. Obviously.</p>
      </section>

      {tokenLaunched && (
        <section className="text-center mt-16">
          <h2 className="text-3xl font-bold">Selona Token</h2>
          <p className="mt-2 font-semibold">Contract Address</p>
          <div className="inline-flex items-center gap-2 mt-2 justify-center">
            <span
              id="token-address"
              className="font-mono bg-gray-200 text-black px-4 py-2 rounded-md border border-gray-400"
            >
              ?
            </span>
            <button
              onClick={() => {
                const address = "9Ms4fTQGuacjPx1MTS7kG1asoH5ryTmdsHrMQ6A7pump";
                const el = document.createElement("textarea");
                el.value = address;
                document.body.appendChild(el);
                el.select();
                document.execCommand("copy");
                document.body.removeChild(el);
                alert("Copied: " + address);
              }}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Copy
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Launch incoming. Address will appear here once Selona decides to show up.
          </p>
        </section>
      )}

      <section className="text-center mt-16">
        <h2 className="text-3xl font-bold">Follow the nonsense</h2>
        <p className="mt-2">We're live on X, because of course we are:</p>
        <a
          href="https://x.com/selona_fun"
          target="_blank"
          className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline"
        >
          🐦 @selona_fun
        </a>
      </section>

      <footer className="text-center mt-16 text-sm text-gray-400 italic">
        *Disclaimer: Selona is a parody. Any resemblance to useful AI is purely coincidental.
      </footer>
    </div>
  );
}
