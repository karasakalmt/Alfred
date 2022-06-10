import React from 'react'

const CreateProposal = () => {
  return (
    <div className="container" style={{width: '50%'}}>
      <div className="proposal-title-container">
        <h1 className="title">Create a Proposal</h1>
      </div>
      <hr className="title-seperator"/>
      <div className='proposal-list-view'>
        <label for="proposal-title">Title</label>
        <input className="proposal-text-box" type="text" name="proposal-title"/>
        <label for="proposal-title">GitHub URL</label>
        <input className="proposal-text-box" type="text" name="proposal-title"/>
        <label style={{margin: '0px 10px 0px 0px'}}>
          Content
          <textarea></textarea>
        </label>
        <input className="submit-button" style={{backgroundColor:'#859900'}} type="submit" value="Create Proposal" />
      </div>
    </div>
  )
}

export default CreateProposal