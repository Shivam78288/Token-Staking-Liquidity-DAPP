const delay = ms => new Promise(res => setTimeout(res, ms));


function showAmtTokens(){
    const ethVal = document.getElementById('ethVal').value;
    let tokenAmt;
    if(ethVal <= 1){
      tokenAmt = ethVal*1000;
    }
    else if(ethVal > 1 && ethVal <= 5){
      tokenAmt = ethVal * 1100;
    }
    else{
      tokenAmt =  ethVal*1200;
    }
    document.getElementById('tokenAmount').textContent = tokenAmt;
  }

  async function investIntoMindpay(){
    const tokensBefore = parseFloat(document.getElementById('mindpayBal').textContent);
    let amount = document.getElementById('ethValToInvest').value;
    amount = ethers.utils.parseUnits(amount, 18);
    if (amount.isNegative()){
      throw new Error();
    }

    const userEthBal = await provider.getBalance(window.admin);
    
    if(userEthBal.lt(amount)){
      console.log('Insufficient balance of eth');
    }

    const tx = {
      from: window.admin,
      to: ReserveContract.address,
      value: amount.toHexString(),
    };
    const txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx],
    });
    console.log(txHash);
    await delay(60000);

    const tokenAfter = parseFloat(document.getElementById('mindpayBal').textContent);
    const change = (tokenAfter >= tokensBefore) ? tokenAfter-tokensBefore: tokensBefore-tokenAfter
    document.querySelector("tbody").innerHTML += 
    `<tr><th>${change}</th><th>Sent</th><th><a target='_blank' href='https://ropsten.etherscan.io/tx/${txHash}'>${txHash}</a></th></tr>`
  }

  async function cancelInvestment(){
    const tokensBefore = parseFloat(document.getElementById('mindpayBal').textContent);

    const id = document.getElementById('id').value;
    console.log(id);
    const txHash = await window.reserveContract.cancelInvestment(id);
    
    await delay(60000);

    const tokenAfter = parseFloat(document.getElementById('mindpayBal').textContent);
    const change = (tokenAfter >= tokensBefore) ? tokenAfter-tokensBefore: tokensBefore-tokenAfter
    document.querySelector("tbody").innerHTML += 
    `<tr><th>${change}</th><th>Cancelled</th><th><a target='_blank' href='https://ropsten.etherscan.io/tx/${txHash.hash}'>${txHash.hash}</a></th></tr>`
  }

  async function stakeInvestment(){
    const tokensBefore = parseFloat(document.getElementById('stakedMindpayBal').textContent);
    const id = document.getElementById('id').value;
    console.log(id);
    const txHash = await window.reserveContract.stakeInvestment(id);
    await delay(60000);
    const tokenAfter = parseFloat(document.getElementById('stakedMindpayBal').textContent);
    const change = (tokenAfter >= tokensBefore) ? tokenAfter-tokensBefore: tokensBefore-tokenAfter
    document.querySelector("tbody").innerHTML += 
    `<tr><th>${change}</th><th>Staked</th><th><a target='_blank' href='https://ropsten.etherscan.io/tx/${txHash.hash}'>${txHash.hash}</a></th></tr>`
  }
