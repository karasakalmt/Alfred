import { CopyBlock, solarizedDark } from "react-code-blocks";
import abi from '../abis/SimpleDAO.json'
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import bytes32 from "bytes32";
import { useParams } from "react-router-dom";

const Proposal = () => {
  let {proposalId} = useParams();
  const [proposal, setProposal] = useState(null);
  // const provider = new ethers.providers.JsonRpcProvider("https://ropsten.infura.io/v3/42d2fdb19ea44752b70d96e723a4b829"/*+process.env.INFURA_ID8*/);
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const address = "0xa46ec2049cd1b95617DF848Ef07B61c49c6961CB";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{

    async function changeVersions(ver) {
      const contract = new ethers.Contract(address, abi, provider);   
      const result = await contract.functions.changeVersions(ver);
    
      setProposal({
          id: ver,
          title: bytes32({ input: result.name }),
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit mauris nibh, sed faucibus dolor laoreet pellentesque. Fusce orci arcu, semper vitae rutrum nec, dignissim et nunc. In nec massa non dui mattis euismod sit amet eget nulla. Nunc at hendrerit erat, dignissim scelerisque felis. Mauris sit amet sem leo. Vestibulum tincidunt pellentesque sagittis. Etiam cursus non est ut sollicitudin. Vestibulum auctor, nulla auctor pharetra luctus, ipsum nunc mollis massa, non tincidunt lorem urna ut lectus. Vestibulum dapibus purus vitae semper maximus. Cras in libero at lacus porttitor tempus vitae ac metus.',
          label: 0,
          code: `pragma solidity >=0.5.0 <0.7.0;
                  contract HelloWorld {
                      function get()public pure returns (string memory){
                          return 'Hello Contracts';
                      }
                  }`, 
          address: '0x000000000000000000000000000000000', 
          bounty: 0, 
          vote: {
            yes: result.yes.toNumber(),
            no: result.no.toNumber()
          }, 
          discussion: [
            {
              id:1,
              address:'0x000000000000000000000000000000000',
              comment:'It looks awesome.'
            },
            {
              id:2,
              address:'0x000000000000000000000000000000000',
              comment:'This is very bad.'
            }
          ]
        });
    }
    if(proposal==null){
    changeVersions(proposalId);
  }
    console.log(proposal)
  })

  async function voteChangeVersionProposal(lord) {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, abi, signer);
    const tx = await contract.functions.voteChangeVersionProposal(proposalId,lord);
  
    const receipt = await tx.wait();
    console.log("receipt", receipt);
    if(lord){
      setProposal({vote: {yes: proposal.vote.yes+1, no: proposal.vote.no},...proposal})
    } else{
      setProposal({vote: {yes: proposal.vote.yes, no: proposal.vote.no+1},...proposal})
    }
  }

  async function FinishChangeVersionProposal() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, abi, signer);   
    const tx = await contract.functions.FinishChangeVersionProposal(proposalId);
  
    const receipt = await tx.wait();
    console.log("receipt", receipt);
  }

  return (
    <>
    {proposal != null ? <div className="container">
      <div className="proposal-title-container">
        <h1 className="title">{proposal.title}</h1>
        <p className={proposal.label ? 'proposal-label-update' : 'proposal-label-revert'}>{proposal.label ? 'Update' : 'Revert'}</p>
      </div>
      <hr className="title-seperator"/>
      <div className='proposal-list-view'>
        <h2 className="proposal-title">Address</h2> 
        <p className="proposal-list-content" style={{margin: '10px 0px'}}>
          {proposal.address}
        </p>
      </div>
      <div className="proposal-list-view">
        <h2 className="proposal-title">Content</h2> 
        <p className="proposal-list-content" style={{margin: '10px 0px'}}>{proposal.content}</p>
      </div>
      {proposal.label ? <div className="proposal-list-view">
        <h2 className="proposal-title">Code</h2> 
        <span style={{ fontFamily: "'PT Mono', monospace" }}>
        <CopyBlock
        text={proposal.code}
        language='solidity'
        showLineNumbers={true}
        startingLineNumber={1}
        theme={solarizedDark}
        codeBlock
        />
        </span>
      </div>: ''}
      <div className="proposal-list-view">
        <h2 className="proposal-title">Vote</h2> 
        <div className="vote-container">
            <button className="vote-yes" onClick={()=>voteChangeVersionProposal(true)}>Yes: {proposal.vote.yes}</button>
            <button className="vote-no" onClick={()=>voteChangeVersionProposal(false)}>No: {proposal.vote.no}</button>
        </div>
        <input className="submit-button" type="submit" value="Finish Voting" style={{margin: '10px 0px'}} onClick={()=>FinishChangeVersionProposal()}/>
        <hr className="title-seperator"/>
        <h2 className="proposal-title" style={{margin: '10px 0px'}}>Bounty</h2>
        <p className="proposal-list-content" style={{margin: '10px 0px'}}>Current Bounty: {proposal.bounty}</p>
        <form>
            <label style={{margin: '0px 10px 0px 0px'}}>
                Raise Bounty:
                <input className="raise-text" type="text" name="name" />
                ETH
            </label>
            <input className="raise-button" type="submit" value="Raise" />
        </form>
        <hr className="title-seperator" style={{margin: '10px 0px'}}/>
        <h2 className="proposal-title" style={{margin: '10px 0px'}}>Discussion</h2>
        <form>
            <label style={{margin: '0px 10px 0px 0px'}}>
                <textarea placeholder="Write your comment here..."></textarea>
            </label>
            <input className="submit-button" type="submit" value="Share Comment" />
        </form>
      {proposal.discussion.length>0 ? <>
        {proposal.discussion.map((discussion) => {
            return(<div style={{margin: '10px 0px'}} key={discussion.id}>
            <hr className="title-seperator"/>
            <p className="proposal-list-content" style={{margin: '10px 0px'}}>{discussion.address}</p>
            <p className="proposal-list-content" style={{margin: '10px 0px'}}>{discussion.comment}</p>
            </div>)}
            )
        }
        </>: ''}
      </div>
    </div>:''}
    </>
  )
}

export default Proposal;