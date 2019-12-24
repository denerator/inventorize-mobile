import * as React from 'react';
import { TouchableOpacity, StyleSheet, Text, ViewStyle } from 'react-native';

interface IProps {
  title: string;
  onPress(): void;
  customStyles?: ViewStyle;
  disabled?: boolean;
}

export const CTA = (props: IProps) => {
  const containerStyle = StyleSheet.flatten([
    styles.btnContainer,
    props.customStyles,
  ]);

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={containerStyle}
      disabled={props.disabled}
    >
      <Text style={styles.btnText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    shadowColor: 'rgba(67, 165, 158, 0.23)',
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 20,
    borderRadius: 10,
    backgroundColor: '#43a59e',
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
