import type { POI, Category } from "./types/placemark-types";

export const subTitle = $state({ text: "" });

export const loggedInUser = $state({
  email: "",
  name: "",
  token: "",
  _id: ""
});

export const currentPOIs = $state({ places: [] as POI[] });
export const currentCategories = $state({ categories: [] as Category[] });
