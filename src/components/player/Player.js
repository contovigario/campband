//import logo from './logo.svg';
import React, {useState} from 'react';
import Sideplayer from '../sideplayer/Sideplayer.js';
import Playlist from '../playlist/Playlist.js';

function Player() {

    const tracklist = [
        {
            id:1,
            name: "Falaise",
            duration: "2:56",
            selected:false
        },
        {
            id:2,
            name: "Monjoq2",
            duration: "4:20",
            selected:false
        },
        {
            id:3,
            name: "Carbonated",
            duration: "6:10",
            selected:false
        },
        {
            id:4,
            name: "Rodent",
            duration: "11:32",
            selected:false
        },
      ];

    const [selectedTrack, setSelectedTrack] = useState(0);

    const selectTrack = (trackid) => {
        setSelectedTrack(trackid);
    }

    return (
        <div className="flex-container-h">
            <Playlist 
                tracklist = {tracklist}
                selectTrack={selectTrack} 
                selectedTrack = {selectedTrack} />
            <Sideplayer selectedTrack={selectedTrack} />
        </div>
    );
}

export default Player;
