const Mindpay = artifacts.require("Mindpay.sol");
const StakingContract = artifacts.require("StakingContract.sol");
const LiquidityContract = artifacts.require("LiquidityContract.sol");
const ReserveContract = artifacts.require("ReserveContract.sol");


module.exports = async function (deployer, _network) {
    const mindpay = await Mindpay.deployed();
    const stakingContract = await ReserveContract.deployed();
    const liquidityContract = await LiquidityContract.deployed();
    const reserveContract = await ReserveContract.deployed();
    await Promise.all([
        [mindpay, liquidityContract, stakingContract].map(
            (contract) => contract.setReserveContract(reserveContract.address)
        )
    ]);     
}