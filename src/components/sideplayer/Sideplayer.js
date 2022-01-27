import React, {useState, useRef, useEffect} from "react";
import "../playlist/fontawesome/css/all.css";
import "./Sideplayer.css";
import ControlPanel from "./buttons/ControlPanel";
import Slider from "./slider/Slider";
import mrjames from '../../audio/MR_JAMES.mp3'
import answers from '../../audio/answers.mp3'

function Sideplayer(props) {

    const [percentage, setPercentage] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [audioSource, setAudioSource] = useState(0)
    
    const audioRef = useRef()

    const onChange = (e) => {
      const audio = audioRef.current
      audio.currentTime = (audio.duration / 100) * e.target.value
      setPercentage(e.target.value)
    }

  const play = () => {
    if(props.selectedTrack!==0) {
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
    else 
      props.selectTrack(1)
  }

  const getCurrDuration = (e) => {
    if(props.selectedTrack !== 0) {
      const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100)
      const time = e.currentTarget.currentTime

      setPercentage(+percent)
      setCurrentTime(time)
    }
  }

  useEffect(() => {
    switch(props.selectedTrack) {
      case 0:
        setIsLoading(false)
        break;
      case 1:
        setAudioSource(mrjames);
        setIsLoading(true)
        break;
      case 2:
        setAudioSource(answers);
        setIsLoading(true)
        break;
      default:
    }
  }, [props.selectedTrack])

  const nextTrack = () => {
    const trackidSelected = props.selectedTrack + 1;
    props.selectTrack(trackidSelected)
  }

  const prevTrack = () => {
    const trackidSelected = props.selectedTrack - 1;
    props.selectTrack(trackidSelected)
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
                currentTime={currentTime}
                nextTrack={nextTrack}
                prevTrack={prevTrack} />
            <Slider percentage={percentage} onChange={onChange} />
            <audio
                ref={audioRef}
                onTimeUpdate={getCurrDuration}
                onLoadedData={(e) => {
                  console.log('isLoading: ' + isLoading)
                  setDuration(e.currentTarget.duration)
                  if(isLoading) {
                    setIsLoading(false)
                    setIsPlaying(true)
                    audioRef.current.play()
                  }
                }}
                src={audioSource}
                >
                </audio>
        </div>
      </div>
    )

}

export default Sideplayer;