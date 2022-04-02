// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Transactions {
    uint256 transactionsCount;
    event Transfer(
        address from,
        address to,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct TransactionStruct {
        address sender;
        address reciever;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransactionStruct[] transactions;

    function AddDataToBlockchain(
        address payable receiver,
        uint256 amount,
        string memory message,
        string calldata keyword
    ) public {
        transactions.push(
            TransactionStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );

        transactionsCount += 1;
        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function GetBalance(address _address)
        public
        view
        returns (uint256 balance)
    {
        return address(_address).balance;
    }

    function GetTransactions()
        public
        view
        returns (TransactionStruct[] memory)
    {
        return transactions;
    }

    function TransferEth(
        address payable from,
        address payable to,
        uint256 amount
    ) external payable returns (bool success) {
        (bool success, ) = to.call{value: amount}("");
        return success;
    }

    function GetTransactionsCount() public view returns (uint256) {
        return transactionsCount;
    }
}
