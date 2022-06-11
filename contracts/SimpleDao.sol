// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract SimpleDao {



    struct changeVersionProposal {
        bytes32 name;   
        uint version;
        uint voteCount; 
    }

   struct upgradeToProposal {
        bytes32 name;   
        address contractAdress;
        uint voteCount; 
        uint yes;
        uint no;
        mapping(address => bool) voters;
        
    }

    mapping(address => bool) voters;
     
    uint256 public  upgradeToProposalsNumber; 
    mapping(uint => upgradeToProposal) public upgradeToProposals;

    function createUpgradeToProposal(bytes32 name,address contractAdress) public {
        upgradeToProposalsNumber++;
        

      
        upgradeToProposal memory prop = upgradeToProposal( name,  contractAdress,0,0,0);
        upgradeToProposals[upgradeToProposalsNumber] = prop;
    }


    function voteUpgradeToProposal(uint proposalId,bool voter) public {
        require(upgradeToProposals[proposalId].voters[msg.sender] != true);
        upgradeToProposals[proposalId].voteCount++;
        upgradeToProposals[proposalId].voters[msg.sender] == true;

    }








}