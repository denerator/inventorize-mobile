import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { BarcodeScreen } from '../barcode/barcode';
import { ROUTES } from '../../constants';
import { ItemInfo } from '../item-info/item.info';
import { Dashboard } from '../dashboard';

export const AdminNavigation = createStackNavigator(
  {
    [ROUTES.AdminDashboard]: {
      screen: Dashboard,
      navigationOptions: {
        header: null,
        headerBackTitle: null,
      },
    },
    [ROUTES.AdminBarcode]: {
      screen: BarcodeScreen,
      navigationOptions: {
        header: null,
        headerBackTitle: null,
      },
      params: {
        isAdmin: true,
      },
    },
    [ROUTES.ItemEdit]: {
      screen: ItemInfo, // TODO: replace with edit screen
      navigationOptions: {
        header: null,
        headerBackTitle: null,
      },
    },
  },
  {
    initialRouteName: ROUTES.AdminDashboard,
  }
);
