import { StyledItemContainer, StyledItemName, StyledItemPrice } from './itemBox.styled';
import { getWonTemplate } from '../../../helper/utils';

export function ItemBox({ item }) {
  return (
    <StyledItemContainer>
      <StyledItemName data-id={item.id} data-name={item.name} data-price={item.price} data-click={false}>
        {item.name}
        {item.stock > 0 ? `` : <p>품절</p>}
      </StyledItemName>
      <StyledItemPrice>{getWonTemplate(Number(item.price))}</StyledItemPrice>
    </StyledItemContainer>
  );
}
