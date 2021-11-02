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
}