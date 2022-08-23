import React from "react";
import { Outlet } from "react-router-dom";

const Navbar = ({ account, setAccount }) => {
  const isConnected = Boolean(account[0]);
  async function connectAccount() {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account);
    }
  }
  return (
    <>
      <div className="row justify-content-between align-items-center p-3">
        <div className="col-2 d-flex align-items-center">
          <img src="tornado.png" width={"20px"} alt="hurricane-icon" />
          <h5 className="m-0 mx-3">Hurricane.cash</h5>
        </div>
        <div className="col-3">
          {isConnected ? (
            <button className="border border-2 border-dark p-3 ">
              {account[0].slice(0, 7)}....{account[0].slice(35, 42)}
            </button>
          ) : (
            <button
              className="btn btn-dark text-white p-3"
              onClick={connectAccount}
            >
              Connect To Wallet
            </button>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
