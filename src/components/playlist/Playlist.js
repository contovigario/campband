import React from "react";
import "../fontawesome/css/all.css";

function Playlist(props) {

    const setMenuSelected = (() => {
        console.log('Playlist - setMenuSelected - triggered by clicking menu ')
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
                <div id="download_or_donate">
                    My music is free anywhere. <br></br>
                    Download this album below and help support this project
                    by donating crypto. 
                    <span className="smaller_text">
                        (<span className="smaller_bold">View Wallets</span> or <span className="smaller_bold">MetaMask</span>)
                    </span>
                </div>
                <div id="my_buttons">
                    <div id="download_button" className="float_buttons" onClick={() => props.downloadAlbum()}>
                        <div id="download_icon"></div>
                        <div className="my_buttons_text">DOWNLOAD</div>
                    </div>
                    <div id="bitcoin_button" className="float_buttons" onClick={props.showManualWallet}>
                        <div id="wallet_icon"></div>
                        <div className="my_buttons_text">VIEW WALLETS</div>
                    </div>
                    <div id="metamask_button" className="float_buttons" onClick={props.showWallet}>
                        <div id="metamask_icon"></div>
                        <div className="my_buttons_text">CONNECT</div>
                    </div>
                </div>
                <div>
                    <div id="wallet_container" className={props.walletVisible ? 'wallet_visible' : ''}>
                    {props.crypto_wallets.map((wlt) => (
                        <div className="div_ow" key={wlt.id}>
                            <div className="crypto_name">{wlt.network}</div>
                            <code className="other_wallets">{wlt.address}</code>
                        </div>
                    ))}
                    </div>
                    <div id="meta_error" className={props.metaError ? 'error_visible' : ''}>
                        You don't have MetaMask installed. <br></br>
                    </div>                          
                </div>
            </div>
        </div>
    )

}

export default Playlist;