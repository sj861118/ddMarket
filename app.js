//index.js
﻿var express = require('express');
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var session    = require("express-session");
var app = express();

var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');
var Personal = require('web3-eth-personal');
var personal = new Personal('http://localhost:8545');
var BigNumber = require('bignumber.js');

var myContract = new web3.eth.Contract([
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
], '0x36b929b72f73808577ad4abed3931d5ed42138e9');

var ddContract = new web3.eth.Contract([
	{
		"constant": false,
		"inputs": [],
		"name": "plusOne",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
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
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
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
		"constant": true,
		"inputs": [],
		"name": "getTest",
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
], '0x0000000000000000000000000000000000000000');

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({secret:"MySecret"}));

app.get("/", function(req, res){
  // web3.eth.getAccounts(function(err, accounts){
  //   console.log(accounts);
  // })


 res.render("home");
});

app.get("/account", function(req,res){
  web3.eth.getAccounts(function(err, accounts){
    if(err){
      consloe.log(err);
    }
    else {
      res.render("accounts", {accounts});
    }
  });
});

app.post("/account",function(req,res){

  if(req.body.password.length < 8){
    req.flash("errors", "password is too short");
    return res.redirect("/account/new");
  }
  if(req.body.password != req.body.confirmation){
    req.flash("errors", "password confirmation error");
    return res.redirect("/account/new");
  }

  web3.eth.personal.newAccount(req.body.password).then(function(account){
    console.log(account);
    res.redirect("/account");
  });
});
app.get("/account/new", function(req, res){

  var errors = req.flash("errors")[0] || {};
  console.log(errors);
  res.render("newAccount", { errors:errors });

});

app.get("/contract",function(req,res){
  myContract.getPastEvents('createEvent', {
    fromBlock: 0,
    toBlock: 'latest'
}, function(error, events){
   res.render("contracts",{contracts:events})
 })
});

app.get("/contract/new", function(req,res){
  res.render("newContract");
});

app.post("/contract/new",function(req,res){
  console.log(req.body);
  var balance = web3.utils.toWei(req.body.balance, 'ether');
  web3.eth.personal.unlockAccount(req.body.address,req.body.password)
  .then(function(res){
    console.log(res);
    if(res){
      myContract.methods.create('aa,','bb',10,100,false,false,'test').send({
        from: '0xfcab109cf8884351f72a185d43e77eaf1ede9287',
        gas: 2000000,
        value: balance})
      .once('transactionHash', function(hash){ console.log(hash); })
      .on('error', function(error){ console.log(error);})
      .then(function(receipt){
        res.redirect('contract/');
      });
    } else{
      res.redirect("contract/new");
    }
  });
});

app.get("/contract/:address",function(req,res){
  ddContract.options.address = req.params.address;
  console.log(ddContract.options.address);

  ddContract.methods.getTest().call().then(function(count){
    console.log(count);
  });

  res.render("detail",{address:req.params.address});
});


app.listen(3000, function(){
 console.log('Server On!');
});
