import React, { useState } from "react";
import DepositModal from "./DepositModal";

const Deposit = (showDeposit) => {
  const [showModal, setShowModal] = useState(false);
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
              value="option1"
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
              value="option2"
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
              value="option2"
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
              value="option2"
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
          onClick={() => setShowModal(true)}
        >
          Deposit
        </button>
      </div>
      <DepositModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Deposit;
