var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

exports.getContract = function(address){
  var contract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			},
			{
				"name": "_signed",
				"type": "bool"
			},
			{
				"name": "_comment",
				"type": "string"
			}
		],
		"name": "sign",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_filehash",
				"type": "string"
			}
		],
		"name": "submit",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_author",
				"type": "address"
			},
			{
				"name": "_title",
				"type": "string"
			},
			{
				"name": "_format",
				"type": "string"
			},
			{
				"name": "_limit",
				"type": "uint256"
			},
			{
				"name": "_price",
				"type": "uint256"
			},
			{
				"name": "_commercial",
				"type": "bool"
			},
			{
				"name": "_resale",
				"type": "bool"
			},
			{
				"name": "_contents",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_contractor",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_filehash",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_deposit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_balance",
				"type": "uint256"
			}
		],
		"name": "submitEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_contractor",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_filehash",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_deposit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "retry",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_balance",
				"type": "uint256"
			}
		],
		"name": "signedEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_contractor",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_filehash",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_deposit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "retry",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_comment",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_balance",
				"type": "uint256"
			}
		],
		"name": "rejectedEvent",
		"type": "event"
	}
]).at(address);
return contract;
}
