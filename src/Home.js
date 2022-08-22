import React, { useState } from "react";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Info from "./Info";

const Home = () => {
  const [showDeposit, setShowDeposit] = useState(true);
  const [showWithdraw, setShowWithdraw] = useState(false);
  return (
    <div className="bg-dark bg-opacity-25 h-75">
      <div className="row justify-content-center">
        <div className="col">
          <div className="d-flex flex-column justify-content-center align-items-center w-75 bg-primary bg-opacity-25">
            <div
              id="option-buttons"
              className="d-flex justify-content-around w-100"
            >
              <button
                className="border border-bottom-0 border-2 border-dark py-2 px-3"
                onClick={() => setShowDeposit(true)}
              >
                Deposit
              </button>
              <button
                className="border border-bottom-0 border-2 border-dark py-2 px-3"
                onClick={() => setShowDeposit(false)}
              >
                Withdraw
              </button>
            </div>
            <div className="border border-2 border-dark w-100 p-2">
              {showDeposit ? (
                <Deposit showDeposit={showDeposit} />
              ) : (
                <Withdraw showWithdraw={showWithdraw} />
              )}
            </div>
          </div>
        </div>
        <div className="col">
          <Info />
        </div>
      </div>
    </div>
  );
};

export default Home;
