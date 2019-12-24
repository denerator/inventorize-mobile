import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  SafeAreaView,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { authService } from '../../services/auth.service';
import { storageService } from '../../services/storage.service';
import { ROUTES, globalStyles, COLORS } from '../../constants';
import { tokenService } from '../../services/token.service';
import { CTA } from '../../components/cta';
import { BackBtn } from '../../components/back';
import { NavigationInjectedProps } from 'react-navigation';

const loginState = {
  email: '',
  password: '',
};

export const LoginScreen = (props: NavigationInjectedProps) => {
  const [state, setState] = React.useState(loginState);

  const onSubmit = async () => {
    try {
      const resp: any = await authService.login(state);
      // await storageService.saveUser(resp.data.data);
      // tokenService.setToken(resp.data.data.accessToken);
      props.navigation.navigate(ROUTES.AdminDashboard);
    } catch (error) {
      Alert.alert('Wrong email or password');
    }
  };
  const setEmail = (value: string) => {
    setState({
      ...state,
      email: value,
    });
  };
  const setPassword = (value: string) => {
    setState({
      ...state,
      password: value,
    });
  };
  const isSubmitDisabled = (): boolean => {
    return state.password.length > 4;
  };

  const goBack = () => {
    props.navigation.navigate(ROUTES.Intro);
  };

  return (
    <SafeAreaView style={globalStyles.safeView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View></View>
          <View>
            <Text style={styles.heading}>Log In</Text>
            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={state.email}
                onChangeText={setEmail}
                style={styles.input}
              />
            </View>
            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                secureTextEntry={true}
                value={state.password}
                onChangeText={setPassword}
                style={styles.input}
              />
            </View>
            <CTA
              onPress={onSubmit}
              title="Submit"
              disabled={!isSubmitDisabled()}
            />
          </View>
          <BackBtn title="Go back" onPress={goBack} />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBg,
    justifyContent: 'space-between',
    paddingHorizontal: '12%',
  },
  heading: {
    color: '#fefdfc',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 36,
  },
  label: {
    color: '#5f5e5c',
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    shadowColor: 'rgba(0, 0, 0, 0.03)',
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 16,
    borderRadius: 8,
    backgroundColor: '#24282d',
    color: '#fff',
    paddingVertical: 17,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
});
