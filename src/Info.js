import React, { useEffect, useState } from "react";
import HurricaneCash from "./abi/HurricaneCash.json";
import { ethers } from "ethers";

const HurricaneContractAddresss = "0x9193e15224AA6d0d33dA4e23b6534056A2b94561";

const Info = () => {
  const [phrases, setPhrases] = useState([]);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const hurricaneContract = new ethers.Contract(
    HurricaneContractAddresss,
    HurricaneCash.abi,
    signer
  );

  async function getPhrases() {
    await hurricaneContract.getPhrasesDetails().then((response) => {
      setPhrases(response);
      console.log(response);
    });
  }

  useEffect(() => {
    getPhrases();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center border border-bottom-0 border-2 border-dark">
        <h4 className="p-2 m-0">Statistics</h4>
      </div>
      <div className="row justify-content-center border border-2 border-dark">
        <div>
          <h5 className="text-start p-2 mb-3">Latest Deposits</h5>
        </div>
        <div className="row justify-content-start align-items-center">
          <div className="col-6">
            {phrases.map((phrase, index) => (
              <h6 key={index} className="text-start bg-dark bg-opacity-25 p-2">
                {"tx" + (index + 1)}{" "}
                {(
                  (Date.now().toString() / 1000 - phrase.timeStamp.toString()) /
                  3600
                ).toFixed(1)}{" "}
                hours ago
              </h6>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
