// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./Pizza.sol";

contract SimpleDao {

    Pizza pizza;

    struct changeVersionProposal {
        bytes32 name;   
        uint  version;
        uint yes;
        uint no;
        address[] voters;
        bool  status;
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

     uint256 public  changeVersionNumber; 
     mapping(uint => changeVersionProposal) public changeVersions;

    constructor(address _pizza )  {    
        pizza = Pizza(_pizza);    
    } 

    
     // UpgradeToProposal Part
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
           // pizza.changeVersion(version);
        }
     }
   
    // ChangeVersion Part

    function createChangeVersionProposal(bytes32 name,uint256 version) public {
        changeVersionNumber++;
        address[] memory tempVoters;
        changeVersionProposal memory vers = changeVersionProposal( name,  version,0,0,tempVoters,false);
        changeVersions[changeVersionNumber] = vers;
    }

     function voteChangeVersionProposal(uint proposalId,bool vote) public {

        require( changeVersions[proposalId].status == false);
        bool voted = false;

          for (uint i=0; i<changeVersions[proposalId].voters.length; i++) {
              if (changeVersions[proposalId].voters[i] == msg.sender) {
                   voted = true;
            } 
        }
        require(voted == false);
        changeVersions[proposalId].voters.push(msg.sender);

        if(vote==true){
            changeVersions[proposalId].yes++;

        }else{
            changeVersions[proposalId].no++;

        }
    }

      function FinishChangeVersionProposal(uint proposalId) public {
      require( changeVersions[proposalId].status == false);
      require( changeVersions[proposalId].voters.length > 0);
      changeVersions[proposalId].status = true;
       if(changeVersions[proposalId].yes > changeVersions[proposalId].no){
          
            pizza.changeVersion(changeVersions[proposalId].version);
        }
     }

   
    }

