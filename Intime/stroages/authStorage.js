import AsyncStorage from '@react-native-community/async-storage';

const key = 'email';

const authStorage = {
  async get() {
    try {
      const data = await AsyncStorage.getItem(key);
      return data;
    } catch (e) {
      throw new Error('Failed to load email');
    }
  },

  async set(email) {
    try {
      await AsyncStorage.setItem(key, email);
    } catch (e) {
      throw new Error('Failed to save email');
    }
  },

  async remove() {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      throw new Error('Failed to remove');
    }
  },
};

export default authStorage;
