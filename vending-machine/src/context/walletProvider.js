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

  const incrementCoin = async (coinId, num) => {
    await fetchData(`${process.env.REACT_APP_API_SERVER}/coins/${coinId}`, {
      method: 'PATCH',
      bodyData: { quantity: walletInfo[coinId].quantity + num },
    });

    setWalletInfo(prevWalletInfo =>
      prevWalletInfo.map(currentCoin => {
        if (currentCoin.id === +coinId) {
          return { ...currentCoin, quantity: currentCoin.quantity + num };
        }
        return currentCoin;
      })
    );
  };

  const decrementCoin = async (coinId, num) => {
    await fetchData(`${process.env.REACT_APP_API_SERVER}/coins/${coinId}`, {
      method: 'PATCH',
      bodyData: { quantity: walletInfo[coinId].quantity - num },
    });

    setWalletInfo(prevWalletInfo =>
      prevWalletInfo.map(currentCoin => {
        if (currentCoin.id === +coinId) {
          return { ...currentCoin, quantity: currentCoin.quantity - num };
        }
        return currentCoin;
      })
    );
  };

  return (
    <WalletContext.Provider value={{ walletInfo, incrementCoin, decrementCoin }}>{children}</WalletContext.Provider>
  );
}
