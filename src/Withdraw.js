import React, { useState } from "react";
import WithdrawModal from "./WithdrawModal";
import { ethers } from "ethers";
import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import HurricaneCash from "./abi/HurricaneCash.json";

const HurricaneContractAddresss = "0x9193e15224AA6d0d33dA4e23b6534056A2b94561";

const Withdraw = (showWithdraw) => {
  const [phrase, setPhrase] = useState("");
  const [recipient, setRecipient] = useState("");
  const [showModal, setShowModal] = useState("");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const hurricaneContract = new ethers.Contract(
    HurricaneContractAddresss,
    HurricaneCash.abi,
    signer
  );

  async function checkPhrase(value) {
    setPhrase(value);
    const _phrase = phrase.split("%");
    const hashedPhrase = ethers.utils.formatBytes32String(_phrase);
  }

  async function withdraw() {
    const phrases = await hurricaneContract.getPhrases();
    const _phrase = phrase.split("%");
    const hashedPhrase = ethers.utils.formatBytes32String(_phrase[0]);
    const signature = _phrase[1];

    const tree = new MerkleTree(phrases, keccak256, { sortPairs: true });
    const toHex = (voter) => "0x" + voter.toString("hex");
    const root = toHex(tree.getRoot());

    const proofs = tree
      .getProof(hashedPhrase)
      .map((proof) => toHex(proof.data));

    await hurricaneContract.claim(recipient, hashedPhrase, signature, proofs);
  }

  if (!showWithdraw) return;
  return (
    <>
      <div className="row m-3">
        <h6 className="text-start p-0">Phrase</h6>
        <input
          type={"text"}
          className="form-control"
          value={phrase}
          onChange={(e) => checkPhrase(e.target.value)}
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
        <h6 className="text-start p-0">Recipient</h6>
        <input
          type={"text"}
          className="form-control"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>

      <div className="row m-3">
        <button
          className="border border-2 border-dark bg-dark text-white p-2"
          onClick={withdraw}
        >
          Withdraw
        </button>
      </div>

      <WithdrawModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Withdraw;
