import React, { useState } from "react";
import { isMobile } from 'react-device-detect';
import { saveAs } from 'file-saver';
import { ethers } from 'ethers';
import jszip from  'jszip';
import "../fontawesome/css/all.css";

function AlbumMenu(props) {

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

    const [walletVisible, setWalletVisible] = useState(false);
    const [metaError, setMetaError] = useState(false);
    const [metaMaskButton, setMetaMaskButton] = useState(0);
    const [metaMenuOpened, setMetaMenuOpened] = useState(false);
    const [networkOpened, setNetworkOpened] = useState(false);
    const [networkMenuSelected, setNetworkMenuSelected] = useState(0);
    const [networkChangeState, setNetworkChangeState] = useState(0)
    const [ammount, setAmmount] = useState(0.00000)
    const [sendEnabled, setSendEnabled] = useState(0)

    const downloadAlbum = () => {
        if(!isMobile) {
            if(props.albums[props.selectedViewAlbum-1]) {

                var zippedFile = new jszip();
                zippedFile.folder(props.albums[props.selectedViewAlbum-1].name);

                props.albums[props.selectedViewAlbum-1].tracklist.forEach(track => {
                    zippedFile.file(props.albums[props.selectedViewAlbum-1].name + '/' + track.name + '.mp3', track.file);
                })
                
                zippedFile.file(props.albums[props.selectedViewAlbum-1].name + "/" + "cover.jpg", props.albums[props.selectedViewAlbum-1].coverFile);
                zippedFile.generateAsync({type:"blob"}).then(function(content) {
                    saveAs(content, props.albums[props.selectedViewAlbum-1].name + ".zip");
                });
            }
        }
        else {
            if(props.albums[props.selectedViewAlbum-1]) {
                props.albums[props.selectedViewAlbum-1].tracklist.forEach(song => {
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

    return (
        <div>
            <div id="download_or_donate">
                My music is free anywhere. <br></br>
                Download this album below and help support this project
                by donating crypto. 
                <span className="smaller_text">
                    (<span className="smaller_bold">View Wallets</span> or <span className="smaller_bold">MetaMask</span>)
                </span>
            </div>
            <div id="my_buttons">
                <div id="download_button" className="float_buttons" onClick={() => downloadAlbum()}>
                    <div id="download_icon"></div>
                    <div className="my_buttons_text">DOWNLOAD</div>
                </div>
                <div id="bitcoin_button" className={walletVisible ? "float_buttons button_selected" : "float_buttons"} onClick={showManualWallet}>
                    <div id="wallet_icon"></div>
                    <div className="my_buttons_text">VIEW WALLETS</div>
                </div>
                <div id="metamask_button" 
                    className={(metaMaskButton===1 ? "float_buttons blocked" : ((metaMaskButton===2 && metaMenuOpened) ? "float_buttons button_selected" : "float_buttons"))} 
                    onClick={showWallet}>
                    <div id="metamask_icon"></div>
                    <div className="my_buttons_text">{metaMaskButtonStates[metaMaskButton].text}
                    </div>
                </div>
            </div>

            <div id="extra_buttons">

                {((metaMaskButton && metaMenuOpened) ? (metaMaskButton===2 ?
                <div id="network_container">
                    <div id="my_buttons_network">
                        <div id="network_button" className={networkChangeState === 1 ? "float_buttons blocked" : (networkChangeState === 2 ? "float_buttons button_selected" :"float_buttons")} >
                            <div className="my_buttons_text"
                                onClick={changeNetworkOpened}>
                                {networkMenu[networkMenuSelected].name}
                            </div>
                        </div>
                    </div>
                    <div id="dropdowner" className={(networkOpened ? "visibile" : "")}>
                        {networkMenu.map((network) => (
                            (network.id>0 ?
                                <div className="dropdowners" 
                                    key={network.id} 
                                    onClick={() => {changeNetworkMenu(network.id)}}>
                                        {network.name}
                                </div>
                            : "")
                        ))}
                    </div>
                </div>
                : "" ) : "")}

                <div id="ammount_container" className={(metaMaskButton && metaMenuOpened && networkChangeState === 2) ?  "wallet_visible" : ""}>
                    <span id="ammountCurrency">{networkMenu[networkMenuSelected].acro}</span>
                    <input id="ammount" type="number" value={ammount} onChange={changeAmmount}/>
                </div>

                <div id="send_donation_button" 
                    className={(metaMaskButton && metaMenuOpened && networkChangeState === 2) ?  (sendEnabled === 1 || sendEnabled === 2 ? "wallet_visible float_buttons selected" : "wallet_visible float_buttons blocked") : ""}
                    onClick={sendDonation}>
                    {sendDonationStates[sendEnabled].text}
                </div>
            </div>
            
            <div>
                <div id="wallet_container" className={walletVisible ? 'wallet_visible' : ''}>
                {crypto_wallets.map((wlt) => (
                    <div className="div_ow" key={wlt.id}>
                        <div className="crypto_name">{wlt.network}</div>
                        <code className="other_wallets">{wlt.address}</code>
                    </div>
                ))}
                </div>
                <div id="meta_error" className={metaError ? 'error_visible' : ''}>
                    You don't have MetaMask installed. <br></br>
                </div>                          
            </div>
        </div>
    )

}

export default AlbumMenu;