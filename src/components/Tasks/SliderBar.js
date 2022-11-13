import React from 'react'
import { Slider } from "@mui/material";
import { useProjectsValue } from '../../context';


const SliderBar = () => {
  const {progress, setProgress} = useProjectsValue();
  return (
    <div>
            <Slider 
              style={{ width: '2000%', 'marginLeft': '20px' }}
              size="small"
              value={progress}
              defaultValue={0}
              onChange={(e) => setProgress(e.target.value)}
              valueLabelDisplay="auto"/>
    </div>
  )
}

export default SliderBar;