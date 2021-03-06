import { GiCrossedChains } from 'react-icons/gi'
import { Link } from 'react-router-dom';
import logo from '../logo_with_name.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
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
                <ConnectButton label={<div><GiCrossedChains/> Connect Wallet</div>} showBalance={false}/>
            </div>
        </nav>
    )
}

export default Header;