// scripts/deploy.js
const { ethers, upgrades } = require('hardhat');
require('dotenv').config();

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const EnergyAccounting = await ethers.getContractFactory('EnergyAccounting');
  const energyAccounting = await upgrades.deployProxy(EnergyAccounting, [/* constructor arguments if any */]);

  await energyAccounting.deployed();

  console.log('EnergyAccounting deployed to:', energyAccounting.address);

  // Save the contract address to .env
  const fs = require('fs');
  fs.writeFileSync('.env', `CONTRACT_ADDRESS=${energyAccounting.address}\n`, { flag: 'a' });
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
