import React from 'react'
import Button from './Button'
import './ControlPanel.css'

function ControlPanel({ nextTrack, prevTrack, play, isPlaying, duration, currentTime }) {
  function secondsToHms(seconds) {
    if (!seconds) return '00:00'

    let duration = seconds
    let hours = duration / 3600
    duration = duration % 3600

    let min = parseInt(duration / 60)
    duration = duration % 60

    let sec = parseInt(duration)

    if (sec < 10) {
      sec = `0${sec}`
    }
    if (min < 10) {
      min = `0${min}`
    }

    if (parseInt(hours, 10) > 0) {
      return `${parseInt(hours, 10)}:${min}:${sec}`
    } else if (min === 0) {
      return `00:${sec}`
    } else {
      return `${min}:${sec}`
    }
  }

  return (
    <div className='control-panel'>
      <div id="lefttime">
        <div className='timer'>{secondsToHms(currentTime)}</div>
      </div>
      <Button 
        play={play} 
        isPlaying={isPlaying}
        prevTrack={prevTrack} 
        nextTrack={nextTrack}/>
      <div id="righttime">
        <div className='timer'>{secondsToHms(duration)}</div>
      </div>
    </div>
  )
}
export default ControlPanel