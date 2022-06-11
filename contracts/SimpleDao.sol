// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./Pizza.sol";

contract SimpleDao {

    Pizza pizza;

    struct changeVersionProposal {
        bytes32 name;   
        uint version;
        uint voteCount; 
    }

   struct upgradeToProposal {
        bytes32 name;   
        address contractAdress;
        uint yes;
        uint no;
        address[] voters;
        bool  status;
    }

    uint256 public  upgradeToProposalsNumber; 
    mapping(uint => upgradeToProposal) public upgradeToProposals;

    constructor(address _pizza )  {    
        pizza = Pizza(_pizza);    
    } 

    
    
    function createUpgradeToProposal(bytes32 name,address contractAdress) public {
        upgradeToProposalsNumber++;

       address[] memory tempVoters;
        upgradeToProposal memory prop = upgradeToProposal( name,  contractAdress,0,0,tempVoters,false);
        upgradeToProposals[upgradeToProposalsNumber] = prop;
    }

    function voteUpgradeToProposal(uint proposalId,bool vote) public {

        require( upgradeToProposals[proposalId].status == false);
        bool voted = false;

          for (uint i=0; i<upgradeToProposals[proposalId].voters.length; i++) {
              if (upgradeToProposals[proposalId].voters[i] == msg.sender) {
                   voted = true;
            } 
        }
        require(voted == false);
        upgradeToProposals[proposalId].voters.push(msg.sender);

        if(vote==true){
            upgradeToProposals[proposalId].yes++;

        }else{
            upgradeToProposals[proposalId].no++;

        }
    }

     function FinishUpgradeToProposal(uint proposalId) public {
      require( upgradeToProposals[proposalId].status == false);
      require( upgradeToProposals[proposalId].voters.length > 0);
      upgradeToProposals[proposalId].status = true;
       if(upgradeToProposals[proposalId].yes > upgradeToProposals[proposalId].no){
           pizza.upgradeTo(upgradeToProposals[proposalId].contractAdress);
        }
     }
   
    }

