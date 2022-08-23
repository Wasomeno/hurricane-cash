import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ethers } from "ethers";
import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import HurricaneCash from "./abi/HurricaneCash.json";

const HurricaneContractAddresss = "0x9193e15224AA6d0d33dA4e23b6534056A2b94561";

const DepositModal = ({ showModal, setShowModal, phrase }) => {
  const [phrases, setPhrases] = useState([]);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const hurricaneContract = new ethers.Contract(
    HurricaneContractAddresss,
    HurricaneCash.abi,
    signer
  );

  async function deposit() {
    console.log(phrase);
    if (phrases.length < 1) {
      const splittedPhrase = phrase.split("%");
      const _phrase = splittedPhrase[0];
      const _phraseSplit = _phrase.split("-");
      const hashedPhrase = ethers.utils.formatBytes32String(_phrase);
      const hashedHurricane = await hurricaneContract.getHurricaneHash();
      const leaves = [hashedPhrase, hashedHurricane];
      const toHex = (voter) => "0x" + voter.toString("hex");
      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const root = toHex(tree.getRoot());

      await hurricaneContract.deposit(
        hashedPhrase,
        signer.getAddress(),
        ethers.utils.parseEther(_phraseSplit[1]),
        root,
        { value: ethers.utils.parseEther(_phraseSplit[1]) }
      );
    } else {
      const splittedPhrase = phrase.split("%");
      const _phrase = splittedPhrase[0];
      const _phraseSplit = _phrase.split("-");
      const hashedPhrase = ethers.utils.formatBytes32String(_phrase);
      const toHex = (voter) => "0x" + voter.toString("hex");
      const tree = new MerkleTree(phrases, keccak256, { sortPairs: true });
      const root = toHex(tree.getRoot());

      await hurricaneContract.deposit(
        hashedPhrase,
        signer.getAddress(),
        ethers.utils.parseEther(_phraseSplit[1]),
        root,
        { value: ethers.utils.parseEther(_phraseSplit[1]) }
      );
    }
  }

  function copySignature() {
    navigator.clipboard.writeText(phrase);
  }

  async function getPhrases() {
    await hurricaneContract.getPhrases().then((result) => {
      setPhrases(result);
    });
  }

  useEffect(() => {
    getPhrases();
  }, []);

  if (!showModal) return;
  return ReactDOM.createPortal(
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
        <div className="border border-1 border-dark m-2 rounded my-4 p-3">
          <h6 className="m-0 fw-bold">{phrase}</h6>
        </div>
        <div className="row p-3">
          <button className="btn btn-success" onClick={copySignature}>
            Copy to Clipboard
          </button>
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
          <button className="btn btn-dark fw-bold" onClick={deposit}>
            Send Deposit
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default DepositModal;
