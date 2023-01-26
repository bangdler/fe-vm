import { createContext, useEffect, useState } from 'react';
import { fetchData } from '../helper/utils';

export const ItemContext = createContext([]);

export function ItemProvider({ children }) {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const setData = async () => {
      const itemData = await fetchData(`${process.env.REACT_APP_API_SERVER}/items`, { method: 'GET' });
      setItemList(itemData);
    };
    setData();
  }, []);

  const buyItem = async id => {
    await fetchData(`${process.env.REACT_APP_API_SERVER}/items/${id}`, {
      method: 'PATCH',
      bodyData: { stock: itemList[id].stock - 1 },
    });
    setItemList(state => state.map(it => (+it.id === +id ? { ...it, stock: it.stock - 1 } : it)));
  };

  return <ItemContext.Provider value={{ itemList, buyItem }}>{children}</ItemContext.Provider>;
}
