//import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import Sideplayer from '../sideplayer/Sideplayer.js';
import Playlist from '../playlist/Playlist.js';
import AlbumList from '../albumlist/AlbumList.js'

function Player() {

    const [selectedTrack, setSelectedTrack] = useState(0);
    const [menuSelected, setMenuSelected] = useState(true);
    const [selectedAlbum, setSelectedAlbum] = useState(2);
    const [tracklist, setTracklist] = useState([]);

    const selectTrack = (trackid) => {
        console.log('select track from ' + selectedTrack + ' to ' + trackid)
        setSelectedTrack(trackid);
    }

    const albums = [
        {
            id: 1,
            name: 'Condominium',
            cover: 'album_condominium',
            year: 2020,
            tracklist:
            [
                {
                    id:1,
                    name: "Falaise",
                    duration: "2:56",
                    file: 'MR_JAMES.mp3',
                    selected:false
                },
                {
                    id:2,
                    name: "Monjoq2",
                    duration: "4:20",
                    file: 'answers.mp3',
                    selected:false
                },
                {
                    id:3,
                    name: "Unstopabble Force",
                    duration: "2:10",
                    file: 'dontneed.mp3',
                    selected:false
                }
            ]
        },
        {
            id: 2,
            name: 'Beside the point',
            cover: 'album_besidethepoint',
            year: 2022,
            tracklist:
            [
                {
                    id:1,
                    name: "fafa",
                    duration: "2:56",
                    file: 'MR_JAMES.mp3',
                    selected:false
                },
                {
                    id:2,
                    name: "Captain Alex",
                    duration: "4:20",
                    file: 'answers.mp3',
                    selected:false
                }
            ]
        }
    ]

    const changeTracklist = (selectedAlbum, albums) => {
        console.log('changeTracklist')
        setTracklist(albums[selectedAlbum-1].tracklist)
        setSelectedAlbum(selectedAlbum);
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
                    changeTracklist = {changeTracklist}
                    setMenuSelected = {setMenuSelected}
                    menuSelected = {menuSelected} />
            ) : (
                <Playlist 
                    albums = {albums}
                    selectedAlbum = {selectedAlbum}
                    setMenuSelected = {setMenuSelected}
                    selectTrack = {selectTrack}
                    selectedTrack = {selectedTrack}
                    tracklist = {tracklist} />
            )}
            <Sideplayer 
                albums = {albums}
                selectedAlbum = {selectedAlbum}
                selectTrack = {selectTrack}
                selectedTrack = {selectedTrack}
                tracklist = {tracklist}
                />
        </div>
    );
}

export default Player;
