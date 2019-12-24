import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { globalStyles, COLORS, IMAGES } from '../../constants';

export const ItemInfo = (props: NavigationInjectedProps) => {
  const onGoBack = () => {
    props.navigation.goBack();
  };
  return (
    <SafeAreaView style={globalStyles.safeView}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onGoBack}>
          <Image style={styles.icon} source={IMAGES.backArrow} />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Info</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Chair</Text>
        <View style={styles.formBlock}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Item name</Text>
            <Text style={styles.summaryValue}>Pupil chair</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Code</Text>
            <Text style={styles.summaryValue}>23295298572</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Item price</Text>
            <Text style={styles.summaryValue}>100$</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Amount</Text>
            <Text style={styles.summaryValue}>3</Text>
          </View>
          <View
            style={StyleSheet.flatten([
              styles.summaryItem,
              { marginBottom: 0 },
            ])}
          >
            <Text style={styles.summaryLabel}>Responsible</Text>
            <Text style={styles.summaryValue}>Head</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBg,
    paddingHorizontal: '12%',
    paddingTop: 47,
  },
  title: {
    color: '#fefdfc',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 36,
  },
  headerContainer: {
    backgroundColor: COLORS.mainBg,
    paddingVertical: 26,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  screenTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    width: 24,
    height: 16,
    marginRight: 29,
  },
  formBlock: {
    marginBottom: 22,
    shadowColor: 'rgba(0, 0, 0, 0.03)',
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 16,
    borderRadius: 8,
    backgroundColor: '#24282d',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  label: {
    color: '#5f5e5c',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#C5C5C5',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
