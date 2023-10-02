import styled from 'styled-components/native';

export const Image = styled.ImageBackground`
  align-items: flex-end;
  height: 200px;
  width: 100%;
`;

export const CloseButton = styled.TouchableOpacity`
  background: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  margin: 24px;
  height: 32px;
  width: 32px;
`;

export const ModalBody = styled.View`
  background: #fafafa;
  flex: 1;
  padding: 32px 24px 0;
`;

export const Header = styled.View``;

export const IngredientsContainer = styled.View`
  flex: 1;
  margin-top: 32px;
`;

export const Ingredient = styled.View`
  border: 1px solid rgba(204, 204, 204, 0.3);
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

export const Footer = styled.View`
  background: #fff;
  min-height: 110px;
  padding: 16px 24px;
`;

export const FooterContainer = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PriceContainer = styled.View``;
