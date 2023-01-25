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
  const { logChoose, logDrop } = useContext(LogContext);
  const { inProgress, setInProgress } = useContext(ProgressContext);

  const clickItemBox = ({ target }) => {
    if (!target.dataset.name) return;
    if (inProgress) return;
    if (target.dataset.price > inputMoney) return;

    setInProgress(true);
    target.dataset.click = 'true';
    buyItem(target.dataset.id);
    logChoose(target.dataset.name);
    setInputMoney(money => money - target.dataset.price);
    setTimeout(() => {
      dropItemBox(target);
    }, ITEM_DROP_TIME);
  };

  const dropItemBox = target => {
    target.dataset.click = 'false';
    logDrop(target.dataset.name);
    setInProgress(false);
  };

  return (
    <StyledShowWindowContainer onClick={clickItemBox}>
      {itemList.length ? itemList.map(item => <ItemBox key={item.id} item={item} />) : ''}
    </StyledShowWindowContainer>
  );
}
