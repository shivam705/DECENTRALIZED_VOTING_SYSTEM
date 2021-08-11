web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var account;
web3.eth.getAccounts().then((f) => {
account = f[0];
})
abi =
JSON.parse('[{"inputs":[{"internalType":"bytes32[]","name":"candidateNames","type":"bytes32[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidateList","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]')
contract = new web3.eth.Contract(abi);
contract.options.address = "0x9FD32BB51E81D2CDfc7d79533Bd95E69af484fA7";
// update this contract address with your contract address
candidates = {"Tom": "candidate-1", "Jerry": "candidate-2", "Donald": "candidate-3"}
function voteForCandidate(candidate) {
candidateName = $("#candidate").val();
console.log(candidateName);
contract.methods.voteForCandidate(web3.utils.asciiToHex(candidateName)).send({from:
account}).then((f) => {
let div_id = candidates[candidateName];
contract.methods.totalVotesFor(web3.utils.asciiToHex(candidateName)).call().then((f) => {
$("#" + div_id).html(f);
})
})
}
$(document).ready(function() {
candidateNames = Object.keys(candidates);
for(var i=0; i<candidateNames.length; i++) {
let name = candidateNames[i];
contract.methods.totalVotesFor(web3.utils.asciiToHex(name)).call().then((f) => {
$("#" + candidates[name]).html(f);
})
}
});