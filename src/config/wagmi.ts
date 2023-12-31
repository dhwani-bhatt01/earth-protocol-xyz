import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createClient } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

// Rivera Testnet Mantle details
const riveraTestnetChain: Chain = {
	id: 5000,
	name: "Rivera Testnet Mantle",
	network: "ETH",
	// iconUrl: "path/to/your/icon.png", // Replace with the path to your network icon
	nativeCurrency: {
		decimals: 18,
		name: "Rivera Testnet Mantle",
		symbol: "ETH",
	},
	rpcUrls: {
		default: {
			http: ["https://node.rivera.money/"],
		},
		public: {
			http: ["https://node.rivera.money/"],
		},
	},
};

const mantleChain: Chain = {
	id: 5001,
	name: "Mantle Testnet",
	network: "MNT",
	// iconUrl: "../img/mantle.svg",
	//iconBackground: '#fff',
	nativeCurrency: {
		decimals: 18,
		name: "Mantle Testnet",
		symbol: "MNT",
	},
	rpcUrls: {
		default: {
			http: ["https://rpc.testnet.mantle.xyz"],
		},
		public: {
			http: ["https://rpc.testnet.mantle.xyz"],
		},
	},
	blockExplorers: {
		default: { name: "SnowTrace", url: "https://explorer.testnet.mantle.xyz" },
	},
	testnet: true,
};

const bnbLocalChain: Chain = {
	id: 56,
	name: "Rivera Testnet (BNB)",
	network: "BNB",
	// iconUrl: "../img/bnbLogo.svg",
	//iconBackground: '#fff',
	nativeCurrency: {
		decimals: 18,
		name: "Rivera Testnet (BNB)",
		symbol: "BNB",
	},
	rpcUrls: {
		default: {
			http: ["https://testnet.rivera.money:8546/"],
		},
		public: {
			http: ["https://testnet.rivera.money:8546/"],
		},
	},
	blockExplorers: {
		default: { name: "SnowTrace", url: "https://bscscan.com/" },
	},
	testnet: true,
};

const ethGoerliChain: Chain = {
	id: 84531,
	name: "Base Goerli",
	network: "ETH",
	// iconUrl: "../img/baseNetwork.svg",
	//iconBackground: '#fff',
	nativeCurrency: {
		decimals: 18,
		name: "Base Goerli",
		symbol: "ETH",
	},
	rpcUrls: {
		default: {
			http: ["https://goerli.base.org"],
		},
		public: {
			http: ["https://goerli.base.org"],
		},
	},
	blockExplorers: {
		default: { name: "SnowTrace", url: "https://goerli.basescan.org/" },
	},
	testnet: true,
};

const opBNBChain: Chain = {
	id: 204,
	name: "opBNB",
	network: "BNB",
	// iconUrl: "../img/bnbLogo.svg",
	//iconBackground: '#fff',
	nativeCurrency: {
		decimals: 18,
		name: "opBNB",
		symbol: "BNB",
	},
	rpcUrls: {
		default: {
			http: ["https://opbnb-mainnet-rpc.bnbchain.org"],
		},
		public: {
			http: ["https://opbnb-mainnet-rpc.bnbchain.org"],
		},
	},
	blockExplorers: {
		default: { name: "SnowTrace", url: "https://mainnet.opbnbscan.com" },
	},
	testnet: true,
};

const modeChain: Chain = {
	id: 919,
	name: "Mode Testnet",
	network: "ETH",
	// iconUrl: "../img/moedNetwork.svg",
	//iconBackground: '#fff',
	nativeCurrency: {
		decimals: 18,
		name: "Mode Testnet",
		symbol: "ETH",
	},
	rpcUrls: {
		default: {
			http: ["https://sepolia.mode.network/"],
		},
		public: {
			http: ["https://sepolia.mode.network/"],
		},
	},
	blockExplorers: {
		default: {
			name: "SnowTrace",
			url: "https://sepolia.explorer.mode.network/",
		},
	},
	testnet: true,
};

const zetaTestnetChain: Chain = {
	id: 7001,
	name: "ZetaChain Testnet",
	network: "ZETA",
	nativeCurrency: {
		decimals: 18,
		name: "ZetaChain Testnet",
		symbol: "ZETA",
	},
	rpcUrls: {
		default: {
			http: ["https://zetachain-athens-evm.blockpi.network/v1/rpc/public"],
		},
		public: {
			http: ["https://zetachain-athens-evm.blockpi.network/v1/rpc/public"],
		},
	},
};

export const { chains, provider } = configureChains(
	[opBNBChain, ethGoerliChain, riveraTestnetChain, zetaTestnetChain],
	[
		alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }),
		publicProvider(),
	]
);

const { connectors } = getDefaultWallets({
	appName: "My RainbowKit App",
	projectId: "ee56c353983496c87480ff2ae841a933",
	chains,
});

export const wagmiConfig = createClient({
	autoConnect: true,
	connectors,
	provider,
});
