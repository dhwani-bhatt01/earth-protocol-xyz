"use client";

// import earthLpStaking from "@/abi/EarthLpStaking.sol/EarthLpStaking.json";
import parentStrat from "@/abi/parenstrat.json";
import { ethers } from "ethers";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useWalletClient } from "wagmi";

export default function ZetaAdmin() {
	const parentStrategyValContract =
		"0x23b3022BD63E6F7FE9aF5371f3AFC981449930af";
	const vaultContractList = [
		"0x606e5cc263cA1c8c72331a1B69b48f84c2289EE9",
		"0x7Da0c8f862be14501738808eea116129677b5CA5",
	];
	const { data: signer } = useWalletClient();
	const toast = useRef<Toast>(null);

	const showError = (message: string) => {
		toast.current?.show({
			severity: "error",
			summary: "Error",
			detail: message,
			life: 3000,
		});
	};

	const showSuccess = (message: string) => {
		toast.current?.show({
			severity: "success",
			summary: "Success",
			detail: message,
			life: 3000,
		});
	};

	const getContract = (address: string, abi: any, provider: any) => {
		return new ethers.Contract(address, abi, provider);
	};

	const startEpochFun = async () => {
		const parentStrategy = getContract(
			parentStrategyValContract as string,
			parentStrat,
			signer
		);
		const startTxt = await parentStrategy.startEpoch(vaultContractList);
		await startTxt
			.wait()
			.then(async (e: any) => {
				showSuccess("Started");
			})
			.catch((error: any) => {
				showError("Something went wrong");
			});
	};

	const endEpochFun = async () => {
		const parentStrategy = getContract(
			parentStrategyValContract as string,
			// earthLpStaking.abi,
			parentStrat,
			signer
		);
		const endTxt = await parentStrategy.endEpoch();
		await endTxt
			.wait()
			.then(async (e: any) => {
				showSuccess("Ended");
			})
			.catch((error: any) => {
				showError("Something went wrong");
			});
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
