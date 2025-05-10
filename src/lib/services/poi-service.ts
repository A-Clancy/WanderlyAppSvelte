import axios from "axios";
import type { Session, User, Category } from "$lib/types/placemark-types";
import { currentPOIs, loggedInUser } from "$lib/runes.svelte";

export const poiService = {
  baseUrl: "http://AClancy0222:3000",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
        email,
        password
      });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id
        };
        loggedInUser.set(session);
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async restoreSession(): Promise<void> {
    if (loggedInUser.token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + loggedInUser.token;
    }
  },

  clearSession() {
    delete axios.defaults.headers.common["Authorization"];
  },  

  async getAllPOIs(): Promise<void> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/pois`);
      currentPOIs.set({ places: response.data });
    } catch (error) {
      console.log(error);
    }
  },

  async addCategory(category: Category, token: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/categories`, category);
      return response.status === 200;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};
