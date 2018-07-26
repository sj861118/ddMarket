var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

exports.getContract = function(address){
  var contract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
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
		"name": "create",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_contractAddr",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_index",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_title",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_format",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_limit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_commercial",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "_resale",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "_contents",
				"type": "string"
			}
		],
		"name": "createEvent",
		"type": "event"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "contractMap",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getContract",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]).at(address);
return contract;
}
