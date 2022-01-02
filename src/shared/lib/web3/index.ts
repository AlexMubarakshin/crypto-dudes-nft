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

export default {
  isExist,
  connectWaller,
  connectedChainId,
};
