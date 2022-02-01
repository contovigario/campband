import React from "react";
import AlbumMenu from "../albummenu/AlbumMenu";
import "../fontawesome/css/all.css";

function Playlist(props) {

    const setMenuSelected = (() => {
        props.setMenuSelected(true)
    })

    return (
        <div className="flex-container-v" id="playlist">
            <div className="flex-container-h">
                <div id="goback" 
                    className="backsymbol"
                    onClick = {() => { setMenuSelected() }}>
                    </div>
                <div id="album_title">
                    <div id="album_info">
                        <div id="artist">Noiva</div>
                        <div id="album">{props.albums[props.selectedViewAlbum-1].name}</div>
                        <span id="year">{props.albums[props.selectedViewAlbum-1].year}</span>
                    </div>
                    <div id="album_cover"
                        className={props.albums[props.selectedViewAlbum-1].cover}>
                    </div>
                </div>
            </div>
            <div id="playlist_list">
                <br/>
                <table>
                    <tbody>
                        {props.tracklist.map((track) => (
                            <tr 
                                className={
                                    ((props.selectedAlbum === props.selectedViewAlbum && props.selectedTrack === track.id) ? 
                                    'track_row selected' : 
                                    'track_row')} 
                                key={track.id}
                                onClick={() => props.selectTrack(track.id)}>
                                <td className="table_track_number">
                                    <div className="playicon"></div>
                                    <span className="track_num">{track.id}</span>
                                </td>
                                <td className="table_track_name">{track.name}</td>
                                <td className="table_duration">{track.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <AlbumMenu 
                    albums = {props.albums}
                    selectedViewAlbum = {props.selectedViewAlbum}
                        />
            </div>
        </div>
    )

}

export default Playlist;