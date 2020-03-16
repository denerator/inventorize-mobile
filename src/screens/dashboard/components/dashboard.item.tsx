import * as React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { IInventoryItem } from '../../../typings/inventory';
import { COLORS, IMAGES } from '../../../constants';

interface IProps {
  item: IInventoryItem;
  onEdit: (item: IInventoryItem) => void;
}

export const DashboardItem = ({ item, onEdit }: IProps) => {
  const onItemClick = () => {
    onEdit(item);
  };
  return (
    <TouchableOpacity onPress={onItemClick}>
      <View style={styles.item}>
        <View>
          <Text style={styles.itemLabel}>{item.name}</Text>
          {item.createdAt ? (
            <Text style={styles.itemDescription}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          ) : null}
        </View>
        <Image source={IMAGES.edit} style={styles.editIcon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 16,
    borderColor: '#fff',
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 9,
    borderRadius: 9,
  },
  itemLabel: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  itemDescription: {
    color: '#fff',
    fontSize: 15,
  },
});
