import AsyncStorage from '@react-native-community/async-storage';

class StorageService {
  public async saveUser(user: any) {
    return await this.saveToStorage('user', JSON.stringify(user));
  }

  public getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  private async saveToStorage(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error, 'ERROR_SAVING_TO_STORAGE');
    }
  }

  public async clearUser() {
    try {
      await AsyncStorage.clear();
    } catch (err) {
      console.log(err);
    }
  }
}

export const storageService = new StorageService();
