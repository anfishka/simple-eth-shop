// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Shop {
    address public owner;
    mapping(uint => address) public buyers;

    event ProductPurchased(uint productId, address buyer, uint amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function buyProduct(uint productId) public payable {
        require(msg.value > 0, "Payment must be greater than 0");
        require(buyers[productId] == address(0), "Product already purchased");

        buyers[productId] = msg.sender;
        emit ProductPurchased(productId, msg.sender, msg.value);
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
