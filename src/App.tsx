import { useState } from "react";

function App() {
  const [java, setJava] = useState("");

  async function checkJava() {
    const result =
        await window.electronAPI.getJavaVersion();

    setJava(result);
  }

  return (
      <div>
        <h1>Minecraft Manager</h1>

        <button onClick={checkJava}>
          Verificar Java
        </button>

        <pre>{java}</pre>
      </div>
  );
}