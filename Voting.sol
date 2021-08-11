pragma solidity ^0.6.4;
// We have to specify what version of compiler this code will compile with
contract Voting {
mapping (bytes32 => uint256) public votesReceived;
bytes32[] public candidateList;

constructor(bytes32[] memory candidateNames) public {
candidateList = candidateNames;
}
// This function returns the total votes a candidate has received so far
function totalVotesFor(bytes32 candidate) public view returns (uint256) {
require (validCandidate(candidate));
return votesReceived[candidate];
}
function voteForCandidate(bytes32 candidate) public {
require(validCandidate(candidate));
votesReceived[candidate] += 1;
}

function validCandidate(bytes32 candidate) public view returns (bool) {
for(uint i = 0; i < candidateList.length; i++) {
if (candidateList[i] == candidate) {
return true;
}
}
return false;
}
}