import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background: ${({ disabled }: { disabled: boolean }) =>
    disabled ? '#999' : '#d73035'};
  border-radius: 48px;
  align-items: center;
  justify-content: center;
  padding: 14px 24px;
`;
