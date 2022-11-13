import React from 'react'
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import useSound from 'use-sound';
import mySound from './track.mp3'


const TrackPlayer = ({ isPlaying }) => {
  const [play, {stop}] = useSound(mySound);
  isPlaying && play();
  !isPlaying && stop();
  return (
    <div>
      {!isPlaying && <VolumeUpOutlinedIcon />}
      {isPlaying && <VolumeUpIcon />}
    </div>
  )
}

export default TrackPlayer;