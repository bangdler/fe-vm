import { Outlet } from 'react-router-dom';
import { SwitchBox } from '../components/switchBox/switchBox';
import { WalletProvider } from '../context/walletProvider';
import { LogProvider } from '../context/logProvider';
import { InputMoneyProvider } from '../context/inputMoneyProvider';
import { ProgressProvider } from '../context/progressProvider';
import { PaybackTimerProvider } from '../context/paybackTimerProvider';
import { ItemProvider } from '../context/itemProvider';

export function Home() {
  return (
    <>
      <SwitchBox />

    </>
  );
}
