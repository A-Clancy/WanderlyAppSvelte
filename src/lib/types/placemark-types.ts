export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id?: string;
};

export type Session = {
  name: string;
  email: string;
  token: string;
  _id: string;
};

export type POI = {
  _id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  categoryId?: string;
  imageUrls?: string[];
};

export type Category = {
  name: string;
  _id: string;
};

export type NewCategory = {
  name: string;
};
