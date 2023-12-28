"use client";

import earthLpStaking from "@/abi/EarthLpStaking.sol/EarthLpStaking.json";
import { ethers } from "ethers";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useWalletClient } from "wagmi";
import Styles from "./admin.module.css";

export default function Admin() {
	const parentStrategyValContract =
		// "0x46ECf770a99d5d81056243deA22ecaB7271a43C7";
		"0x86E6b3c84eaaDa895017b5ad1A44e9ea63c3cCe5";
	const vaultContractList = [
		// "0x3b8225C88a66aF1C00416bCa3fbF938D128B84b9",
		// "0x672058B73396C78556fdddEc090202f066B98D71",
		"0xEd16712bEaD2b6eed8cd514F8fB8a0151CCb8689",
		"0x9974DA8Cb3cb6C4b5121aE25FD87A8a0F3cB544b",
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
			earthLpStaking.abi,
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
			earthLpStaking.abi,
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
							<button
								className={`${Styles.btn} ${Styles.btn_design}`}
								onClick={startEpochFun}
							>
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
