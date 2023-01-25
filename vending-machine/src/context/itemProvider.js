import { createContext, useEffect, useReducer } from 'react';
import { fetchData } from '../helper/utils';

export const ItemContext = createContext([]);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.state;
    case 'BUY':
      return state.map(it => (it.id === action.id ? { ...it, stock: it.stock-- } : it));
  }
};
export function ItemProvider({ children }) {
  const [itemList, itemListDispatch] = useReducer(reducer, []);

  useEffect(() => {
    const setData = async () => {
      const itemData = await fetchData(`${process.env.REACT_APP_API_SERVER}/items`, { method: 'GET' });
      itemListDispatch({ type: 'SET', state: itemData });
    };
    setData();
  }, []);

  const buyItem = async id => {
    await fetchData(`${process.env.REACT_APP_API_SERVER}/items/${id}`, {
      method: 'PATCH',
      bodyData: { stock: itemList[id].stock - 1 },
    });
    itemListDispatch({ type: 'BUY', id });
  };

  return <ItemContext.Provider value={{ itemList, buyItem }}>{children}</ItemContext.Provider>;
}
