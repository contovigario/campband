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
    const [metaMaskButton, setMetaMaskButton] = useState(0);
    const [metaMenuOpened, setMetaMenuOpened] = useState(false);
    const [networkOpened, setNetworkOpened] = useState(false);
    const [networkMenuSelected, setNetworkMenuSelected] = useState(0);
    const [networkChangeState, setNetworkChangeState] = useState(0)
    const [ammount, setAmmount] = useState(0.00000)
    const [sendEnabled, setSendEnabled] = useState(0)

    const networkMenu = [
        {
            id: 0,
            name: 'CHOOSE COIN',
            acro: '',
            chainId: '',
            address: ''
        },
        {
            id: 1,
            name: 'ETHEREUM',
            acro: 'ETH',
            chainId: '0x1',
            address: '0xC2fd774A73e8EAB5B55F5f50207cDF535e088419'
        },
        {
            id: 2,
            name: 'BINANCE COIN',
            acro: 'BNB',
            chainId: '0x38',
            address: '0xC2fd774A73e8EAB5B55F5f50207cDF535e088419'
        },
        {
            id: 3,
            name: 'DOGECOIN',
            acro: 'DOGE',
            chainId: '',
            address: '0xC2fd774A73e8EAB5B55F5f50207cDF535e088419'
        }
    ]    

    const metaMaskButtonStates = [
        {
            code: 0,
            text: `CONNECT`
        },
        {
            code: 1,
            text: `CONNECTING...`
        },
        {
            code: 2,
            text: `METAMASK`
        },
    ]

    const sendDonationStates = [
        {
            code: 0,
            text: `SEND DONATION`
        },
        {
            code: 1,
            text: `SEND DONATION`
        },
        {
            code: 2,
            text: `SENDING...`
        },
        {
            code: 3,
            text: `THANK YOU!`
        },
    ]

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

    const changeAmmount = e => {
        setAmmount(e.target.value)
        if(e.target.value>0) {
            setSendEnabled(1)
        }
        else {
            setSendEnabled(0)
        }
    }

    const showManualWallet = () => {
        setNetworkOpened(false)
        if(!walletVisible) {
            setWalletVisible(true);
            setMetaError(false);
            setMetaMenuOpened(false)
        }
        else {
            setWalletVisible(false);
        }
    }

    const changeNetworkOpened = () => {
        if(networkOpened) {
            setNetworkOpened(false)
            console.log('close')
        }
        else {
            setNetworkOpened(true)
            console.log('open')
        }
    }

    const sendDonation = async () => {
        if(sendEnabled===1) {
            setSendEnabled(2)
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            console.log("---------- TRANSACTION ----------")
            console.log(networkMenu[networkMenuSelected].chainId)
            console.log(networkMenu[networkMenuSelected].address)
            console.log(ammount)
            console.log("---------- ----------- ----------")
            try {
                const tx = await signer.sendTransaction({
                    chainId:    networkMenu[networkMenuSelected].chainId,
                    to:         networkMenu[networkMenuSelected].address,
                    value:      ethers.utils.parseEther(ammount)
                })
                console.log(tx)
                setSendEnabled(3)
            }
            catch(error) {
                setSendEnabled(1)
            }
        }
    }

    const showWallet = async () => {
        try { 
            setWalletVisible(false);
            console.log('showWallet')
            console.log('metaMenuOpened: ' + metaMenuOpened)
            if(metaMenuOpened) {
                setMetaMenuOpened(false)
                setNetworkOpened(false)
            }
            else {
                setMetaMenuOpened(true)
            }
            console.log('metaMenuOpened changed to: ' + metaMenuOpened)
            if(metaMaskButton !== 2) {
                if(!window.ethereum) {
                    setMetaMaskButton(0)
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
                    setMetaMaskButton(1)
                    await window.ethereum.send('eth_requestAccounts')
                    setMetaMaskButton(2)
                    const provider = new ethers.providers.Web3Provider(window.ethereum)
                    if(networkChangeState === 0) {
                        const currentNetwork = await provider.getNetwork()
                        if(currentNetwork.name !== undefined) {
                            switch(currentNetwork.name) {
                                case 'eth':
                                    setNetworkMenuSelected(1); 
                                    setNetworkChangeState(2);
                                    break;
                                case 'bnb':
                                    setNetworkMenuSelected(2); 
                                    setNetworkChangeState(2);
                                    break;
                                default:
                            }
                            
                            
                        }
                    }
                }
            }
        } catch(err) {
            if(err.code === 4001)
                setMetaMaskButton(0)
        }
    }

    const selectTrack = (trackid) => {
        setLoopAudios(false);
        setSelectedAlbum(selectedViewAlbum);
        setSelectedTrack(trackid);
    }

    const downloadAlbum = () => {
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

    const changeNetworkMenu = async (id) => {
        try {
            setNetworkOpened(false)
            if(networkChangeState===0 || (networkChangeState===2 && networkMenuSelected!==id)) {
                setNetworkChangeState(1)
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId:  networkMenu[id].chainId }]
                });
                setNetworkMenuSelected(id)
                setNetworkChangeState(2)
            }
        }
        catch(error) {
            setNetworkChangeState(0)
        }
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
                    changeTracklist = {changeTracklist}
                    setMenuSelected = {setMenuSelected}
                    menuSelected = {menuSelected} 
                    selectedViewAlbum = {selectedViewAlbum} />
            ) : (
                <Playlist 
                    sendDonationStates = {sendDonationStates}
                    sendDonation = {sendDonation}
                    sendEnabled = {sendEnabled}
                    ammount = {ammount}
                    changeAmmount = {changeAmmount}
                    networkChangeState = {networkChangeState}
                    networkMenu = {networkMenu}
                    networkOpened = {networkOpened}
                    networkMenuSelected = {networkMenuSelected}
                    changeNetworkOpened = {changeNetworkOpened}
                    changeNetworkMenu = {changeNetworkMenu}
                    metaMaskButtonStates = {metaMaskButtonStates}
                    metaMaskButton = {metaMaskButton}
                    crypto_wallets = {crypto_wallets}
                    metaError = {metaError}
                    metaMenuOpened = {metaMenuOpened}
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
