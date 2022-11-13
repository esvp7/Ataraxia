import React, { useContext } from 'react';
import ReactSlider from 'react-slider';
import SettingsContext from "./SettingsContext";
import BackButton from "./BackButton";

const Settings = () => {
  const settingsInfo = useContext(SettingsContext);
  return (
    <div style={{textAlign:'left'}} className="settings-wrapper">
      <label className="lbl">Work Interval: {settingsInfo.workMinutes}:00</label>
      <ReactSlider
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.workMinutes}
        onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
      <label className="lbl">Break Interval: {settingsInfo.breakMinutes}:00</label>
      <ReactSlider
        className={'slider green'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.breakMinutes}
        onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />
      <div style={{textAlign:'center'}}>
        <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
      </div>

    </div>
  )
}

export default Settings