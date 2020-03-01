import * as React from 'react';
import { NavigationInjectedProps, ScrollView } from 'react-navigation';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { globalStyles, IMAGES, ROUTES, COLORS } from '../../constants';
import { storageService } from '../../services/storage.service';
import { IInventoryItem } from '../../typings/inventory';
import { adminService } from '../admin/admin.service';

export const Dashboard = (props: NavigationInjectedProps) => {
  const [inventory, setInventory] = React.useState<IInventoryItem[]>([]);

  const getInventory = async () => {
    try {
      const response = await adminService.getAllItems();
      setInventory(response.data);
    } catch (err) {
      console.log(err);
      Alert.alert('Something went wrong. Try again later');
    }
  };

  React.useEffect(() => {
    getInventory();
  }, []);

  const logout = async () => {
    // await storageService.clearUser();
    props.navigation.navigate(ROUTES.Intro);
  };

  const onAdd = () => {
    props.navigation.navigate(ROUTES.AdminBarcode);
  };

  const onReturn = () => {
    getInventory();
  };

  const onEdit = (item: IInventoryItem) => {
    props.navigation.navigate(ROUTES.ItemEdit, { item, onReturn });
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
        {inventory.map((item, index) => {
          const onItemClick = () => {
            onEdit(item);
          };
          return (
            <TouchableOpacity onPress={onItemClick} key={index}>
              <View style={styles.item}>
                <Text style={styles.itemLabel}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
    paddingHorizontal: '12%',
    paddingVertical: 15,
  },
  item: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 16,
    borderColor: '#fff',
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 9,
    borderRadius: 9,
  },
  itemLabel: {
    color: COLORS.barcodeCancelBtn,
    fontSize: 19,
    fontWeight: 'bold',
  },
  addBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.barcodeCancelBtn,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 90,
    right: 50,
  },
  plusBtn: {
    fontSize: 50,
    color: COLORS.mainBg,
  },
});
