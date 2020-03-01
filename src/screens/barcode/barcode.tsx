import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { ROUTES } from '../../constants/routes';
import { IMAGES } from '../../constants';
import { COLORS } from '../../constants';
import { NavigationInjectedProps } from 'react-navigation';
import { userService } from '../user/user.service';

export const BarcodeScreen = (props: NavigationInjectedProps) => {
  const isAdmin = props.navigation.getParam('isAdmin');

  const [isLoading, setIsLoading] = React.useState(false);

  const onCancel = () => {
    if (isAdmin) {
      props.navigation.goBack();
    } else {
      props.navigation.navigate(ROUTES.Intro);
    }
  };

  const onWaitingNavigate = async (barcode: string) => {
    try {
      if (isAdmin) {
        props.navigation.navigate(ROUTES.ItemEdit, {
          item: { code: barcode },
        });
      } else {
        setIsLoading(true);
        const resp = await userService.getItemInfo(barcode);
        setIsLoading(false);
        if (resp.data) {
          props.navigation.navigate(ROUTES.ItemInfo, { item: resp.data });
        } else {
          Alert.alert('There is no item with such barcode');
        }
      }
    } catch (err) {
      setIsLoading(false);
      Alert.alert('Something went wrong. Try again later');
    }
  };

  const renderCamera = () => (
    <View style={styles.cameraView}>
      <RNCamera
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          if (barcodes.length) {
            onWaitingNavigate(barcodes[0].dataRaw);
          }
        }}
        captureAudio={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <View style={styles.titleContainer}>
            <ImageBackground
              source={IMAGES.cameraBg}
              imageStyle={{ resizeMode: 'contain', zIndex: 3 }}
              style={styles.imageContainer}
            >
              {isLoading ? (
                <View style={[styles.cameraView, styles.loaderContainer]}>
                  <ActivityIndicator size="large" />
                </View>
              ) : (
                renderCamera()
              )}
            </ImageBackground>
          </View>
          <View style={styles.downControls}>
            <Text style={styles.description}>
              Position barcode to fit in the square
            </Text>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: COLORS.barcodeBg,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: COLORS.barcodeBg,
    paddingTop: 60,
    paddingBottom: 45,
    paddingHorizontal: '12%',
  },
  cameraContainer: {
    height: '100%',
    shadowColor: 'rgba(0, 0, 0, 0.03)',
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 16,
    borderRadius: 8,
    paddingVertical: 38,
    justifyContent: 'space-between',
  },
  title: {
    color: '#9b9a97',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 36,
  },
  description: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 80,
  },
  titleContainer: {
    alignItems: 'center',
  },
  downControls: {
    alignItems: 'center',
  },
  cancel: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  cameraView: {
    width: '100%',
    height: 108,
    overflow: 'hidden',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 256,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  approvePicture: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    width: 40,
  },
  cancelBtn: {
    backgroundColor: COLORS.barcodeCancelBtn,
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 13,
  },
});
