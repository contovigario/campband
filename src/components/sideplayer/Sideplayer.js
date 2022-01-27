import React, {useState, useRef} from "react";
import "../playlist/fontawesome/css/all.css";
import "./Sideplayer.css";
import ControlPanel from "./buttons/ControlPanel";
import Slider from "./slider/Slider";

function Sideplayer(props) {

    const [percentage, setPercentage] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    
    const audioRef = useRef()

    const onChange = (e) => {
      const audio = audioRef.current
      audio.currentTime = (audio.duration / 100) * e.target.value
      setPercentage(e.target.value)
    }

  const play = () => {
    console.log(props.selectedTrack);
    const audio = audioRef.current
    audio.volume = 0.1

    if (!isPlaying) {
      setIsPlaying(true)
      audio.play()
    }

    if (isPlaying) {
      setIsPlaying(false)
      audio.pause()
    }
  }

  const getCurrDuration = (e) => {
    const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100)
    const time = e.currentTarget.currentTime

    setPercentage(+percent)
    setCurrentTime(time)
  }

    return (
      <div className="flex-container-v">
        <div id="blank"></div>
        <div id="cover"></div>
        <div id="player_controls">
            <ControlPanel
                play={play}
                isPlaying={isPlaying}
                duration={duration}
                currentTime={currentTime} />
            <Slider percentage={percentage} onChange={onChange} />
            <audio
                ref={audioRef}
                onTimeUpdate={getCurrDuration}
                onLoadedData={(e) => {
                    setDuration(e.currentTarget.duration)
                }}
                
                >
                </audio>
        </div>
      </div>
    )

}

export default Sideplayer;