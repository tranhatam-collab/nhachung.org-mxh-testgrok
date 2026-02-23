const express = require('express');
const router = express.Router();
const ethers = require('ethers');
const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/YOUR_INFURA_KEY'); // Miễn phí key
const contractAddress = '0xYourContractAddress';
const abi = [/* ABI từ contract */];
const contract = new ethers.Contract(contractAddress, abi, provider);

router.post('/share', async (req, res) => {
  const { userAddress, content } = req.body;
  // Lưu off-chain trước, rồi call contract
  await contract.addPoints(userAddress, 10); // Thưởng 10 điểm
  res.send('Shared on-chain!');
});

module.exports = router;
