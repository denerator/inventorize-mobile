import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { BarcodeScreen } from '../barcode/barcode';
import { ROUTES } from '../../constants';
import { ItemInfo } from '../item-info/item.info';

export const UserNavigation = createStackNavigator(
  {
    [ROUTES.UserBarcode]: {
      screen: BarcodeScreen,
      navigationOptions: {
        header: null,
        headerBackTitle: null,
      },
      params: {
        isAdmin: false,
      },
    },
    [ROUTES.ItemInfo]: {
      screen: ItemInfo,
      navigationOptions: {
        header: null,
        headerBackTitle: null,
      },
    },
  },
  {
    initialRouteName: ROUTES.UserBarcode,
  }
);
