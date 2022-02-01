//import logo from './logo.svg';
import React, {useState, useEffect} from 'react';

//Components
import Sideplayer from '../sideplayer/Sideplayer.js';
import Playlist from '../playlist/Playlist.js';
import AlbumList from '../albumlist/AlbumList.js'

//Audio sources
import a_captainAlex from '../../audio/Condominium/01 - Captain Alex.mp3'
import a_foreign from '../../audio/Condominium/02 - Foreign.mp3'
import a_packtLike from '../../audio/Condominium/03 - Packt like.mp3'
import a_alma from '../../audio/Condominium/04 - Alma.mp3'
import a_explosive from '../../audio/Beside the point/explosive.mp3'
import a_fast from '../../audio/Beside the point/fast.mp3'

//Cover files
import condominium_cover from '../../images/covers/condominium.jpg'
import besidethepoint_cover from '../../images/covers/Besidethepoint.jpg'

//CSS
import "./Player.css";
import "./Covers.css";

function Player() {

    const [selectedTrack, setSelectedTrack] = useState(0);
    const [menuSelected, setMenuSelected] = useState(true);
    const [selectedAlbum, setSelectedAlbum] = useState(0);
    const [selectedViewAlbum, setSelectedViewAlbum] = useState(0);
    const [tracklist, setTracklist] = useState([]);
    const [loopAudios, setLoopAudios] = useState(true);

    const albums = [
        {
            id: 1,
            name: 'Condominium',
            cover: 'album_condominium',
            coverFile: condominium_cover,
            year: 2020,
            tracklist:
            [
                {
                    id:1,
                    name: "Captain Alex",
                    duration: "2:53",
                    file: a_captainAlex
                },
                {
                    id:2,
                    name: "Foregin",
                    duration: "3:19",
                    file: a_foreign
                },
                {
                    id:3,
                    name: "Packt Like",
                    duration: "3:06",
                    file: a_packtLike
                },
                {
                    id:4,
                    name: "Alma",
                    duration: "3:59",
                    file: a_alma
                }
            ]
        },
        {
            id: 2,
            name: 'Beside the point',
            cover: 'album_besidethepoint',
            coverFile: besidethepoint_cover,
            year: 2022,
            tracklist:
            [
                {
                    id:1,
                    name: "Export yourself",
                    duration: "2:50",
                    file: a_explosive
                },
                {
                    id:2,
                    name: "F is for",
                    duration: "0:21",
                    file: a_fast
                }
            ]
        }
    ]

    const selectTrack = (trackid) => {
        setLoopAudios(false);
        setSelectedAlbum(selectedViewAlbum);
        setSelectedTrack(trackid);
    }

    const changeTracklist = (selectedViewAlbum, albums) => {
        setTracklist(albums[selectedViewAlbum-1].tracklist)
        setSelectedViewAlbum(selectedViewAlbum);
    }

    useEffect(() => {
        setMenuSelected(false)
    }, [tracklist])

    useEffect(() => {
        setMenuSelected(true)
    }, [])

    return (
        <div className="flex-container-h-albums">
            {menuSelected ? (
                <AlbumList 
                    albums = {albums}
                    selectedViewAlbum = {selectedViewAlbum}
                    menuSelected = {menuSelected} 
                    setMenuSelected = {setMenuSelected}
                    changeTracklist = {changeTracklist}
                     />
            ) : (
                <Playlist 
                    albums = {albums}
                    selectedViewAlbum = {selectedViewAlbum}
                    selectedAlbum = {selectedAlbum}
                    tracklist = {tracklist}
                    selectedTrack = {selectedTrack}
                    setMenuSelected = {setMenuSelected}
                    selectTrack = {selectTrack}
                     />
            )}
            <Sideplayer 
                albums = {albums}
                selectedViewAlbum = {selectedViewAlbum}
                selectedAlbum = {selectedAlbum}
                tracklist = {tracklist}
                selectedTrack = {selectedTrack}
                loopAudios = {loopAudios}
                setLoopAudios = {setLoopAudios}
                selectTrack = {selectTrack}
                />
        </div>
    );
}

export default Player;
