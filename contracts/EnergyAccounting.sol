// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnergyAccounting {
    // Define a struct to represent energy data
    struct EnergyData {
        uint256 energyAmount; // Amount of energy produced (in some unit like kWh)
        uint256 timestamp;
    }

    // Mapping to store energy production data for each producer
    mapping(address => EnergyData[]) public energyProduction;

    // Array to store producer addresses
    address[] public producers;

    // Function for producers to submit energy production data
    function submitEnergyProduction(uint256 _energyAmount) public {
        require(_energyAmount > 0, "Energy amount must be greater than zero");

        energyProduction[msg.sender].push(EnergyData({
            energyAmount: _energyAmount,
            timestamp: block.timestamp
        }));

        // If the producer is not yet recorded, add them to the list of producers
        if (energyProduction[msg.sender].length == 1) {
            producers.push(msg.sender);
        }
    }

    // Function to get total energy produced by a producer
    function getTotalEnergyProduced(address _producer) public view returns (uint256) {
        uint256 totalEnergyProduced = 0;
        EnergyData[] storage producerData = energyProduction[_producer];
        for (uint256 i = 0; i < producerData.length; i++) {
            totalEnergyProduced += producerData[i].energyAmount;
        }
        return totalEnergyProduced;
    }

    // Function to get all producers' addresses
    function getProducers() public view returns (address[] memory) {
        return producers;
    }
}
