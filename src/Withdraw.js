import React, { useState } from "react";
import WithdrawModal from "./WithdrawModal";

const Withdraw = (showWithdraw) => {
  const [phrase, setPhrase] = useState("");
  const [signature, setSignature] = useState("");
  const [showModal, setShowModal] = useState("");

  if (!showWithdraw) return;
  return (
    <>
      <div className="row m-3">
        <h6 className="text-start p-0">Phrase</h6>
        <input
          type={"text"}
          className="form-control"
          value={phrase}
          onChange={(e) => setPhrase(e.value)}
        />
      </div>

      <div className="row m-3">
        <h6 className="text-start p-0">Signature</h6>
        <input
          type={"text"}
          className="form-control"
          value={signature}
          onChange={(e) => setSignature(e.value)}
        />
        <div className="m-2 p-0">
          <div className="d-flex justify-content-between align-items-center">
            <div className="col-4">
              <h6 className="text-start fw-bold">Amount</h6>
            </div>
            <div className="col-4">
              <h6 className="text-end fw-bold">1 ETH</h6>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="col-4">
              <h6 className="text-start fw-bold">Time Passed</h6>
            </div>
            <div className="col-4">
              <h6 className="text-end fw-bold">7 Minutes</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="row m-3">
        <button
          className="border border-2 border-dark bg-dark text-white p-2"
          onClick={() => setShowModal(true)}
        >
          Withdraw
        </button>
      </div>

      <WithdrawModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Withdraw;
