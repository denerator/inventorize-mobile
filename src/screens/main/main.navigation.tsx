import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { ROUTES } from '../../constants';
import { Loading } from '../loading';
import { Intro } from '../intro';
import { LoginScreen } from '../login';
import { BarcodeScreen } from '../barcode/barcode';
import { UserNavigation } from '../user/user.navigation';
import { AdminNavigation } from '../admin/admin.navigation';

export const MainRouting = createAppContainer(
  createSwitchNavigator(
    {
      [ROUTES.Loading]: Loading,
      [ROUTES.Intro]: Intro,
      [ROUTES.Auth]: LoginScreen,
      [ROUTES.User]: UserNavigation,
      [ROUTES.Admin]: AdminNavigation,
    },
    {
      initialRouteName: ROUTES.Loading,
    }
  )
);
