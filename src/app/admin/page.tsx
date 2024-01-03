"use client";

import earthLpStaking from "@/abi/EarthLpStaking.sol/EarthLpStaking.json";
// import { ContractTransactionResponse } from "ethers";
// import ABI from "@/abi/EarthLpStaking.sol/StratAbi.json";
// import StratAbi from "@/abi/EarthLpStaking.sol/StratAbi.json";
import { ethers } from "ethers";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useWalletClient } from "wagmi";

export default function Admin() {
	const [isStarting, setIsStarting] = useState(false);
	// const parentStrategyValContract =
	// 	"0x25adf247ac836d35be924f4b701a0787a30d46a9";
	// const vaultContractList = [
	// 	"0x55FD5B67B115767036f9e8af569B281A8A544a12",
	// 	"0xE7C0E6b67b58e36BcAA45c2b783f384555C42d26",
	// 	// "0x74c5e75798b33d38abee64f7ec63698b7e0a10f1",
	// 	// "0xe8d223328543Cc10Edaa3292CE12C320CE43A099",
	// ];

	const parentStrategyValContract =
		// "0x25ADF247aC836D35be924f4b701A0787A30d46a9";
		"0x25adf247ac836d35be924f4b701a0787a30d46a9";
	const vaultContractList = [
		// "0x55FD5B67B115767036f9e8af569B281A8A544a12",
		// "0xE7C0E6b67b58e36BcAA45c2b783f384555C42d26",
		"0x74c5e75798b33d38abee64f7ec63698b7e0a10f1",
		"0xe8d223328543Cc10Edaa3292CE12C320CE43A099",
	];
	const { data: signer, error, fetchStatus } = useWalletClient();
	const toast = useRef<Toast>(null);
	console.log(signer, error, fetchStatus, "TESTING");

	useEffect(() => {
		checkEpochValue();
		// getHistoricalData();
	}, [signer]);

	// const showError = (message: string) => {
	// 	toast.current?.show({
	// 		severity: "error",
	// 		summary: "Error",
	// 		detail: message,
	// 		life: 3000,
	// 	});
	// };

	// const showSuccess = (message: string) => {
	// 	toast.current?.show({
	// 		severity: "success",
	// 		summary: "Success",
	// 		detail: message,
	// 		life: 3000,
	// 	});
	// };

	const getContract = (address: string, abi: any, provider: any) => {
		return new ethers.Contract(address, abi, provider);
	};

	// const startEpochFun = async () => {
	// 	const parentStrategy = getContract(
	// 		parentStrategyValContract as string,
	// 		earthLpStaking.abi,
	// 		signer
	// 	);
	// 	const startTxt = await parentStrategy.startEpoch(vaultContractList);
	// 	await startTxt
	//   await startTxt.wait();
	// 		.then(async (e: any) => {
	// 			showSuccess("Started");
	// 		})
	// 		.catch((error: any) => {
	// 			showError("Something went wrong");
	// 		});
	// };
	const startEpochFun = async () => {
		try {
			setIsStarting(true);
			console.log(signer, "signer it is");
			const parentStrategy = getContract(
				parentStrategyValContract as string,
				earthLpStaking.abi,
				signer
			);

			const startTxt = await parentStrategy.startEpoch(vaultContractList);

			// Wait for the transaction to be mined
			await startTxt.wait();
			console.log(startTxt);

			console.log("Transaction started successfully");
		} catch (error) {
			console.error(error);
			console.log("something went wrong");
		} finally {
			setIsStarting(false);
		}
	};

	const checkEpochValue = async () => {
		const parentStrategy = getContract(
			parentStrategyValContract as string,
			earthLpStaking.abi,
			signer
		);
		const epochRunningVal = await parentStrategy.epochRunning();
		console.log("epochRunningVal", epochRunningVal);
	};

	// const endEpochFun = async () => {
	// 	const parentStrategy = getContract(
	// 		parentStrategyValContract as string,
	// 		earthLpStaking.abi,
	// 		signer
	// 	);
	// 	const endTxt = await parentStrategy.endEpoch();
	// 	await endTxt
	// 		.wait()
	// 		.then(async (e: any) => {
	// 			showSuccess("Ended");
	// 		})
	// 		.catch((error: any) => {
	// 			showError("Something went wrong");
	// 		});
	// };

	const endEpochFun = async () => {
		try {
			setIsStarting(true);

			const parentStrategy = getContract(
				parentStrategyValContract as string,
				earthLpStaking.abi,
				signer
			);

			const enTxt = await parentStrategy.endEpoch();

			// Wait for the transaction to be mined
			await enTxt; //mine hone m error h
			console.log(enTxt);

			// showSuccess("Ended");
			console.log("transaction ended successfully");
		} catch (error) {
			console.error(error);
			console.log("Something went wrong");
		} finally {
			setIsStarting(false);
		}
	};

	return (
		<>
			<Toast ref={toast} />
			<div className="App">
				<header className="App-header">
					<div className="admn_fnt">Admin Panel</div>
					<div>
						<div>
							{" "}
							<button className="btn btn_desgn" onClick={startEpochFun}>
								Start Epoch
							</button>
						</div>
						<div>
							{" "}
							<button className="btn btn_desgn" onClick={endEpochFun}>
								End Epoch
							</button>
						</div>
					</div>
				</header>
			</div>
		</>
	);
}
