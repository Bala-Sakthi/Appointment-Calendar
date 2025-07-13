import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import CalendarView from "./components/CalendarView";
import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const saved = localStorage.getItem("isLoggedIn");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", loggedIn);
  }, [loggedIn]);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <div>
      {loggedIn ? (
        <CalendarView handleLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={() => setLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
