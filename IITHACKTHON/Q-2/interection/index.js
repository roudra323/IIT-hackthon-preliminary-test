import contract from "./abi.json";

const ABI = contract.abi;

import { useState, useEffect } from "react";

const [state, setState] = useState({
  provider: null,
  signer: null,
  contract: null,
});

const contractInstance = async () => {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const contractABI = ABI;

  try {
    const { ethereum } = window;

    if (ethereum) {
      await ethereum.request({ method: "eth_requestAccounts" });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      setState({ provider, signer, contract });
      if (contract) setIsConnected(true);
    } else {
      alert("Please install metamask");
    }
  } catch (error) {
    seterrorMessage(error);
  }
};

useEffect(() => {
  contractInstance();
}, []);

//function for sending ether to contract "A"
function sendEthertoContract(address) {
    await state.contract.sendEthertoContract(address);
}

//function for sending ether from this contract to contract "A"
function sendEtherfromContract(address,amount) {
    await state.contract.sendEtherfromContract(address, amount);
}

//function for sending ether from this contract to contract "A"
function sendEtherfromCallertoAnother(address) {
    await state.contract.sendEtherfromCallertoAnother(address);
}
