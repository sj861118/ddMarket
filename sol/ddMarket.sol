pragma solidity ^0.4.18;

contract ddContract{
    address owner;
    address author;
        
    string title;
    string format;
    uint limit;
    uint price;
    bool commercial;
    bool resale;
    string contents;
    uint contractors;
    
    struct detail{
        address contractor;
        string filehash;
        bool checked;
        bool signed;
        uint deposit;
        uint retry;
        string [] comment;
    }
    
    mapping(uint=>address) indexMap;
    mapping(address=>detail) detailMap;

    event submitEvent(address _contractor, string _filehash, uint _deposit, uint _balance);
    event signedEvent(address _contractor, string _filehash, uint _deposit, uint retry, uint _balance);
    event rejectedEvent(address _contractor, string _filehash, uint _deposit, uint retry, string _comment, uint _balance);
    
    function ddContract(address _author, string _title, string _format, uint _limit, uint _price, bool _commercial, bool _resale, string _contents) public{
        owner = msg.sender;
        author = _author;
        title = _title;
        format = _format;
        limit = _limit;
        price = _price;
        commercial = _commercial;
        resale = _resale;
        contents = _contents;
    }
    
    function submit(string _filehash) public payable{
        if(msg.value < price * 10 / 100){
            revert();
        }
        
        if(detailMap[msg.sender].contractor != msg.sender){
            indexMap[contractors++] = msg.sender;
            detailMap[msg.sender].contractor = msg.sender;
            detailMap[msg.sender].deposit = price * 60 / 100;
        }
        
        detail memory d = detailMap[msg.sender];
        d.contractor = msg.sender;
        d.filehash = _filehash;
        d.checked = false;
        d.deposit += msg.value;
        detailMap[msg.sender] = d;
        
        submitEvent(detailMap[msg.sender].contractor, detailMap[msg.sender].filehash, detailMap[msg.sender].deposit, this.balance);
    }
    
    function sign(uint _index, bool _signed, string _comment) public payable{
        if(author != msg.sender){
            revert();
        }

        detailMap[indexMap[_index]].checked = true;
        detailMap[indexMap[_index]].signed = _signed;
        
        if(_signed){
            detailMap[indexMap[_index]].deposit += (price-(price*60/100));
            detailMap[indexMap[_index]].contractor.transfer(detailMap[indexMap[_index]].deposit);
            signedEvent(detailMap[indexMap[_index]].contractor, detailMap[indexMap[_index]].filehash, detailMap[indexMap[_index]].deposit, detailMap[indexMap[_index]].retry,this.balance);
        } else{
            detailMap[indexMap[_index]].retry++;
            detailMap[indexMap[_index]].comment.push(_comment);
            rejectedEvent(detailMap[indexMap[_index]].contractor, detailMap[indexMap[_index]].filehash, detailMap[indexMap[_index]].deposit, detailMap[indexMap[_index]].retry, _comment,this.balance);
        }
    }
    
    function () public payable{
        if(msg.sender != owner){
            revert();
        }
    }
}

contract ddMarket{
    address owner;
    
    uint ddCount;
    mapping(uint => ddContract) public contractMap;
    
    function ddMarket() public{
        owner = msg.sender;
    }
    
    event createEvent(address _contractAddr, uint _index, string _title, string _format, uint _limit, uint _price, bool _commercial, bool _resale, string _contents);
    
    function create(string _title, string _format, uint _limit, uint _price, bool _commercial, bool _resale, string _contents) public payable{
        ddContract c = new ddContract(msg.sender, _title, _format, _limit, _price, _commercial, _resale, _contents);
        c.transfer(msg.value); 
        contractMap[ddCount++] = c;
        createEvent(c, ddCount, _title, _format, _limit, _price, _commercial, _resale, _contents);
    }
}
