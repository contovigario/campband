import React, {useState, useRef, useEffect} from "react";
import "../fontawesome/css/all.css";
import "./Sideplayer.css";
import ControlPanel from "./buttons/ControlPanel";
import Slider from "./slider/Slider";



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

    const audio = audioRef.current
    audio.volume = 0.5

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
        if (!isPlaying || (isPlaying && !props.loopAudios)) {
          console.log('play ' + String(isPlaying) + '-' + String(props.loopAudios))
          setIsPlaying(true)
          audio.play()
          props.setLoopAudios(true)
        }
        else if (isPlaying) {
          console.log('pause ' + String(isPlaying) + '-' + String(props.loopAudios))
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
        console.log('case 0')
        setAudioSource(0);
        setIsLoading(false)
        break;
      case -1:
        console.log('case -1')
        setIsLoading(false)
        setIsPlaying(false)
        setPercentage(0)
        setCurrentTime(0)
        setAudioSource(0);
        audioRef.current.pause()
        break;
      default:
        const aSrc = 
          (props.albums[props.selectedViewAlbum-1].tracklist[props.selectedTrack-1].file ?
            props.albums[props.selectedViewAlbum-1].tracklist[props.selectedTrack-1].file :
            0)
        setAudioSource(aSrc);
        setIsLoading(true)
        break;
    }
  }, [props.selectedTrack])
  
  useEffect (() => {
    if(props.selectedTrack !== 0 && percentage===100 && props.loopAudios) {
        console.log('autoNEXT')
        props.setLoopAudios(false);
        props.selectTrack(
          (props.albums[props.selectedViewAlbum-1].tracklist[props.selectedTrack] ? 
            (props.selectedTrack+1) : 
            -1)
        )
    }
  }, [percentage, props])

  useEffect (() => {
    if(props.selectedTrack !== 0 && percentage===100 && props.loopAudios) {
        console.log('autoNEXT')
    }
  }, [props.selectedViewAlbum])

  const nextTrack = () => {
    props.selectTrack(
      (props.albums[props.selectedViewAlbum-1].tracklist[props.selectedTrack] ? 
        (props.selectedTrack+1) : 
        -1)
    )
  }

  const prevTrack = () => {
    props.selectTrack(
      (props.albums[props.selectedViewAlbum-1].tracklist[props.selectedTrack-2] ? 
        (props.selectedTrack-1) : 
        -1)
    )
  }

    return (
      <div 
        id="sideplayer"
        className=
          {(props.albums[props.selectedViewAlbum-1] && props.tracklist[props.selectedTrack-1]) ? 
            'flex-container-v fadeIn' : 
            'flex-container-v fadeOut'} 
          >
        <div id="blank"></div>
        <div id="cover" 
          className=
            {(props.albums[props.selectedViewAlbum-1] && props.tracklist[props.selectedTrack-1]) ? 
              props.albums[props.selectedViewAlbum-1].cover : 
              'blankClass'}>
        </div>
        <div id="player_controls">
            <ControlPanel
                play={play}
                isPlaying={isPlaying}
                duration={duration}
                currentTime={currentTime}
                nextTrack={nextTrack}
                prevTrack={prevTrack} />
            <Slider 
                tracklist={props.tracklist}
                selectedTrack={props.selectedTrack}
                percentage={percentage} 
                onChange={onChange} />
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