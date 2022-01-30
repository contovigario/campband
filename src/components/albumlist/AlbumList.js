import React from "react";
import "../fontawesome/css/all.css";
import "./AlbumList.css";

function AlbumList(props) {

    const setMenuSelected = (() => {
        if(props.menuSelected) {
            props.setMenuSelected(false)
            console.log('setMenuSelected from ' + props.menuSelected + ' to ' + String(false))
        }
        else {
            props.setMenuSelected(true)
            console.log('setMenuSelected from ' + props.menuSelected + ' to ' + String(true))
        }
    })

    const seeAlbum = ((albumid) => {
        console.log('seeAlbum ' + albumid)
        props.changeTracklist(albumid, props.albums)
    })

    return (
        <div className="flex-container-v" id="playlist">
            <div className="flex-container-h">
                <div id="goback" 
                    className={props.selectedViewAlbum!==0 ? 'playsymbol' : 'invisible'}
                    onClick = {() => { setMenuSelected() }}></div>
                <div id="album_title">
                    <div id="album_info">
                        <div id="artist">Noiva</div>
                    </div>
                </div>
            </div>
            <div id="album_list_container">
                <div id="album_list">
                    {props.albums.map((album) => (
                        <div className="albumInList" key={album.id} >
                            <div 
                                className = {'squareAlbum ' + album.cover} 
                                onClick = {() => { seeAlbum(album.id) }}
                            >
                            </div>
                            <div>
                                <span className="a_name">{album.name}</span>
                                <span className="a_year">{album.year}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default AlbumList;