const Mindpay = artifacts.require("Mindpay.sol");
const StakingContract = artifacts.require("StakingContract.sol");
const LiquidityContract = artifacts.require("LiquidityContract.sol");
const ReserveContract = artifacts.require("ReserveContract.sol");


module.exports = async function (deployer, _network) {
    if(_network === 'ropsten'){
        await deployer.deploy(Mindpay);
        await deployer.deploy(LiquidityContract);
        await deployer.deploy(StakingContract, Mindpay.address);
        await deployer.deploy(
                ReserveContract, 
                StakingContract.address, 
                Mindpay.address, 
                LiquidityContract.address
                );
    }
    
};
