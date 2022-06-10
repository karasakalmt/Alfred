import logo from '../logo.png';

const Dashboard = () => {
  return (
    <div className='dashboard'>
        <img style={{maxWidth: '50%'}} src={logo} alt={logo}/>
        <span style={{maxWidth: '30%'}}>
            <p className='alfred'>Alfred</p>
            <p className='dashboard-content'>your smart contract servant</p>
        </span>
    </div>
  )
}

export default Dashboard;