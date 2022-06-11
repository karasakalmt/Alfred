import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from '../abis/SimpleDAO.json'
import bytes32 from 'bytes32';
// require('dotenv').config();

const Proposals = () => {
  const [proposals, setProposals] = useState([]);
  const [latest, setLatestVersion] = useState(0);
  const [current, setCurrentVersion] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{
    const provider = new ethers.providers.JsonRpcProvider("https://ropsten.infura.io/v3/42d2fdb19ea44752b70d96e723a4b829"/*+process.env.INFURA_ID8*/);
    const address = "0xfD02940f3fD8138c013ed583f274143fe259795E";
    const proxyAddress = "0x0e071445f709583e26697C309151E69a5a13E49F";
    async function changeVersionNumber() {
      const contract = new ethers.Contract(address, abi, provider);   
      const result = await contract.functions.changeVersionNumber();

      return result[0].toNumber();
    }

    async function changeVersions(verNum) {
      let contract = new ethers.Contract(address, abi, provider);   
      let result;
      let proposalsTemp=[];
      for(let propID=1; propID <= verNum; propID++){
        result = await contract.functions.changeVersions(propID);
        proposalsTemp.push({
            id: propID,
            title: bytes32({ input: result.name }),
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit mauris nibh, sed faucibus dolor laoreet pellentesque. Fusce orci arcu, semper vitae rutrum nec, dignissim et nunc. In nec massa non dui mattis euismod sit amet eget nulla. Nunc at hendrerit erat, dignissim scelerisque felis. Mauris sit amet sem leo. Vestibulum tincidunt pellentesque sagittis. Etiam cursus non est ut sollicitudin. Vestibulum auctor, nulla auctor pharetra luctus, ipsum nunc mollis massa, non tincidunt lorem urna ut lectus. Vestibulum dapibus purus vitae semper maximus. Cras in libero at lacus porttitor tempus vitae ac metus.',
            label: result.version.toNumber()>=current
          });
        }
        console.log(proposalsTemp)
        return proposalsTemp;
    }
    changeVersionNumber().then((verNum) => {
      console.log(verNum)
      if(proposals.length<verNum){
        changeVersions(verNum).then((item) => setProposals(proposals.concat(item)));
        console.log('out verlog', verNum)
      }
    })

    async function latestVersion() {
      const proxyAbi = [
        "function latestVersion() view returns (uint256)"
      ];
      const contract = new ethers.Contract(proxyAddress, proxyAbi, provider);   
      const result = await contract.functions.latestVersion();
      setLatestVersion(result[0].toNumber());
    }
    async function currentVersion() {
      const proxyAbi = [
        "function currentVersion() view returns (uint256)"
      ];
      const contract = new ethers.Contract(proxyAddress, proxyAbi, provider);   
      const result = await contract.functions.currentVersion();
      setCurrentVersion(result[0].toNumber());
    }
    if(latest === 0){
      latestVersion();
    }
    if(current === 0){
      currentVersion();
    }
    console.log(proposals);
  })




  return (
    <div className="container">
      <h1 className="title">Proposals</h1>
      <p>Latest Version: {latest} - Current Version: {current}</p>
      <hr className="title-seperator"/>
      {proposals.length > 0 ? proposals.map((proposal) => {
        return(
          <Link to={`/proposals/proposal/${proposal.id}`} key={proposal.id}>
            <div className="proposal-list-view">
              <div className="proposal-title-container">
                <h2 className="proposal-title">#{proposal.id} {proposal.title}</h2>
                <p className={proposal.label ? 'proposal-label-update' : 'proposal-label-revert'}>{proposal.label ? 'Update' : 'Revert'}</p>
              </div>
              <p className="proposal-list-content">{proposal.content.length > 300 ? proposal.content.substring(0,300) + '...' : proposal.content }</p>
            </div>
          </Link>
        )
      }): <>
        <p className="proposal-list-content">There is no proposal to see.</p>
      </>}
    </div>
  )
}

export default Proposals;