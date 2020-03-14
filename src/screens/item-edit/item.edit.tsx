import * as React from 'react';
import { NavigationInjectedProps, ScrollView } from 'react-navigation';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Alert,
} from 'react-native';
import { globalStyles, COLORS, IMAGES, ROUTES } from '../../constants';
import { CTA } from '../../components/cta';
import { IInventoryItem } from '../../typings/inventory';
import { inventoryService } from '../../services/inventory.service';

const initialState = {
  name: '',
  amount: 1,
  price: 0,
  code: '',
  responsible: '',
};

export const EditItemScreen = (props: NavigationInjectedProps) => {
  const item: Partial<IInventoryItem> = props.navigation.getParam('item');

  const [state, setState] = React.useState<IInventoryItem>({
    ...initialState,
    ...item,
  });

  const goBack = () => {
    props.navigation.goBack();
  };

  const setName = (value: string) => {
    setState({ ...state, name: value });
  };

  const setPrice = (value: string) => {
    setState({ ...state, price: +value });
  };

  const setAmount = (value: string) => {
    setState({
      ...state,
      amount: +value,
    });
  };

  const setResponsible = (value: string) => {
    setState({ ...state, responsible: value });
  };

  const onSubmit = async () => {
    try {
      if (item.name) {
        await inventoryService.updateItem(state);
      } else {
        await inventoryService.createItem(state);
      }
      props.navigation.state.params.onReturn();
      props.navigation.navigate(ROUTES.AdminDashboard);
    } catch (err) {
      Alert.alert(err.response.data.message || 'Something went wrong');
    }
  };

  const onDelete = () => {
    Alert.alert(
      'Do you really want to delete this item?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: async() => {
          if (item._id) {
            await inventoryService.deleteItem(item._id);
            props.navigation.state.params.onReturn();
            props.navigation.goBack();
          }
        } },
      ]
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <View style={styles.row}>
              <TouchableOpacity onPress={goBack}>
                <Image style={styles.icon} source={IMAGES.backArrow} />
              </TouchableOpacity>
              <Text style={styles.screenTitle}>Fill Info</Text>
            </View>
            <TouchableOpacity onPress={onDelete}>
              <Image source={IMAGES.trash} />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View>
              <View>
                <Text style={styles.label}>Item name</Text>
                <TextInput
                  placeholder="Pencil"
                  placeholderTextColor="#5f5e5c"
                  value={state.name}
                  onChangeText={setName}
                  style={styles.input}
                />
              </View>
              <View>
                <Text style={styles.label}>Code</Text>
                <TextInput
                  placeholderTextColor="#5f5e5c"
                  value={state.code}
                  style={styles.input}
                  editable={false}
                />
              </View>
              <View>
                <Text style={styles.label}>Price</Text>
                <TextInput
                  placeholder="100$"
                  placeholderTextColor="#5f5e5c"
                  value={state.price.toString()}
                  onChangeText={setPrice}
                  style={styles.input}
                />
              </View>
              <View>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  placeholder="1"
                  placeholderTextColor="#5f5e5c"
                  value={state.amount.toString()}
                  onChangeText={setAmount}
                  style={styles.input}
                />
              </View>
              <View>
                <Text style={styles.label}>Responsible</Text>
                <TextInput
                  placeholder="Teacher"
                  placeholderTextColor="#5f5e5c"
                  value={state.responsible}
                  onChangeText={setResponsible}
                  style={styles.input}
                />
              </View>
            </View>
            <View>
              <CTA onPress={onSubmit} title={item.name ? 'Update' : 'Create'} />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBg,
    paddingHorizontal: '12%',
    paddingTop: 47,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    color: '#fefdfc',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 36,
  },
  headerContainer: {
    backgroundColor: COLORS.mainBg,
    paddingVertical: 26,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screenTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    width: 24,
    height: 16,
    marginRight: 29,
  },
  formBlock: {
    marginBottom: 22,
    shadowColor: 'rgba(0, 0, 0, 0.03)',
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 16,
    borderRadius: 8,
    backgroundColor: '#24282d',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  label: {
    color: '#5f5e5c',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#C5C5C5',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
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
