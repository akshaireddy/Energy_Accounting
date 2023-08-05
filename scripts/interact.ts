// scripts/interact.js
import { ethers } from "hardhat";

const { upgrades } = require('hardhat');
require('dotenv').config();

async function main() {
  const [deployer] = await ethers.getSigners();

  // Load the contract address from the .env file
  const contractAddress = process.env.CONTRACT_ADDRESS;

  console.log('Interacting with the contract at:', contractAddress);

  const EnergyAccounting = await ethers.getContractFactory('EnergyAccounting');
  const energyAccounting = await upgrades.upgradeProxy(contractAddress, EnergyAccounting);

  // Perform interactions with the smart contract here
  const producerAddress = deployer.address; // Replace with the producer's Ethereum address
  const energyAmount = ethers.utils.parseUnits('100', 'ether'); // Amount of energy produced (in wei)
  await energyAccounting.submitEnergyProduction(energyAmount);

  const totalEnergyProduced = await energyAccounting.getTotalEnergyProduced(producerAddress);
  console.log(`Total energy produced by ${producerAddress}: ${totalEnergyProduced.toString()}`);
  console.log("Check your transaction on BBN Testnet:", `http://testnet.bharatblockchain.io/address/${contractAddress}`);


  console.log('Interaction completed!');
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
