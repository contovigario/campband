import React, {useState, useRef, useEffect} from "react";
import "../playlist/fontawesome/css/all.css";
import "./Sideplayer.css";
import ControlPanel from "./buttons/ControlPanel";
import Slider from "./slider/Slider";
import mrjames from '../../audio/MR_JAMES.mp3'
import answers from '../../audio/answers.mp3'
import dontneed from '../../audio/dontneed.mp3'

function Sideplayer(props) {

  const [percentage, setPercentage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioSource, setAudioSource] = useState(0)
  const [loopAudios, setLoopAudios] = useState(true)
  
  const audioRef = useRef()

  const onChange = (e) => {
    const audio = audioRef.current
    audio.currentTime = (audio.duration / 100) * e.target.value
    setPercentage(e.target.value)
  }

  const play = () => {

    const audio = audioRef.current
    audio.volume = 0.1

    switch(props.selectedTrack) {
      case 0:
      case -1:
        console.log('case 0')
        props.selectTrack(1)
        break;
      case 1:
      case 2:
      case 3:
        console.log('case 1 2 3')
        if (!isPlaying || (isPlaying && !loopAudios)) {
          console.log('play')
          setIsPlaying(true)
          audio.play()
          setLoopAudios(true)
        }
        else if (isPlaying) {
          console.log('pause')
          setIsPlaying(false)
          audio.pause()
        }
        break;
      default:
        break;
    }
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
        console.log('useEffect 0')
        setAudioSource(0);
        setIsLoading(false)
        break;
      case 1:
        console.log('useEffect 1')
        setAudioSource(mrjames);
        setIsLoading(true)
        break;
      case 2:
        console.log('useEffect 2')
        setAudioSource(answers);
        setIsLoading(true)
        break;
      case 3:
        console.log('useEffect 3')
        setAudioSource(dontneed);
        setIsLoading(true)
        break;
      case -1:
        console.log('case -1 in effect')
        setIsLoading(false)
        setIsPlaying(false)
        setPercentage(0)
        setCurrentTime(0)
        setAudioSource(0);
        audioRef.current.pause()
        break;
      default:
    }
  }, [props.selectedTrack])

  useEffect (() => {
    if(props.selectedTrack !== 0 && percentage===100 && loopAudios) {
        console.log('autoNEXT')
        setLoopAudios(false);
        props.selectTrack(
          (props.selectedTrack + 1 > 3 ? -1 : props.selectedTrack + 1)
        )
    }
  }, [percentage, props])

  const nextTrack = () => {
    props.selectTrack(
      (props.selectedTrack + 1 > 3 ? -1 : props.selectedTrack + 1)
    )
  }

  const prevTrack = () => {
    props.selectTrack(
      (props.selectedTrack - 1 < 1 ? -1 : props.selectedTrack - 1)
    )
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
                    console.log('onloadeddata: ' + props.selectedTrack)
                    setIsLoading(false)
                    play()
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