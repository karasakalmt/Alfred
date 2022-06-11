import React from 'react'
import { useState } from 'react'
import { ethers } from "ethers";
import abi from '../abis/SimpleDAO.json'

const CreateProposal = () => {
  const [title, setTitle] = useState('');
  const [addressCont, setAddress] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const address = "0xfD02940f3fD8138c013ed583f274143fe259795E";

  const handleSubmit = async () => {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, abi, signer);   
    const tx = await contract.functions.createChangeVersionProposal(ethers.utils.formatBytes32String(title), parseInt(addressCont));
    const receipt = await tx.wait();
    console.log("receipt", receipt);
    setTitle('');
    setAddress('');
  }

  return (
    <div className="container" style={{width: '50%'}}>
      <div className="proposal-title-container">
        <h1 className="title">Create a Proposal</h1>
      </div>
      <hr className="title-seperator"/>
      <div className='proposal-list-view'>
        <label for="proposal-title">Title</label>
        <input onChange={(e) => setTitle(e.target.value)} className="proposal-text-box" type="text" name="proposal-title"/>
        <label for="proposal-title">Contract Address/Version ID</label>
        <input onChange={(e) => setAddress(e.target.value)} className="proposal-text-box" type="text" name="proposal-title"/>
        <label for="proposal-title">Proposal Type</label>
        <div onChange={(e) => setType(e.target.value)} className="radio-box">
          <span>
            <input type="radio" value="update" name="status" /> Update
          </span> 
          <span>
            <input type="radio" value="revert" name="status" /> Revert
          </span>
        </div>
        <label style={{margin: '0px 10px 0px 0px'}}>
          Content
          <textarea onChange={(e) => setContent(e.target.value)}></textarea>
        </label>
        <input className="submit-button" style={{backgroundColor:'#859900'}} type="submit" value="Create Proposal" onClick={async () => await handleSubmit()}/>
      </div>
    </div>
  )
}

export default CreateProposal