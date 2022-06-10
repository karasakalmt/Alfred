import { GiCrossedChains } from 'react-icons/gi'
import { Link } from 'react-router-dom';
import logo from '../logo_with_name.png';
import { useWeb3 } from '../utils/web3ModalContext';
import { useState, useEffect } from 'react';

const Header = () => {
    const web3 = useWeb3();
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (connected) {
            const accessToken = localStorage.getItem('access_token');
            const accessTokenExpiry = Number(localStorage.getItem('access_token_expires_at'));
            const now = Date.now();
            if (!accessToken || accessToken.length === 0 || now > accessTokenExpiry) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('access_token_expires_at');
            } else {
            console.log('token exists and not expired')
            }
        }
        }, [connected]);

    useEffect(() => {
    if (web3.account) {
        setConnected(true);
    } else {
        setConnected(false);
    }
    }, [web3.account]);

    const connectToWallet = async () => {
        if (connected) {
            await web3.clearCachedProvider();
            setConnected(false);
        } else {
            try {
            await web3.connect();
            setConnected(true);
            } catch (err) {
            console.log(err);
            setConnected(false);
            }
        }
    }

    return(
        <nav>
            <div className="nav-left">
                <Link to="/"><img src={logo} style={{maxWidth: '120px'}} alt="logo"/></Link>
            </div>
            <div className="nav-right">
                <ul>
                    <li><Link to="/proposals">Proposals</Link></li>
                    <li><Link to="/create-a-proposal">Create a Proposal</Link></li>
                </ul>
                <button className="connect-wallet-button" onClick={connectToWallet}> <GiCrossedChains/> 
                    {connected ? (
                            "Connected: " +
                            String(web3.account).substring(0, 6) +
                            "..." +
                            String(web3.account).substring(38)
                        ) : (
                            <span>Connect Wallet</span>
                    )} 
                </button>
            </div>
        </nav>
    )
}

export default Header;