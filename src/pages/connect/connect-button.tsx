import React from 'react';

import { config, web3, Button } from '../../shared';

type OnConnectedCallback = (accountId: string) => void;

const useMetamaskButton = (
  onConnected: OnConnectedCallback,
) => {
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

    return onConnected(chainId);
  };

  return ({
    onClick,
  });
};

type Props = {
  onConnected: OnConnectedCallback,
};

const ConnectButton: React.FC<Props> = ({
  onConnected,
}) => {
  const { onClick } = useMetamaskButton(onConnected);
  return (
    <Button onClick={onClick}>
      Connect wallet
    </Button>
  );
};
export default ConnectButton;
