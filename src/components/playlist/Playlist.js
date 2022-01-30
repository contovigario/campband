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
                    You can download this album below and support this project
                    by donating bitcoin or any other crypto through MetaMask.
                </div>
                <div id="my_buttons">
                    <div id="download_button" className="float_buttons" 
                        onClick={() => props.saveFile()}></div>
                    <div id="bitcoin_button" className="float_buttons" onClick={props.showManualWallet}></div>
                    <div id="metamask_button" className="float_buttons" onClick={props.showWallet}></div>
                </div>
                <div>
                    <div id="wallet_container" className={props.walletVisible ? 'wallet_visible' : ''}>
                        <div className="div_ow">
                            <div className="crypto_name">BTC</div>
                            <code id="wallet">0xee226379db83cffc681495730c11fdde79ba4c0c</code>
                        </div>
                    </div>
                    <div id="meta_error" className={props.metaError ? 'error_visible' : ''}>
                        You don't have MetaMask installed. <br></br>
                        But here are my addresses:<br></br><br></br>
                        <div className="div_ow">
                            <div className="crypto_name">BNB</div>
                            <code className="other_wallets">0xC2fd774A73e8EAB5B55F5f50207cDF535e088419</code>
                        </div>
                        <div className="div_ow">
                            <div className="crypto_name">ETH</div>
                            <code className="other_wallets">0xC2fd774A73e8EAB5B55F5f50207cDF535e088419</code>
                        </div>
                        <div className="div_ow">
                            <div className="crypto_name">ADA</div>
                            <code className="other_wallets">0xC2fd774A73e8EAB5B55F5f50207cDF535e088419</code>
                        </div>
                        <div className="div_ow">
                            <div className="crypto_name">DOGE</div>
                            <code className="other_wallets">0xC2fd774A73e8EAB5B55F5f50207cDF535e088419</code>
                        </div>
                    </div>                                    
                </div>
            </div>
        </div>
    )

}

export default Playlist;