var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://192.168.0.21:8545"));
var contract = web3.eth.contract([{
    "constant": false,
    "inputs": [{
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
    "constant": true,
    "inputs": [{
      "name": "_index",
      "type": "uint256"
    }],
    "name": "getContract",
    "outputs": [{
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getCount",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{
      "name": "",
      "type": "uint256"
    }],
    "name": "contractMap",
    "outputs": [{
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [{
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
  }
]).at("0xc1993500ba7c1e33b7a2520533082f187e2508c4");

var createEvent = contract.createEvent();
createEvent.watch(function(err, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result.args);
  message('success');

  var ul = document.getElementById("posts");
  var li = document.createElement("li");
  var item = result.args;
  li.appendChild(document.createTextNode(item._title));
  ul.appendChild(li);

});

function showLists(){
  var table = document.getElementById("list");
  var length = contract.getCount();
  for(var i = 0; i < length; i ++){
    var contract
  }
}
//
// function showList(){
//  var table=document.getElementById("table1");
//    var length = vc.getNumOfCandidates();
//    for(var i=0;i<length;i++){
//      var candidate = vc.getCandidateString(i);
//
//      var row=table.insertRow();
//      var cell1=row.insertCell(0);
//      var cell2=row.insertCell(1);
//      cell1.innerHTML = candidate;
//      cell2.innerHTML = vc.getScore(candidate);
//      }
// }

function writePost() {
  var address = document.getElementById('address').value;
  var amount = 3000;

  web3.eth.defaultAccount = address;
  if (web3.personal.unlockAccount(address, document.getElementById('pass').value)) {
    contract.create('aa', 'bb', 10, 100, false, false, 'cc', {
      value: amount,
      gas: 2000000
    }, function(err, result) {
      if (!err) {
        message('결과를 기다리는 중입니다.');
      } else {
        message(err);
      }
    });
  }

  message('wait...');
}


function refreshBalance() {
  var address = document.getElementById('address').value;
  document.getElementById('balance').innerText = web3.fromWei(web3.eth.getBalance(address).toNumber(), "ether") + "ETHER";
}
