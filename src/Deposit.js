import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import DepositModal from "./DepositModal";
import HurricaneCash from "./abi/HurricaneCash.json";

const HurricaneContractAddresss = "0x9193e15224AA6d0d33dA4e23b6534056A2b94561";

const Deposit = (showDeposit) => {
  const [amount, setAmount] = useState(0);
  const [phrase, setPhrase] = useState("");
  const [signature, setSignature] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const hurricaneContract = new ethers.Contract(
    HurricaneContractAddresss,
    HurricaneCash.abi,
    signer
  );

  async function formulatePhrase() {
    const time = Date.now().toString();
    const slicedTime = time.slice(-3, -1) + time.slice(-1);
    const userAddress = await signer.getAddress();
    const hashedMessage = await hurricaneContract.getHash(
      ethers.utils.parseEther(amount),
      userAddress
    );

    let _phrase =
      "hurricanecash-" +
      amount +
      "-" +
      slicedTime +
      "-" +
      userAddress.slice(0, 5);

    await signer
      .signMessage(ethers.utils.arrayify(hashedMessage))
      .then((response) => {
        setShowModal(true);
        setSignature(response);
        setPhrase(_phrase + "%" + response);
        console.log(signature);
      });
  }

  useEffect(() => {}, []);

  if (!showDeposit) return;
  return (
    <>
      <div className="row m-3">
        <h6 className="text-start p-0 ">Token</h6>
        <h6 className="col-2 border border-2 border-dark p-1 m-0">ETH</h6>
      </div>
      <div className="row m-3">
        <h6 className="text-start p-0"> Amount</h6>
        <div className="p-1 d-flex">
          <div class="col d-flex flex-column align-items-center justify-content-center">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="0.01"
              onChange={(e) => setAmount(e.target.value)}
            />
            <label class="form-check-label" for="inlineRadio1">
              0.01 ETH
            </label>
          </div>
          <div class="col d-flex flex-column align-items-center justify-content-center">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="0.1"
              onChange={(e) => setAmount(e.target.value)}
            />
            <label class="form-check-label" for="inlineRadio2">
              0.1 ETH
            </label>
          </div>
          <div class="col d-flex flex-column align-items-center justify-content-center">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="1"
              onChange={(e) => setAmount(e.target.value)}
            />
            <label class="form-check-label" for="inlineRadio2">
              1 ETH
            </label>
          </div>
          <div class="col d-flex flex-column align-items-center justify-content-center">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="10"
              onChange={(e) => setAmount(e.target.value)}
            />
            <label class="form-check-label" for="inlineRadio2">
              10 ETH
            </label>
          </div>
        </div>
      </div>

      <div className="row m-3">
        <button
          className="border border-2 border-dark bg-dark text-white p-2"
          onClick={formulatePhrase}
        >
          Deposit
        </button>
      </div>
      <DepositModal
        showModal={showModal}
        setShowModal={setShowModal}
        phrase={phrase}
        signature={signature}
      />
    </>
  );
};

export default Deposit;
