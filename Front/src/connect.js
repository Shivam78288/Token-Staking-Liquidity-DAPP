const provider = new ethers.providers.Web3Provider(window.ethereum, "any");


const Mindpay = {
    address: "0x1E774bDF25AC1Ed4c2e2c24BbccCA2E7D58F4Efd",
    abi: abis[0].abi
}

const StakingContract = {
    address: "0x2ab92b230Bb00bfE69146DeC0C31693481507683",
    abi: abis[1].abi
}

const LiquidityContract = {
    address: "0xa239df727Dd98e484c1b63A4A13d2A28053B76bf",
    abi: abis[2].abi
}

const ReserveContract = {
    address: "0xD018Cf3E9cD65BDB8dD27ec0B9922E3d885B9175",
    abi: abis[3].abi
}

async function main() {  
  await provider.send("eth_requestAccounts", []);
  window.signer = provider.getSigner();
  window.admin = await signer.getAddress();
  console.log("admin: " + window.admin);

  /*======
    INITIALIZING CONTRACT
    ======*/
  window.mindpay = new ethers.Contract(Mindpay.address, Mindpay.abi, signer);
  window.stakingContract = new ethers.Contract(StakingContract.address, StakingContract.abi, signer);
  window.liquidityContract = new ethers.Contract(LiquidityContract.address, LiquidityContract.abi, signer);
  window.reserveContract = new ethers.Contract(ReserveContract.address, ReserveContract.abi, signer);
  
  setInterval(async ()=>{
    window.totalSupply = await mindpay.totalSupply();
    window.mindpayBalOfUser = await reserveContract.reserveTokenBalanceOf(window.admin);
    window.stakedMindpayBalOfUser = await reserveContract.stakedTokenBalanceOf(window.admin);

    document.getElementById("totalSupply").textContent = ethers.utils.formatEther(window.totalSupply);
    document.getElementById('mindpayBal').textContent = ethers.utils.formatEther(window.mindpayBalOfUser);
    document.getElementById('stakedMindpayBal').textContent = ethers.utils.formatEther(window.stakedMindpayBalOfUser);

  }, 1000);
  document.getElementById('login').textContent = "Connected";

}