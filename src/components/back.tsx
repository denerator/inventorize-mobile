import * as React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

interface IProps {
  title: string;
  onPress(): void;
}

export const BackBtn = (props: IProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.btnContainer}>
      <Text style={styles.label}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
  },
  label: {
    color: '#5f5e5c',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 7,
  },
});
