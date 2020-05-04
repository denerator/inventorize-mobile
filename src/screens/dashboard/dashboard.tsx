import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { globalStyles, IMAGES, ROUTES, COLORS } from '../../constants';
import { IInventoryItem } from '../../typings/inventory';
import { userService } from '../../services/user.service';
import { inventoryService } from '../../services/inventory.service';
import { DashboardItem } from './components/dashboard.item';
import { STRINGS } from '../../constants/locales';

export const Dashboard = (props: NavigationInjectedProps) => {
  const [inventory, setInventory] = React.useState<IInventoryItem[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getInventory = async () => {
    try {
      setRefreshing(true);
      const response = await inventoryService.getAllItems();
      setRefreshing(false);
      setInventory(response.data);
    } catch (err) {
      Alert.alert(STRINGS.errors.default);
    }
  };

  React.useEffect(() => {
    getInventory();
  }, []);

  const logout = async () => {
    await userService.logout();
    props.navigation.navigate(ROUTES.Intro);
  };

  const onAdd = () => {
    props.navigation.navigate(ROUTES.AdminBarcode, { onReturn });
  };

  const onReturn = () => {
    getInventory();
  };

  const onEdit = (item: IInventoryItem) => {
    props.navigation.navigate(ROUTES.ItemEdit, { item, onReturn });
  };

  const onRefresh = () => {
    getInventory();
  };

  return (
    <SafeAreaView style={globalStyles.safeView}>
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>{STRINGS.dashboard.title}</Text>
        <TouchableOpacity onPress={logout}>
          <Image style={styles.logout} source={IMAGES.logout} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {inventory.map((item, index) => (
          <DashboardItem onEdit={onEdit} item={item} key={index} />
        ))}
      </ScrollView>
      <TouchableOpacity onPress={onAdd} style={styles.addBtn}>
        <Text style={styles.plusBtn}>+</Text>
      </TouchableOpacity>
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
  addBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#80CBC4',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 90,
    right: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  plusBtn: {
    fontSize: 50,
    color: COLORS.mainBg,
  },
});
