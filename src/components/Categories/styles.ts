import { Platform } from 'react-native';
import styled from 'styled-components/native';

const isAndroid = Platform.OS === 'android';

export const CategoryContainer = styled.TouchableOpacity`
  align-items: center;
  margin-left: 24px;
`;

export const Icon = styled.View`
  background: #fff;
  border-radius: 22px;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, ${isAndroid ? 1 : 0.1});
  elevation: 2;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  height: 44px;
  width: 44px;
`;
