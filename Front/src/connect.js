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

async function main(global) {  
  await provider.send("eth_requestAccounts", []);
  global.signer = provider.getSigner();
  global.admin = await signer.getAddress();
  console.log("admin: " + global.admin);

  /*======
    INITIALIZING CONTRACT
    ======*/
  global.mindpay = new ethers.Contract(Mindpay.address, Mindpay.abi, signer);
  global.stakingContract = new ethers.Contract(StakingContract.address, StakingContract.abi, signer);
  global.liquidityContract = new ethers.Contract(LiquidityContract.address, LiquidityContract.abi, signer);
  global.reserveContract = new ethers.Contract(ReserveContract.address, ReserveContract.abi, signer);
  
  setInterval(async ()=>{
    global.totalSupply = await mindpay.totalSupply();
    global.mindpayBalOfUser = await reserveContract.reserveTokenBalanceOf(global.admin);
    global.stakedMindpayBalOfUser = await reserveContract.stakedTokenBalanceOf(global.admin);

    document.getElementById("totalSupply").textContent = ethers.utils.formatEther(global.totalSupply);
    document.getElementById('mindpayBal').textContent = ethers.utils.formatEther(global.mindpayBalOfUser);
    document.getElementById('stakedMindpayBal').textContent = ethers.utils.formatEther(global.stakedMindpayBalOfUser);

  }, 1000);

  let myHTML = false;

  if(!myHTML){
    await global.reserveContract.changeLockPeriod(10);
    await global.mindpay.functions.setReserveContract(ReserveContract.address);
    await global.stakingContract.functions.setReserveContract(ReserveContract.address);
    await global.liquidityContract.functions.setReserveContract(ReserveContract.address);
    myHTML = true;
  }
  


}
main(window);
