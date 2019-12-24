import AsyncStorage from '@react-native-community/async-storage';

class StorageService {
  public async saveUser(user: any) {
    return await this.saveToStorage('user', JSON.stringify(user));
  }

  public async isNewUser() {
    const isNew = await AsyncStorage.getItem('isNewUser');
    return !isNew;
  }

  public async setNewUser() {
    return await this.saveToStorage('isNewUser', '1');
  }

  public getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  private async saveToStorage(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
    }
  }

  public async clearUser() {
    try {
      await AsyncStorage.clear();
    } catch (err) {
      console.log(err);
    }
  }

  public isDocumentsRead = async () => {
    return await AsyncStorage.getItem('isDocsRead');
  };

  public setDocsRead = async () => {
    return await this.saveToStorage('isDocsRead', '1');
  };
}

export const storageService = new StorageService();
