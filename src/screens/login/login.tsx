import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { authService } from '../../services/auth.service';
import { ROUTES, globalStyles, COLORS } from '../../constants';
import { CTA } from '../../components/cta';
import { BackBtn } from '../../components/back';
import { NavigationInjectedProps } from 'react-navigation';
import { STRINGS } from '../../constants/locales';

const loginState = {
  email: '',
  password: '',
};

export const LoginScreen = (props: NavigationInjectedProps) => {
  const [state, setState] = React.useState(loginState);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    authService.login(
      state,
      () => {
        setIsLoading(false);
        props.navigation.navigate(ROUTES.AdminDashboard);
      },
      (message: string) => {
        setIsLoading(false);
        Alert.alert(message);
      }
    );
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
            <Text style={styles.heading}>{STRINGS.login.title}</Text>
            <View>
              <Text style={styles.label}>{STRINGS.login.email}</Text>
              <TextInput
                value={state.email}
                onChangeText={setEmail}
                style={styles.input}
              />
            </View>
            <View>
              <Text style={styles.label}>{STRINGS.login.password}</Text>
              <TextInput
                secureTextEntry={true}
                value={state.password}
                onChangeText={setPassword}
                style={styles.input}
              />
            </View>
            {isLoading ? (
              <ActivityIndicator size={69} />
            ) : (
              <CTA
                onPress={onSubmit}
                title={STRINGS.login.submit}
                disabled={!isSubmitDisabled()}
              />
            )}
          </View>
          <BackBtn title={STRINGS.login.back} onPress={goBack} />
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
    marginBottom: 8,
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
