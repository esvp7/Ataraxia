import React, { useState, useRef} from 'react'
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import useSound from 'use-sound';
import mySound from './track.mp3'

const TrackPlayer = () => {
  const [isPaused, setIsPaused] = useState(true);
  const isPausedRef = useRef(isPaused);
  const [play, {stop}] = useSound(mySound, { volume: 0.05 });
  if (!isPausedRef.current) {
    play();
  }
  if (isPausedRef.current) {
    stop();
  }
  return (
    <div>
    {isPaused
      ? <VolumeUpOutlinedIcon onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
      : <VolumeUpIcon onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
    </div>
  )
}

export default TrackPlayer;