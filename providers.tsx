import { createContext } from "react";

export interface AppDataInterface {
  userData: { userName: string } | null;
  card: any;
  hideGalleryOnMobile: boolean;
}

export interface AppContextType {
  appData: AppDataInterface | null;
  setAppData: (data: any) => void;
}

export const AppContext = createContext<AppContextType>({
  appData: null,
  setAppData: () => {},
});
