// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract B {
    constructor() payable {}

    //function for sending ether to A contract
    function sendEthertoContract(address payable contractAddr)
        external
        payable
    {
        (bool sent, ) = contractAddr.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    //function for sending ether from this contract to contract A
    function sendEtherfromContract(address payable contractAddr, uint256 amount)
        external
        payable
    {
        (bool sent, ) = contractAddr.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    //function for sending ether from caller to another address
    function sendEtherfromCallertoAnother(address payable Addr)
        external
        payable
    {
        (bool sent, ) = Addr.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
}
