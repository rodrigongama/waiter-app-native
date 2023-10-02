import { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';
import { Text } from '../Text';

import { Container } from './styles';

interface ButtonProps {
  onPress: () => void;
  disabled?: boolean;
  children: ReactNode;
  loading?: boolean;
}

export function Button({ onPress, disabled, children, loading }: ButtonProps) {
  return (
    <Container onPress={onPress} disabled={disabled || loading}>
      {!loading && (
        <Text weight="600" color="#fff">
          {children}
        </Text>
      )}

      {loading && <ActivityIndicator color="#fff" />}
    </Container>
  );
}
