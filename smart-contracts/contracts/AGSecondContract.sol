// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AGSecondContract {
    string public hello = "Hello from AG! Fucking second contract!";

    function AGRegards() public view returns (string memory) {
        return hello;
    }
}
