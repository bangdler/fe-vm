import { createContext, useEffect, useState } from 'react';
import { fetchData } from '../helper/utils';

export const WalletContext = createContext([]);

export function WalletProvider({ children }) {
  const [walletInfo, setWalletInfo] = useState([]);

  useEffect(() => {
    const setData = async () => {
      const coinData = await fetchData(`${process.env.REACT_APP_API_SERVER}/coins`, { method: 'GET' });
      setWalletInfo(coinData);
    };
    setData();
  }, []);

  const incrementCoin = coin => {
    setWalletInfo(prevWalletInfo =>
      prevWalletInfo.map(currentCoin => {
        if (currentCoin.coin === coin) {
          return { ...currentCoin, quantity: currentCoin.quantity + 1 };
        }
        return currentCoin;
      })
    );
  };

  const decrementCoin = coin => {
    setWalletInfo(prevWalletInfo =>
      prevWalletInfo.map(currentCoin => {
        if (currentCoin.coin === coin) {
          return { ...currentCoin, quantity: currentCoin.quantity - 1 };
        }
        return currentCoin;
      })
    );
  };

  return (
    <WalletContext.Provider value={{ walletInfo, incrementCoin, decrementCoin, putServerCoins }}>
      {children}
    </WalletContext.Provider>
  );
}
