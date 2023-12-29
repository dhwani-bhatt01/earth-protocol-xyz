"use client";

// import earthLpStaking from "@/abi/EarthLpStaking.sol/EarthLpStaking.json";
// import { Wallet, ethers } from "ethers";
// import { Toast } from "primereact/toast";
// import { useRef } from "react";
// import { useWalletClient } from "wagmi";
// import Styles from "./admin.module.css";
// // import { Wallet } from "ethers";
// export default function Admin() {
//   const privateKey =
//     "0xfc2f8cc0abd2d9d05229c8942e8a529d1ba9265eb1b4c720c03f7d074615afbb";
//   const parentStrategyValContract =
//     // "0x46ECf770a99d5d81056243deA22ecaB7271a43C7";
//     "0x86E6b3c84eaaDa895017b5ad1A44e9ea63c3cCe5";
//   const vaultContractList = [
//     // "0x3b8225C88a66aF1C00416bCa3fbF938D128B84b9",
//     // "0x672058B73396C78556fdddEc090202f066B98D71",
//     "0xEd16712bEaD2b6eed8cd514F8fB8a0151CCb8689",
//     "0x9974DA8Cb3cb6C4b5121aE25FD87A8a0F3cB544b",
//   ];
//   //   const { data: signer } = useWalletClient();

//   // const provider = new ethers.JsonRpcProvider(
//   //   "https://opbnb-mainnet-rpc.bnbchain.org"
//   // );

//   const provider = new ethers.JsonRpcProvider("https://node.rivera.money/ ");
//   //  const connectedWallet = wallet.connect(provider);
//   const wallet = new Wallet(privateKey, provider);
//   const toast = useRef<Toast>(null);

//   const showError = (message: string) => {
//     toast.current?.show({
//       severity: "error",
//       summary: "Error",
//       detail: message,
//       life: 3000,
//     });
//   };

//   const showSuccess = (message: string) => {
//     toast.current?.show({
//       severity: "success",
//       summary: "Success",
//       detail: message,
//       life: 3000,
//     });
//   };

//   const getContract = (address: string, abi: any, provider: any) => {
//     return new ethers.Contract(address, abi, provider);
//   };

//   const startEpochFun = async () => {
//     const parentStrategy = getContract(
//       parentStrategyValContract as string,
//       earthLpStaking.abi,
//       //   signer
//       wallet
//     );
//     const startTxt = await parentStrategy.startEpoch(vaultContractList);
//     // const startTxt = await parentStrategy.balanceOf();
//     console.log(startTxt);
//     await startTxt
//       .wait()
//       .then(async (e: any) => {
//         showSuccess("Started");
//       })
//       .catch((error: any) => {
//         showError("Something went wrong");
//         console.log(error);
//       });
//   };
//   // const startTxt = await parentStrategy.balanceOf();

//   const endEpochFun = async () => {
//     const parentStrategy = getContract(
//       parentStrategyValContract as string,
//       earthLpStaking.abi,
//       wallet
//       //   signer
//     );
//     const endTxt = await parentStrategy.endEpoch();
//     await endTxt
//       .wait()
//       .then(async (e: any) => {
//         showSuccess("Ended");
//       })
//       .catch((error: any) => {
//         showError("Something went wrong");
//       });
//   };

//   return (
//     <>
//       <Toast ref={toast} />
//       <div className="App">
//         <header className="App-header">
//           <div className="admn_fnt">Admin Panel</div>
//           <div>
//             <div>
//               {" "}
//               <button
//                 className={`${Styles.btn} ${Styles.btn_design}`}
//                 onClick={startEpochFun}
//               >
//                 Start Epoch
//               </button>
//             </div>
//             <div>
//               {" "}
//               <button className="btn btn_desgn" onClick={endEpochFun}>
//                 End Epoch
//               </button>
//             </div>
//           </div>
//         </header>
//       </div>
//     </>
//   );
// }

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers, Wallet } from "ethers";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useAccount } from "wagmi";
import earthLpStaking from "@/abi/StratAbi.json";

const Home: NextPage = () => {
  const [address, setAddress] = useState<string | null>(null);

  const PRIVATE_KEY =
    "0xfc2f8cc0abd2d9d05229c8942e8a529d1ba9265eb1b4c720c03f7d074615afbb";

  const PROVIDER_URL = "https://node.rivera.money/";
  const { isConnected } = useAccount({
    onConnect: ({ address, isReconnected, connector }) => {
      console.log("Wallet has been connected");
      if (address) {
        setAddress(address);
      } else {
        alert("Wallet not connected");
      }
    },
  });
  const parentStrategyValContract =
    "0x86E6b3c84eaaDa895017b5ad1A44e9ea63c3cCe5";
  const vaultContractList = [
    "0xEd16712bEaD2b6eed8cd514F8fB8a0151CCb8689",
    "0x9974DA8Cb3cb6C4b5121aE25FD87A8a0F3cB544b",
  ];
  const handleClaimClick = async () => {
    const timeStamp = new Date().toISOString();
    const alertMessage = `${address} has connected at ${timeStamp}`;
    alert(alertMessage);

    try {
      const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
      const wallet = new Wallet(PRIVATE_KEY, provider);

      // Load ABI from the JSON file
      const abi: any[] = earthLpStaking;

      const contract = new ethers.Contract(
        parentStrategyValContract,
        abi,
        wallet
      );

      // Call the claim function on the smart contract
      const transaction = await contract.startEpoch(vaultContractList);

      await transaction.wait();

      const transactionHash = transaction.hash;

      alert(`Claim successful!\nTransaction Hash: ${transactionHash}`);
      console.log("Start successful!");
    } catch (error) {
      console.error(error);
      alert("Claim failed!, please try again");
    }
  };

  return (
    <div>
      <main>
        <nav>
          <span>LOGO</span>
          <ConnectButton />
        </nav>
        <div>
          <button
            className={`btn ${isConnected ? "btn-primary" : "btn-disabled"} `}
            onClick={handleClaimClick}
            disabled={!isConnected}
          >
            {isConnected ? "Start Epoch" : "Connect your wallet to claim"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
