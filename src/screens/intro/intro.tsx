import * as React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { globalStyles, COLORS, ROUTES, IMAGES } from '../../constants';
import { CTA } from '../../components/cta';
import { NavigationInjectedProps } from 'react-navigation';
import { STRINGS } from '../../constants/locales';

export const Intro = (props: NavigationInjectedProps) => {
  const onAdmin = () => {
    props.navigation.navigate(ROUTES.Auth);
  };

  const onUser = () => {
    props.navigation.navigate(ROUTES.UserBarcode);
  };
  return (
    <SafeAreaView style={globalStyles.safeView}>
      <View style={styles.container}>
        <Image style={styles.image} source={IMAGES.introImage} />
        <View>
          <Text style={styles.title}>{STRINGS.intro.appName}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.subTitle}>{STRINGS.intro.description}</Text>
          </View>
        </View>
        <View>
          <CTA title={STRINGS.intro.user} onPress={onUser} />
          <CTA title={STRINGS.intro.admin} onPress={onAdmin} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBg,
    paddingHorizontal: '12%',
    paddingTop: 87,
    justifyContent: 'space-between',
    position: 'relative',
  },
  title: {
    color: '#fefdfc',
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 36,
  },
  subTitle: {
    color: '#fefdfc',
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 36,
  },
  description: {
    color: '#fefdfc',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 36,
  },
  descriptionContainer: {
    maxWidth: '70%',
  },
  image: {
    position: 'absolute',
    right: -150,
    top: '40%',
  },
});
