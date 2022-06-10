import { GiCrossedChains } from 'react-icons/gi'
import { Link } from 'react-router-dom';

const Header = () => {
    return(
        <nav>
            <div className="nav-left">
                <Link to="/"><p>Logo</p></Link>
            </div>
            <div className="nav-right">
                <ul>
                    <li><Link to="/proposals">Proposals</Link></li>
                    <li><Link to="/create-a-proposal">Create a Proposal</Link></li>
                </ul>
                <button className="connect-wallet-button"> <GiCrossedChains/> Connect Wallet </button>
            </div>
        </nav>
    )
}

export default Header;