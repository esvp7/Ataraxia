import React, { useState } from 'react';
import Timer from "./Timer";
import Settings from './Settings';
import SettingsContext from "./SettingsContext";

const PomodoroTimer = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <div className="pomodoro-container">
    <main className="main-wrap">
    <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
    {showSettings ? <Settings /> : <Timer />}
    </SettingsContext.Provider>
    </main>
    </div>
  );
}

export default PomodoroTimer