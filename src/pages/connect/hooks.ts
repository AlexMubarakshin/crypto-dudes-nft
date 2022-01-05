import {
  useAppDispatch, connectionModule, userModule, useAppSelector,
} from '../../store';

import { config, web3 } from '../../shared';

export const useConnectPage = () => {
  const dispatch = useAppDispatch();

  const connecting = useAppSelector(connectionModule.selectConnecting);

  const onConnectClick = async (): Promise<void> => {
    dispatch(connectionModule.actions.connectRequest());

    const isMetamaskExist = web3.isExist();
    if (!isMetamaskExist) {
      const errorMessage = 'Please install metamask';
      dispatch(connectionModule.actions.connectFailure(errorMessage));

      return alert(errorMessage);
    }

    const account = await web3.connectWaller();
    if (!account) {
      const errorMessage = 'No authorized account found';
      dispatch(connectionModule.actions.connectFailure(errorMessage));

      return alert(errorMessage);
    }

    const chainId = await web3.connectedChainId();

    if (chainId !== config.rinkebyNetworkId) {
      const errorMessage = 'Please select Rinkeby Testnet Network Network on MetaMask!';
      dispatch(connectionModule.actions.connectFailure(errorMessage));

      return alert(errorMessage);
    }

    dispatch(connectionModule.actions.connectSuccess());

    dispatch(userModule.actions.setAccountId(account[0]));

    return undefined;
  };

  return ({
    connecting,

    onConnectClick,
  });
};
