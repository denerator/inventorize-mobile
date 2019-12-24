import * as React from 'react';
import { NavigationInjectedProps, ScrollView } from 'react-navigation';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { globalStyles, IMAGES, ROUTES, COLORS } from '../../constants';
import { storageService } from '../../services/storage.service';

export const Dashboard = (props: NavigationInjectedProps) => {
  const logout = async () => {
    // await storageService.clearUser();
    props.navigation.navigate(ROUTES.Intro);
  };
  return (
    <SafeAreaView style={globalStyles.safeView}>
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>Admin Dashboard</Text>
        <TouchableOpacity onPress={logout}>
          <Image style={styles.logout} source={IMAGES.logout} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.list}>
        <View style={styles.item}>
          <Text style={styles.itemLabel}>Chair</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemLabel}>Chair</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemLabel}>Chair</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemLabel}>Chair</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemLabel}>Chair</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemLabel}>Chair</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.mainBg,
    paddingVertical: 26,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  screenTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logout: {
    width: 24,
    height: 24,
  },
  list: {
    flex: 1,
    paddingHorizontal: '12%',
    paddingVertical: 15,
  },
  item: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 9,
    borderRadius: 9,
  },
  itemLabel: {
    color: '#000',
    fontSize: 19,
    fontWeight: 'bold',
  },
});
