import { GlobalStyle } from './common/globalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from './common/theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VendingMachine } from './components/vendingMachine/vendingMachine';
import { Wallet } from './components/wallet/wallet';
import { WalletProvider } from './context/walletProvider';
import { LogProvider } from './context/logProvider';
import { InputMoneyProvider } from './context/inputMoneyProvider';
import { ProgressProvider } from './context/progressProvider';
import { PaybackTimerProvider } from './context/paybackTimerProvider';
import { ItemProvider } from './context/itemProvider';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <ItemProvider>
          <WalletProvider>
            <LogProvider>
              <InputMoneyProvider>
                <ProgressProvider>
                  <PaybackTimerProvider>
                    <Routes>
                      <Route path={process.env.PUBLIC_URL} element={<VendingMachine />} />
                      <Route path="myWallet" element={<Wallet />} />
                    </Routes>
                  </PaybackTimerProvider>
                </ProgressProvider>
              </InputMoneyProvider>
            </LogProvider>
          </WalletProvider>
        </ItemProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
