import axios from "axios";
import type { Category } from "$lib/types/placemark-types";

export const categoryService = {
  baseUrl: "http://AClancy0222:3000",

  async addCategory(category: Category): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/categories`, category);
      return response.status === 200;
    } catch (error) {
      console.log("Error adding category:", error);
      return false;
    }
  }
};
