import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";

const clientId = "BN2ajtpK2UuhTalWdTSx2jErTe-3G8R9iXmlNbVXKYtgeHMGl7njxmxlJogkn6RSJ4VyhcVgSb2y0B9gIdc6ABE"; 

const chainConfig = {
  chainNamespace: "eip155",
  chainId: "0x15f912", // hex of 1284, moonbeam mainnet
  rpcTarget: "https://rpc-evm-sidechain.xrpl.org",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "XRPL EVM Sidechain Devnet",
  blockExplorerUrl: "https://evm-sidechain.xrpl.org",
  ticker: "XRP",
  tickerName: "XRP",
  logo: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
};


const web3auth = new Web3Auth({
  clientId,
  chainConfig
});

const setupWeb3Auth = async () => {
  await web3auth.initModal();
};

export { web3auth, setupWeb3Auth };