// pages/index.js
import { useState, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [inputList, setInputList] = useState([]);

  // Fetch saved inputs on page load
  useEffect(() => {
    const fetchInputs = async () => {
      const res = await fetch("/api/get-inputs");
      const data = await res.json();
      if (data.success) setInputList(data.data);
    };
    fetchInputs();
  }, []);

  // Handle Save
  const handleSave = async () => {
    if (!input.trim()) return;
    const res = await fetch("/api/save-input", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: input }),
    });

    if (res.ok) {
      const saved = await res.json();
      setInputList([saved.data, ...inputList]); // Add new input on top
      setInput("");
    } else {
      alert("Error saving input");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Save Input</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "0.5rem", width: "300px" }}
      />
      <button onClick={handleSave} style={{ marginLeft: "1rem", padding: "0.5rem" }}>
        Save
      </button>

      <h2 style={{ marginTop: "2rem" }}>Saved Inputs</h2>
      <ul style={{ paddingLeft: "1rem" }}>
        {inputList.map((item) => (
          <li key={item._id} style={{ marginBottom: "0.5rem" }}>
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
