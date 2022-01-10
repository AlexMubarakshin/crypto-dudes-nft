import { ethers } from 'ethers';

const isExist = () => !!(window as any).ethereum;

const connectWaller = async () => {
  try {
    const account = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

    return account;
  } catch (e) {
    console.error(e);

    return undefined;
  }
};

const connectedChainId = async (): Promise<string> => {
  try {
    const id = await (window as any).ethereum.request({ method: 'eth_chainId' });

    return id;
  } catch (e) {
    console.error(e);
  }

  return '';
};

const getSigner = () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  return provider.getSigner();
};

const getContact = async (address: string, abi: any) => {
  const signer = getSigner();

  return new ethers.Contract(
    address,
    abi,
    signer,
  );
};

export default {
  isExist,
  connectWaller,
  connectedChainId,
  getSigner,
  getContact,
};
