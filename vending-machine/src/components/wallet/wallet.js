import { useContext } from 'react';
import { StyledWalletContainer } from './wallet.styled';
import { CoinWindow } from './coinWindow/coinWindow';
import { MyMoneyMonitor } from './myMoneyMonitor/myMoneyMonitor';
import { WalletContext } from '../../context/walletProvider';
import { SwitchBox } from '../switchBox/switchBox';

export function Wallet() {
  const { walletInfo } = useContext(WalletContext);

  return (
    <>
      <SwitchBox />
      <StyledWalletContainer>
        <CoinWindow walletInfo={walletInfo} />
        <MyMoneyMonitor walletInfo={walletInfo} />
      </StyledWalletContainer>
    </>
  );
}
