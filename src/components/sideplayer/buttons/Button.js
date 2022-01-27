import React from 'react'
import './Button.css'

function Button({nextTrack, prevTrack, play, isPlaying }) {
  return (
    <div id="playsnexts">
        <div id="prev"
          onClick={prevTrack}>
        </div>
        <div 
            onClick={play} 
            className={isPlaying ? 'btn-stop' : 'btn-play'} 
            id="playpause">
        </div>
        <div id="next"
          onClick={nextTrack}>
        </div>
    </div>
  )
}
export default Button