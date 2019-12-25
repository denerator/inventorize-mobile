import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { BarcodeScreen } from '../barcode/barcode';
import { ROUTES } from '../../constants';
import { Dashboard } from '../dashboard';
import { EditItemScreen } from '../item-edit';

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
      screen: EditItemScreen,
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
