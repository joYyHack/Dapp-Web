// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AGFirstContract {
    string public hello = "Hello from AG. Fucking first contract.";

    function AGRegards() public view returns (string memory) {
        return hello;
    }
}
