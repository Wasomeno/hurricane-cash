import React from "react";
import ReactDOM from "react-dom";

const WithdrawModal = ({ showModal, setShowModal }) => {
  if (!showModal) return;
  return ReactDOM.createPortal(
    <>
      <div className="container-fluid">
        <div id="modal-screen" className="bg-dark bg-opacity-50" />
        <div id="deposit-modal" className="rounded p-3">
          <div className="m-2">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 style={{ fontWeight: "bold" }} className="col-5">
                Your Private Phrase
              </h4>
              <button
                className="border border-2 border-dark p-2 px-3"
                onClick={() => setShowModal(false)}
              >
                X
              </button>
            </div>
            <h5>
              Please backup your phrase you will need later to withdraw your
              deposit back. Treat your phrase as a private key - never share it
              with everyone
            </h5>
          </div>
          <div className="border border-1 border-dark m-2 rounded my-4">
            <h5 className="p-3">
              hurricane-cash-1410u4-0x410u51nqprhq
              prhjqpr80157hnzpmap45175105810851jnmavp15awij381mph51n515
            </h5>
          </div>
          <div className="m-2">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <h5 class="form-check-label">I backed up the phrase</h5>
            </div>
          </div>

          <div className="row p-3">
            <button className="btn btn-dark fw-bold">Send Deposit</button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default WithdrawModal;
