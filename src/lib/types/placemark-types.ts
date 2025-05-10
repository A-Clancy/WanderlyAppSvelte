export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
};

export type Session = {
  name: string;
  token: string;
  _id: string;
};

export type POI = {
  name: string;
  description?: string;
  lat: number;
  lng: number;
  _id: string;
};

export type Category = {
  name: string;
  lat: number;
  lng: number;
  user: string; // user ID
};
