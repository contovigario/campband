//import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import Sideplayer from '../sideplayer/Sideplayer.js';
import Playlist from '../playlist/Playlist.js';
import AlbumList from '../albumlist/AlbumList.js'
import { saveAs } from 'file-saver';
import { ethers } from 'ethers';
import { isMobile } from 'react-device-detect';
import jszip from  'jszip';

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
    const [selectedViewAlbum, setSelectedViewAlbum] = useState(0);
    const [tracklist, setTracklist] = useState([]);
    const [loopAudios, setLoopAudios] = useState(true)
    const [selectedAlbum, setSelectedAlbum] = useState(0);
    const [walletVisible, setWalletVisible] = useState(false);
    const [metaError, setMetaError] = useState(false);

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
                    file: a_captainAlex,
                    selected:false
                },
                {
                    id:2,
                    name: "Foregin",
                    duration: "3:19",
                    file: a_foreign,
                    selected:false
                },
                {
                    id:3,
                    name: "Packt Like",
                    duration: "3:06",
                    file: a_packtLike,
                    selected:false
                },
                {
                    id:4,
                    name: "Alma",
                    duration: "3:59",
                    file: a_alma,
                    selected:false
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
                    file: a_explosive,
                    selected:false
                },
                {
                    id:2,
                    name: "F is for",
                    duration: "0:21",
                    file: a_fast,
                    selected:false
                }
            ]
        }
    ]

    const crypto_wallets = [
        {
            id: 1,
            network: 'BTC',
            address: '0xee226379db83cffc681495730c11fdde79ba4c0c'
        },
        {
            id: 2,
            network: 'BNB',
            address: '0xee226379db83cffc681495730c11fdde79ba4c0c'
        },
        {
            id: 3,
            network: 'ETH',
            address: '0xee226379db83cffc681495730c11fdde79ba4c0c'
        },
        {
            id: 4,
            network: 'ADA',
            address: '0xee226379db83cffc681495730c11fdde79ba4c0c'
        },
        {
            id: 5,
            network: 'DOGE',
            address: '0xee226379db83cffc681495730c11fdde79ba4c0c'
        }
    ]

    const showManualWallet = () => {
        if(!walletVisible) {
            setWalletVisible(true);
            setMetaError(false);
        }
        else {
            setWalletVisible(false);
        }
    }

    const showWallet = async () => {
        try { 
            if(!window.ethereum) {
                console.log('no eth wallet')
                setWalletVisible(false);
                if(!metaError) {
                    setMetaError(true);
                }
                else {
                    setMetaError(false);
                }
            }
            else {
                setMetaError(false);
                await window.ethereum.send('eth_requestAccounts')
                ethers.utils.getAddress('0xC2fd774A73e8EAB5B55F5f50207cDF535e088419')
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x38' }]
                });
                const tx = await signer.sendTransaction({
                    chainId: '56',
                    to: '0xC2fd774A73e8EAB5B55F5f50207cDF535e088419',
                    value: ethers.utils.parseEther('0.01')
                })
                console.log(tx)
            }
        } catch(err) {
            console.log(err)
        }
    }

    const selectTrack = (trackid) => {
        console.log('select track from ' + selectedTrack + ' to ' + trackid)
        setLoopAudios(false);
        setSelectedAlbum(selectedViewAlbum);
        setSelectedTrack(trackid);
    }

    const downloadAlbum = () => {
        console.log('onclick download');
        if(!isMobile) {
            if(albums[selectedViewAlbum-1]) {

                var zippedFile = new jszip();
                zippedFile.folder(albums[selectedViewAlbum-1].name);

                albums[selectedViewAlbum-1].tracklist.forEach(track => {
                    zippedFile.file(albums[selectedViewAlbum-1].name + '/' + track.name + '.mp3', track.file);
                })
                
                zippedFile.file(albums[selectedViewAlbum-1].name + "/" + "cover.jpg", albums[selectedViewAlbum-1].coverFile);
                zippedFile.generateAsync({type:"blob"}).then(function(content) {
                    saveAs(content, albums[selectedViewAlbum-1].name + ".zip");
                });
            }
        }
        else {
            if(albums[selectedViewAlbum-1]) {
                albums[selectedViewAlbum-1].tracklist.forEach(song => {
                    saveAs(song.file, song.id + ' - ' + song.name + '.mp3');
                });
            }
        }
    }

    const changeTracklist = (selectedViewAlbum, albums) => {
        console.log('Player - changeTracklist - triggered by AlbumList ')
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
                    changeTracklist = {changeTracklist}
                    setMenuSelected = {setMenuSelected}
                    menuSelected = {menuSelected} 
                    selectedViewAlbum = {selectedViewAlbum} />
            ) : (
                <Playlist 
                    crypto_wallets = {crypto_wallets}
                    metaError = {metaError}
                    showManualWallet = {showManualWallet}
                    walletVisible = {walletVisible}
                    showWallet = {showWallet}
                    downloadAlbum={downloadAlbum}
                    albums = {albums}
                    selectedViewAlbum = {selectedViewAlbum}
                    selectedAlbum = {selectedAlbum}
                    setMenuSelected = {setMenuSelected}
                    selectTrack = {selectTrack}
                    selectedTrack = {selectedTrack}
                    tracklist = {tracklist} />
            )}
            <Sideplayer 
                setLoopAudios = {setLoopAudios}
                loopAudios = {loopAudios}
                albums = {albums}
                selectedViewAlbum = {selectedViewAlbum}
                selectedAlbum = {selectedAlbum}
                selectTrack = {selectTrack}
                selectedTrack = {selectedTrack}
                tracklist = {tracklist}
                />
        </div>
    );
}

export default Player;
