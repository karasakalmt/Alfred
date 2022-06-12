## Inspiration
Alfred is built-in version control and CI/CD system for your smart contracts. It uses proxy contract and a DAO to upgrade or downgrade your smart contract. 
We try to implement Jenkins and Git as much as possible on solidity.  Our motivation is how we can implement Git technology in smart contracts. 

## What it does
**Version Control System and DAO**

It is a version-changeable proxy contract that DAO decides the current version. DAO can choose to revert and select previous versions or add a new version contract.

## How we built it
We overrode Openzeplin UUPSUpgradeable contracts and add the versioning feature.
Then we created a very simple DAO contract that can update the current contract and select version.
-> You can create a proposal for version change on DAO

-> You can give a vote or finish the voting on DAO. 

-> According to the voting result, the dao will make the necessary changes in the contract addresses.

-> You can discuss upcoming version on comment section.  

-> You can request money from the community for your effort in creating the new version. If your proposal would be successful you will get the collected funds.

## Challenges we ran into
Proxy contracts come with some trade-offs like saving previous contract state and storage. We have developed an approach to avoiding the problems of inherited contract as much as possible.

## Accomplishments that we're proud of
Implementing version feature to proxy contracts.

## What we learned
How proxy concepts work deeply.

## What's next for Alfred

New EIP proposal for proxy contracts.
![UML](https://pbs.twimg.com/media/FVAKm5wVIAAPvUo?format=png&name=large)


