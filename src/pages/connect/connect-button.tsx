import React from 'react';

import { config, web3, Button } from '../../shared';

const useMetamaskButton = () => {
  const onClick = async (): Promise<void> => {
    const isMetamaskExist = web3.isExist();
    if (!isMetamaskExist) {
      return alert('Please install metamask');
    }

    const account = await web3.connectWaller();
    if (!account) {
      return alert('No authorized account found');
    }

    const chainId = await web3.connectedChainId();

    if (chainId !== config.ropstenNetworkId) {
      alert('Please select Ropsten Testnet Network Network on MetaMask!');
    }

    console.log({ account, chainId });

    return undefined;
  };

  return ({
    onClick,
  });
};

const ConnectButton: React.FC = () => {
  const { onClick } = useMetamaskButton();
  return (
    <Button onClick={onClick}>
      Connect wallet
    </Button>
  );
};
export default ConnectButton;
