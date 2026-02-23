// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ShareToken {
  mapping(address => uint256) public points;
  event Shared(address user, uint256 pointsAdded);

  function addPoints(address user, uint256 amount) public {
    points[user] += amount;
    emit Shared(user, amount);
  }
}
