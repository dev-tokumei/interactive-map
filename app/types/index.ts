export type PlaceInfo = {
  id: string;
  name: string;
  coordinates: [number, number];
  type?: string;
  openingHours?: string;
  closingHours?: string;
  photoUrl?: string;
  otherData?: string;
};

export type ViewState = {
  longitude: number;
  latitude: number;
  zoom: number;
};
