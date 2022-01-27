import React from 'react'
import './Button.css'

function Button({ play, isPlaying }) {
  return (
    <div id="playsnexts">
        <div id="prev"></div>
        <div 
            onClick={play} 
            className={isPlaying ? 'btn-stop' : 'btn-play'} 
            id="playpause">
        </div>
        <div id="next"></div>
    </div>
  )
}
export default Button