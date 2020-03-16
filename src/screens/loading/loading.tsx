import * as React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { globalStyles, ROUTES } from '../../constants';
import { storageService } from '../../services/storage.service';
import { tokenService } from '../../services/token.service';
import { userService } from '../../services/user.service';

export const Loading = (props: NavigationInjectedProps) => {
  React.useEffect(() => {
    const fetchUser = async () => {
      const user = await storageService.getUser();
      if (user) {
        userService.setUser(user);
        tokenService.setToken(user.access_token);
        props.navigation.navigate(ROUTES.AdminDashboard);
        return;
      }
      props.navigation.navigate(ROUTES.Intro);
    };
    fetchUser();
  }, []);
  return (
    <View style={[globalStyles.safeView, styles.container]}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
