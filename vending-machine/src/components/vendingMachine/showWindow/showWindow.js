import { useContext } from 'react';
import { ItemBox } from '../showWindowItemBox/itemBox';
import { StyledShowWindowContainer } from './showWindow.styled';
import { ItemContext } from '../../../context/itemProvider';
import { InputMoneyContext } from '../../../context/inputMoneyProvider';
import { LogContext } from '../../../context/logProvider';
import { ProgressContext } from '../../../context/progressProvider';
import { ITEM_DROP_TIME } from '../../../common/constants';

export function ShowWindow() {
  const { itemList, buyItem } = useContext(ItemContext);
  const { inputMoney, setInputMoney } = useContext(InputMoneyContext);
  const { logChoose, logDrop, logSoldOut } = useContext(LogContext);
  const { inProgress, setInProgress } = useContext(ProgressContext);

  const clickItemBox = ({ target }) => {
    const id = target.dataset.id;
    if (id === undefined) return;
    if (inProgress) return;
    if (itemList[id].price > inputMoney) return;

    setInProgress(true);
    target.dataset.click = 'true';
    // TODO: 비동기 로직 분리
    buyItem(id);
    logChoose(itemList[id].name);
    setInputMoney(money => money - itemList[id].price);
    setTimeout(() => {
      dropItemBox(target);
    }, ITEM_DROP_TIME);
  };

  const dropItemBox = target => {
    const id = target.dataset.id;
    target.dataset.click = 'false';
    logDrop(itemList[id].name);
    if (+itemList[id].stock === 1) {
      logSoldOut(itemList[id].name);
    }
    setInProgress(false);
  };

  return (
    <StyledShowWindowContainer onClick={clickItemBox}>
      {itemList.length ? itemList.map(item => <ItemBox key={item.id} item={item} />) : ''}
    </StyledShowWindowContainer>
  );
}
