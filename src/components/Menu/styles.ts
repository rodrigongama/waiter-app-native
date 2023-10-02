import styled from 'styled-components/native';

export const Product = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const ProductImage = styled.Image`
  border-radius: 8px;
  height: 96px;
  width: 120px;
`;

export const ProductDetails = styled.View`
  flex: 1;
  margin-left: 16px;
`;

export const Separator = styled.View`
  background: rgba(204, 204, 204, 0.3);
  margin: 24px 0;
  height: 1px;
  width: 100%;
`;

export const AddToCartButton = styled.TouchableOpacity`
  align-self: flex-end;
`;

export const CenteredContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
