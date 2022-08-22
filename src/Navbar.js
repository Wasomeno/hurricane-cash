import React from "react";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="row justify-content-between align-items-center p-3">
        <div className="col-2 d-flex align-items-center">
          <img src="tornado.png" width={"20px"} alt="hurricane-icon" />
          <h5 className="m-0 mx-3">Hurricane.cash</h5>
        </div>
        <div className="col-3">
          <button className="btn btn-primary">Connect To Wallet</button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
