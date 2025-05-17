import axios from "axios";
import type { Session, User, Category } from "$lib/types/placemark-types";
import { currentPOIs, loggedInUser } from "$lib/runes.svelte";
import type { POI } from "$lib/types/placemark-types";

export const poiService = {
  baseUrl: "http://AClancy0222:3000",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      console.log("Signup response:", response.data);
      return response.data.success === true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Signup failed:", error.response?.data || error.message);
      } else {
        console.log("Signup failed with unknown error:", error);
      }
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
        Object.assign(loggedInUser, session);
        localStorage.setItem("wanderly-session", JSON.stringify(session));
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async restoreSession(): Promise<void> {
    const stored = localStorage.getItem("wanderly-session");
    if (stored) {
      const session = JSON.parse(stored);
      Object.assign(loggedInUser, session);
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      console.log("Restored token from storage:", session.token);
    } else {
      console.log("No session found in localStorage");
    }
  },

  clearSession() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("wanderly-session");
    Object.assign(loggedInUser, { email: "", name: "", token: "", _id: "" });
  },

    async addPoi(poi: {
      name: string;
      description: string;
      latitude: number;
      longitude: number;
      categoryId: string;
    }): Promise<POI | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/pois`, poi);
      return response.data; 
    } catch (error) {
      console.log("POI add error:", error);
      return null;
    }
  },

  async getAllPOIs(): Promise<POI[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/pois`);
      currentPOIs.places = response.data;
      return response.data; 
    } catch (error) {
      console.log(error);
      return []; 
    }
  },

  async deletePOI(id: string): Promise<boolean> {
  try {
    const response = await axios.delete(`${this.baseUrl}/api/pois/${id}`);
    return response.status === 204;
  } catch (error) {
    console.log("POI delete error:", error);
    return false;
  }
},

  async addCategory(category: { name: string }, token: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/categories`, category, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.status === 200;
    } catch (error) {
      console.log("Category add error:", error);
      return false;
    }
  },

  async getAllCategories(): Promise<Category[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/categories`);
      return response.data;
    } catch (error) {
      console.log("Failed to load categories:", error);
      return [];
    }
  },

    async deleteCategory(id: string): Promise<boolean> {
    try {
      const response = await axios.delete(`${this.baseUrl}/api/categories/${id}`);
      return response.status === 204;
    } catch (error) {
      console.log("Category delete error:", error);
      return false;
    }
  },

  async deleteImage(poiId: string, imageIndex: number): Promise<boolean> {
  try {
    const response = await axios.delete(`${this.baseUrl}/api/pois/${poiId}/images/${imageIndex}`);
    return response.status === 200;
  } catch (error) {
    console.log("Image delete error:", error);
    return false;
  }
}


};
