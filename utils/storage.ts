import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export const storage = {
  setToken: async (token: string) => {
    if (Platform.OS === "web") {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("token", token);
      }
    } else {
      await SecureStore.setItemAsync("token", token);
    }
  },

  getToken: async () => {
    if (Platform.OS === "web") {
      if (typeof localStorage !== "undefined") {
        return localStorage.getItem("token");
      }
      return null;
    } else {
      return await SecureStore.getItemAsync("token");
    }
  },

  removeToken: async () => {
    if (Platform.OS === "web") {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("token");
      }
    } else {
      await SecureStore.deleteItemAsync("token");
    }
  },
};
