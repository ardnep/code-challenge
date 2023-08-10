// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract TokenBalanceRetriever {
    struct Balance {
        address token;
        uint256 balance;
    }

    function getBalances(
        address account,
        address[] calldata tokens
    ) public view returns (Balance[] memory) {
        Balance[] memory balances = new Balance[](tokens.length);

        for (uint256 i = 0; i < tokens.length; i++) {
            IERC20 token = IERC20(tokens[i]);
            uint256 balance = token.balanceOf(account);
            balances[i] = Balance(tokens[i], balance);
        }

        return balances;
    }
}
