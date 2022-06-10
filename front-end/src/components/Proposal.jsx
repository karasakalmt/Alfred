import { CopyBlock, solarizedDark } from "react-code-blocks";

const proposal = {
  title: 'The Proposal', 
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit mauris nibh, sed faucibus dolor laoreet pellentesque. Fusce orci arcu, semper vitae rutrum nec, dignissim et nunc. In nec massa non dui mattis euismod sit amet eget nulla. Nunc at hendrerit erat, dignissim scelerisque felis. Mauris sit amet sem leo. Vestibulum tincidunt pellentesque sagittis. Etiam cursus non est ut sollicitudin. Vestibulum auctor, nulla auctor pharetra luctus, ipsum nunc mollis massa, non tincidunt lorem urna ut lectus. Vestibulum dapibus purus vitae semper maximus. Cras in libero at lacus porttitor tempus vitae ac metus.',
  label: 1,
  code: `pragma solidity >=0.5.0 <0.7.0;
          contract HelloWorld {
              function get()public pure returns (string memory){
                  return 'Hello Contracts';
              }
          }`, 
  address: '0xE23AeB5c04b83D7b908fcb64E99327835940Db53', 
  bounty: 0, 
  vote: {
    yes: 0,
    no: 0
  }, 
  discussion: [
    {
      address:'0xE23AeB5c04b83D7b908fcb64E99327835940Db53',
      comment:'It looks awesome.'
    },
    {
      address:'0xE23AeB5c04b83D7b908fcb64E99327835940Db54',
      comment:'This is very bad.'
    }
  ]
}

const Proposal = () => {
  return (
    <div className="container">
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
        <p className="proposal-list-content" style={{margin: '10px 0px'}}>{proposal.content }</p>
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
    </div>
  )
}

export default Proposal;