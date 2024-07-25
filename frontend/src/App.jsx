import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [random, setRandom] = useState(0);
  const fetchFromFlask = async () => {
    const res = await fetch("/api/random");
    if (!res.ok) {
      console.log(res);
      alert("request failed, see the response details in logs");
      return;
    }
    const data = await res.json();
    setRandom(data.random_number);
  };
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="read-the-docs">Random number from Flask</p>
      <button onClick={fetchFromFlask}>Random number is {random}</button>
    </>
  );
}

export default App;
