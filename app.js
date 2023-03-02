window.addEventListener("load", async () => {
  if (!isMetamaskInstalled()) {
    return;
  }
  // set provider
  window.web3 = new Web3(ethereum);
});

$("#connect-to-metamask").click(async function () {
  console.log("connect to meta mask");
  //Will Start the metamask extension
  ethereum.request({
    method: "eth_requestAccounts",
  });

  console.log(window.ethereum.networkVersion);
  switch (+window.ethereum.networkVersion) {
    case 1:
      document.querySelector("#network").innerHTML = "Mainnet";
      break;
    case 3:
      document.querySelector("#network").innerHTML = "Ropsten";
      break;
    case 4:
      document.querySelector("#network").innerHTML = "Rinkeby";
      break;
    case 5:
      document.querySelector("#network").innerHTML = "Goerli";
      break;
    case 97:
      document.querySelector("#network").innerHTML = "BSC - TEST";
      break;
  }
  const account = await getAccount();
  $("#address").text(account);
});

$(".sendEthButton").click(function () {
  // let data = {
  //   from: ethereum.selectedAddress,
  //   to: "0xedB00fFfC297B0cBB9d4E35D96204cF1b68fdA80",
  //   value: Web3.utils.toHex(Web3.utils.toWei($("#value").val(), "ether")),
  //   gas: "0x5208",
  // };
  // ethereum
  //   .request({
  //     method: "eth_sendTransaction",
  //     params: [data],
  //   })
  //   .then(console.log)
  //   .catch(console.log);
  sendCoin();
});

$(".sendUSDTButton btn").click(async function () {
  $.getJSON("./contracts/BUSDTest.json", function (data) {
    sendBUSD(data);
  });
});

function isMetamaskInstalled() {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    return true;
  } else {
    window.alert("You need install metamask to use this function");
    return false;
  }
}

async function getAccount() {
  accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
}

function sendCoin() {
  var currentUser = ethereum.selectedAddress;
  console.log(currentUser);
  var amount = Web3.utils.toWei($("#value").val(), "ether");
  web3.eth
    .sendTransaction({
      from: currentUser,
      to: "0xedB00fFfC297B0cBB9d4E35D96204cF1b68fdA80",
      value: amount,
    })
    .then(console.log)
    .catch(console.log);
}

async function sendBUSD(contractABI) {
  if (+window.ethereum.networkVersion !== 56) {
    alert("You must change network to BSC-TEST");
    return;
  }
  var contractAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
  var receiver = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
  var currentUser = ethereum.selectedAddress;
  console.log(currentUser);
  var amount = Web3.utils.toHex(Web3.utils.toWei($("#value").val(), "ether"));

  var contractInstance = new web3.eth.Contract(contractABI, contractAddress);

  contractInstance.methods
    .transfer(receiver, amount)
    .send({
      from: currentUser,
    })
    .then(console.log);
}
