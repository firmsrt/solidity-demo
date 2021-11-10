// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract ProductFactory {
    Product[] public deployedProducts;
    mapping(address => Seller) private sellerMap;
    
    struct Seller {
        bool isVerify;
        Product[] productList;
    }
    
    function createProduct(string memory _productName, string memory _productDesc, uint _price, uint _quantity) public {
        Product product = new Product(msg.sender, _productName, _productDesc, _price, _quantity);
        deployedProducts.push(product);
        
        sellerMap[msg.sender].productList.push(product);
    }
    
    function getDeployedProducts() public view returns (Product[] memory) {
        return deployedProducts;
    }
    
    function getNumberOfDeployedProduct() public view returns (uint) {
        return deployedProducts.length;
    }
    
    function getProductListBySeller(address _sellerAddr) public view returns (Product[] memory){
        return sellerMap[_sellerAddr].productList;
    }
}

contract Product {
    address public seller;
    string public productName;
    string public productDesc;
    uint public price;
    uint public quantity;
    
    modifier onlySeller() {
        require(msg.sender == seller);
        _;
    }
    
    constructor(address _seller, string memory _productName, string memory _productDesc, uint _price, uint _quantity) {
        seller = _seller;
        productName = _productName;
        productDesc = _productDesc;
        price = _price;
        quantity = _quantity;
    }
    
    function editProduct(string memory _productName, string memory _productDesc, uint _price, uint _quantity) public onlySeller {
        productName = _productName;
        productDesc = _productDesc;
        price = _price;
        quantity = _quantity;
    }

    function getProductDetails() public view returns (address, string memory, string memory, uint, uint){
        return (
            seller,
            productName,
            productDesc,
            price,
            quantity
        );
    }
}

contract Transaction {
    address public admin = 0x583031D1113aD414F02576BD6afaBfb302140225;
    uint public txFee = 3;
    address payable public txFeeAddress = payable(0xdD870fA1b7C4700F2BD7f44238821C26f7392148);
    address payable public seller;
    address payable public customer;
    uint public soldBlock;
    uint public shippedBlock;
    uint public claimableBlock;
    enum State { Pending, Shipping, Success, Cancel, Issue }
    State public status;
    address public productAddress;
    uint public price;
    string public shippingAddress;
    string public trackingNumber;
    string public logistic;
    bool public isExtendShipping;
    
    constructor(address payable _seller, address _productAddress,uint _price, string memory _shippingAddress) payable {
        require(msg.value >= _price);
        seller = _seller;
        customer = payable(msg.sender);
        soldBlock = block.number;
        status = State.Pending;
        productAddress = _productAddress;
        price = _price;
        shippingAddress = _shippingAddress;
    }
    
    modifier onlySellerOrAdmin() {
        require(msg.sender == seller || msg.sender == admin);
        _;
    }
    
    modifier onlyCustomerOrAdmin() {
        require(msg.sender == customer || msg.sender == admin);
        _;
    }
    
    modifier onlySellerOrCustomerOrAdmin() {
        require(msg.sender == seller || msg.sender == customer || msg.sender == admin);
        _;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }
    
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    function shipped(string memory _trackingNumber, string memory _logistic) public onlySellerOrAdmin{
        require(status == State.Pending);
        require(bytes(_trackingNumber).length > 0);
        require(bytes(_logistic).length > 0);
        trackingNumber = _trackingNumber;
        logistic = _logistic;
        status = State.Shipping;
        shippedBlock = block.number;
        claimableBlock = block.number + 80640;
    }
    
    function claim() public onlySellerOrAdmin {
        require(status == State.Shipping && shippedBlock > 0);
        require(claimableBlock > 0 && block.number >= claimableBlock);
        txFeeAddress.transfer((txFee*address(this).balance)/100);
        seller.transfer(address(this).balance);
        status = State.Success;
    }
    
    function delivered() public onlyCustomerOrAdmin {
        require(status == State.Shipping && shippedBlock > 0);
        txFeeAddress.transfer((txFee*address(this).balance)/100);
        seller.transfer(address(this).balance);
        status = State.Success;
    }
    
    function extendShippingPeriod() public onlyCustomerOrAdmin {
        require(!isExtendShipping);
        require(status == State.Shipping && shippedBlock > 0);
        claimableBlock += 80640;
        isExtendShipping = true;
    }
    
    function cancelOrder() public onlySellerOrCustomerOrAdmin {
        require(status == State.Pending);
        customer.transfer(address(this).balance);
        status = State.Cancel;
    }
    
    function reportIssue() public onlyCustomerOrAdmin {
        require(status == State.Pending && shippedBlock > 0);
        require(isExtendShipping);
        status = State.Issue;
    }
    
    function manualTransfer(address payable _recipient) public onlyAdmin {
        require(_recipient == seller || _recipient == customer);
        txFeeAddress.transfer((txFee*address(this).balance)/100);
        _recipient.transfer(address(this).balance);
        if(_recipient == seller) {
            status == State.Success;
        } else {
            status == State.Cancel;
        }
    }
    
}