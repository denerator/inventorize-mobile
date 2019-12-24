import * as React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { globalStyles, COLORS, ROUTES, IMAGES } from '../../constants';
import { CTA } from '../../components/cta';
import { NavigationInjectedProps } from 'react-navigation';

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
          <Text style={styles.title}>INVETORIZE</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.title}>Easily track your inventory</Text>
          </View>
        </View>
        <View>
          <CTA title="User" onPress={onUser} />
          <CTA title="Admin" onPress={onAdmin} />
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
    fontSize: 50,
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
