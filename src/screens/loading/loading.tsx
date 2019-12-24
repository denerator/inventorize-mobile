import * as React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { globalStyles, ROUTES } from '../../constants';
import { storageService } from '../../services/storage.service';
import { tokenService } from '../../services/token.service';

export const Loading = (props: any) => {
  React.useEffect(() => {
    const fetchUser = async () => {
      // const user = await storageService.getUser();
      // console.log(user);
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
