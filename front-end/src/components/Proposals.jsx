import { Link } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from "react";
import { ethers } from "ethers";
import abi from '../abis/SimpleDAO.json'
// require('dotenv').config();

const Proposals = () => {
  const [proposals, setProposals] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(()=>{
    const provider = new ethers.providers.JsonRpcProvider("https://ropsten.infura.io/v3/42d2fdb19ea44752b70d96e723a4b829"/*+process.env.INFURA_ID8*/);
    const address = "0xa46ec2049cd1b95617DF848Ef07B61c49c6961CB";

    async function changeVersionNumber() {
      const contract = new ethers.Contract(address, abi, provider);   
      const result = await contract.functions.changeVersionNumber();

      return result[0].toNumber();
    }

    async function changeVersions() {
      const verNum = await changeVersionNumber();
      for(let propID=1; propID <= verNum; propID++){
        if(verNum<proposals.length){
          break;
        }
        const contract = new ethers.Contract(address, abi, provider);   
        const result = await contract.functions.changeVersions(propID);
      
        setProposals(proposals.concat({
            id: propID,
            title: result.name,
            // title: ethers.utils.parseBytes32String(result.name),
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit mauris nibh, sed faucibus dolor laoreet pellentesque. Fusce orci arcu, semper vitae rutrum nec, dignissim et nunc. In nec massa non dui mattis euismod sit amet eget nulla. Nunc at hendrerit erat, dignissim scelerisque felis. Mauris sit amet sem leo. Vestibulum tincidunt pellentesque sagittis. Etiam cursus non est ut sollicitudin. Vestibulum auctor, nulla auctor pharetra luctus, ipsum nunc mollis massa, non tincidunt lorem urna ut lectus. Vestibulum dapibus purus vitae semper maximus. Cras in libero at lacus porttitor tempus vitae ac metus.',
            label: 0
          }));
      }
    }
    changeVersions();
    console.log(proposals);
  })


  return (
    <div className="container">
      <h1 className="title">Proposals</h1>
      <hr className="title-seperator"/>
      {proposals.length > 0 ? proposals.map((proposal) => {
        return(
          <Link to={`/proposals/proposal/${proposal.id}`}>
            <div className="proposal-list-view" key={proposal.id}>
              <div className="proposal-title-container">
                <h2 className="proposal-title">{proposal.title}</h2>
                <p className={proposal.label ? 'proposal-label-update' : 'proposal-label-revert'}>{proposal.label ? 'Update' : 'Revert'}</p>
              </div>
              <p className="proposal-list-content">{proposal.content.length > 300 ? proposal.content.substring(0,300) + '...' : proposal.content }</p>
            </div>
          </Link>
        )
      }): <>{proposals.length}</>}
    </div>
  )
}

export default Proposals;